import { create } from 'zustand';
import { GameState, SaveGames } from './types';
import { playPageFlipSound, playSwooshSound, playBackgroundMusic, playItemAcquiredSound } from './utils/audio';
import { fetchStoryData } from './utils/scene';

interface EnvironmentState {
    inventory: string[];
    addItem: (name: string) => void;
    clearItems: () => void;
    toggleCarousel: () => void;
    showCarousel: () => void;
    hideCarousel: () => void;
}

interface SaveLoadState {
    saveGame: () => string;
    loadGame: (saveId: string) => boolean;
    getSavedGames: () => SaveGames;
    deleteSave: (saveId: string) => boolean;
    showSaveList: (mode?: 'load' | 'delete' | 'save') => void;
    hideSaveList: () => void;
    updateLoadButtonState: () => boolean;
}

interface UIState {
    sidebarVisible: boolean;
    dialogueVisible: boolean;
    overlayVisible: boolean;
    carouselVisible: boolean;
    settingsMenuVisible: boolean;
    creditsMenuVisible: boolean;
    helpMenuVisible: boolean;
    restartConfirmationVisible: boolean;
    saveListMenuVisible: boolean;
    currentSaveMode: 'load' | 'delete' | 'save';
    toggleSidebar: () => void;
    showOverlay: () => void;
    hideOverlay: () => void;
    toggleCarousel: () => void;
    showSettings: () => void;
    hideSettings: () => void;
    showCredits: () => void;
    hideCredits: () => void;
    showHelp: () => void;
    hideHelp: () => void;
    showRestartConfirmation: () => void;
    hideRestartConfirmation: () => void;
}

interface AudioState {
    playBackgroundMusic: () => void;
    playPageFlipSound: () => void;
    playItemAcquiredSound: () => void;
    playSwooshSound: () => void;
}

interface SceneState {
    currentScene: number;
    setScene: (action: 'curr' | 'next' | 'prev') => void;
    zoomIn: () => void;
    zoomOut: () => void;
    toggleZoom: () => void;
}

interface EventState {
    setupKeyboardListeners: () => void;
    cleanupKeyboardListeners: () => void;
    handleKeyDown: (event: KeyboardEvent) => void;
}

interface StoreState extends GameState, EnvironmentState, SaveLoadState, UIState, AudioState, SceneState, EventState {
    loadingStory: boolean;
    gameStarted: boolean;
    startGame: () => void;
    restartGame: () => void;
    updateSettings: (volume: number, typingSpeed: number, soundEffects: number) => void;
}

// Initialize store with default values
const useStore = create<StoreState>((set, get) => ({
    // Game state
    currentScene: 0,
    currentTypingSpeed: 50,
    currentVolume: 80,
    currentSoundEffects: 70,
    loadingStory: false,
    gameStarted: false,

    // Environment state
    inventory: [],

    // UI state
    sidebarVisible: true,
    dialogueVisible: false,
    overlayVisible: false,
    carouselVisible: false,
    settingsMenuVisible: false,
    creditsMenuVisible: false,
    helpMenuVisible: false,
    restartConfirmationVisible: false,
    saveListMenuVisible: false,
    currentSaveMode: 'load',

    // Methods for environment
    addItem: (name) => {
        set(state => ({
            inventory: [...state.inventory, name]
        }));
        // Play sound effect
        get().playItemAcquiredSound();
    },

    clearItems: () => {
        // Will be implemented when we create the Environment component
    },

    toggleCarousel: () => {
        set(state => ({
            carouselVisible: !state.carouselVisible,
            overlayVisible: !state.carouselVisible
        }));
        // Play sound effect
        get().playSwooshSound();
    },

    showCarousel: () => {
        set({ carouselVisible: true, overlayVisible: true });
        // Play sound effect
        get().playSwooshSound();
    },

    hideCarousel: () => {
        set({ carouselVisible: false, overlayVisible: false });
        // Play sound effect
        get().playSwooshSound();
    },

    // Save/Load methods
    saveGame: () => {
        // Get current saved games
        const savedGames = get().getSavedGames();

        // Create unique save ID using timestamp
        const saveId = Date.now().toString();
        const date = new Date();
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        // Create save data object
        const saveData = {
            id: saveId,
            timestamp: formattedDate,
            gameState: {
                currentScene: get().currentScene,
                currentTypingSpeed: get().currentTypingSpeed,
                currentVolume: get().currentVolume,
                currentSoundEffects: get().currentSoundEffects,
            },
            inventory: get().inventory,
            // Preview of current scene text
            preview: 'New game'
        };

        // Add new save to saved games
        savedGames[saveId] = saveData;

        // Save to local storage
        localStorage.setItem('adventureClickSaves', JSON.stringify(savedGames));

        return saveId;
    },

    loadGame: (saveId) => {
        const savedGames = get().getSavedGames();
        const saveData = savedGames[saveId];

        if (!saveData) {
            console.error('Save not found:', saveId);
            return false;
        }

        // Restore game state
        set({
            currentScene: saveData.gameState.currentScene,
            currentTypingSpeed: saveData.gameState.currentTypingSpeed,
            currentVolume: saveData.gameState.currentVolume,
            currentSoundEffects: saveData.gameState.currentSoundEffects,
            inventory: saveData.inventory || []
        });

        // Update scene
        get().setScene('curr');

        // Hide save list menu
        get().hideSaveList();

        return true;
    },

    getSavedGames: () => {
        try {
            const savedGamesJson = localStorage.getItem('adventureClickSaves');
            return savedGamesJson ? JSON.parse(savedGamesJson) : {};
        } catch (error) {
            console.error("Error getting saved games:", error);
            return {};
        }
    },

    deleteSave: (saveId) => {
        try {
            const savedGames = get().getSavedGames();
            if (savedGames[saveId]) {
                delete savedGames[saveId];
                localStorage.setItem('adventureClickSaves', JSON.stringify(savedGames));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error deleting save:", error);
            return false;
        }
    },

    showSaveList: (mode = 'load') => {
        set({
            saveListMenuVisible: true,
            overlayVisible: true,
            currentSaveMode: mode
        });
    },

    hideSaveList: () => {
        set({ saveListMenuVisible: false, overlayVisible: false });
    },

    updateLoadButtonState: () => {
        try {
            const savedGames = get().getSavedGames();
            const hasSavedGames = Object.keys(savedGames).length > 0;

            // Return whether there are saved games
            return hasSavedGames;
        } catch (error) {
            console.error("Error checking saved games:", error);
            return false;
        }
    },

    // UI state methods
    toggleSidebar: () => {
        set(state => ({
            sidebarVisible: !state.sidebarVisible,
            dialogueVisible: !state.dialogueVisible
        }));
    },

    showOverlay: () => {
        set({ overlayVisible: true });
    },

    hideOverlay: () => {
        set({ overlayVisible: false });
    },

    showSettings: () => {
        set({ settingsMenuVisible: true, overlayVisible: true });
    },

    hideSettings: () => {
        set({ settingsMenuVisible: false, overlayVisible: false });
    },

    showCredits: () => {
        set({ creditsMenuVisible: true, overlayVisible: true });
    },

    hideCredits: () => {
        set({ creditsMenuVisible: false, overlayVisible: false });
    },

    showHelp: () => {
        set({ helpMenuVisible: true, overlayVisible: true });
    },

    hideHelp: () => {
        set({ helpMenuVisible: false, overlayVisible: false });
    },

    showRestartConfirmation: () => {
        set({ restartConfirmationVisible: true, overlayVisible: true });
    },

    hideRestartConfirmation: () => {
        set({ restartConfirmationVisible: false, overlayVisible: false });
    },

    // Audio methods
    playBackgroundMusic: () => {
        playBackgroundMusic(get().currentVolume);
    },

    playPageFlipSound: () => {
        playPageFlipSound(get().currentSoundEffects);
    },

    playItemAcquiredSound: () => {
        playItemAcquiredSound(get().currentSoundEffects);
    },

    playSwooshSound: () => {
        playSwooshSound(get().currentSoundEffects);
    },

    // Scene methods
    setScene: async (action) => {
        const { currentScene } = get();

        set({ loadingStory: true });

        try {
            const { scenes } = await fetchStoryData();

            let newSceneIndex = currentScene;

            if (action === 'next' && currentScene < scenes.length - 1) {
                newSceneIndex = currentScene + 1;
            } else if (action === 'prev' && currentScene > 0) {
                newSceneIndex = currentScene - 1;
            }

            set({ currentScene: newSceneIndex, loadingStory: false });

            // Additional scene loading logic will be added when we create Scene component
        } catch (error) {
            console.error('Error loading scene:', error);
            set({ loadingStory: false });
        }
    },

    zoomIn: () => {
        // Implementation is set dynamically in Background component
    },

    zoomOut: () => {
        // Implementation is set dynamically in Background component 
    },

    toggleZoom: () => {
        // Implementation is set dynamically in Background component
    },

    // Event handling methods
    setupKeyboardListeners: () => {
        // Add keyboard event listener for game controls
        document.addEventListener('keydown', get().handleKeyDown);
    },

    cleanupKeyboardListeners: () => {
        // Remove keyboard event listener
        document.removeEventListener('keydown', get().handleKeyDown);
    },

    handleKeyDown: (event) => {
        const state = get();

        // Return early if sidebar is in view or we're in an overlay
        const isInSidebar = !state.sidebarVisible && !state.gameStarted;
        const isInOverlay = state.overlayVisible;

        if (isInSidebar || isInOverlay) {
            // Exit overlay if overlay is displayed and escape is pressed
            if (isInOverlay && event.key === "Escape") {
                // Close all overlays
                set({
                    overlayVisible: false,
                    carouselVisible: false,
                    settingsMenuVisible: false,
                    creditsMenuVisible: false,
                    helpMenuVisible: false,
                    restartConfirmationVisible: false,
                    saveListMenuVisible: false
                });
            }
            return;
        }

        // Only handle carousel events if carousel is showing but we're not in sidebar
        if (!isInSidebar && state.carouselVisible) {
            // Handle carousel keyboard events
            if (event.key === "Escape" || event.key === "i") {
                state.hideCarousel();
            }
            return;
        }

        // Game controls
        switch (event.key) {
            case "Escape":
                state.toggleSidebar();
                break;
            case "ArrowLeft":
                if (!state.sidebarVisible) return;
                state.playPageFlipSound();
                state.setScene("prev");
                break;
            case "Enter":
            case "ArrowRight":
            case " ":
                if (!state.sidebarVisible) return;
                state.playPageFlipSound();
                state.setScene("next");
                break;
            case "i":
                state.toggleCarousel();
                break;
            default:
                break;
        }
    },

    startGame: () => {
        set({ gameStarted: true });
        get().toggleSidebar();
        get().zoomIn();
        get().setScene("curr");
        get().playSwooshSound();
    },

    restartGame: () => {
        set({
            currentScene: 0,
            gameStarted: false,
            inventory: []
        });
        get().hideRestartConfirmation();
    },

    updateSettings: (volume, typingSpeed, soundEffects) => {
        set({
            currentVolume: volume,
            currentTypingSpeed: typingSpeed,
            currentSoundEffects: soundEffects
        });
    }
}));

export default useStore; 