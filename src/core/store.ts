import { create } from 'zustand';
import { GameState, SaveGames } from '../common/types';
import { playPageFlipSound, playSwooshSound, playBackgroundMusic, playItemAcquiredSound } from '../services/audio';
import { fetchStoryData } from '../services/scene';
import { saveGame, getSavedGames, loadSave, deleteSave, hasSavedGames } from '../services/storage';
import { DEFAULT_TYPING_SPEED, DEFAULT_VOLUME, DEFAULT_SOUND_EFFECTS } from '../common/constants';

// Define the inventory item interface
export interface InventoryItem {
    id: string;
    name: string;
    description: string;
    img_src: string;
}

interface EnvironmentState {
    inventory: InventoryItem[];
    addItem: (name: string) => void;
    addToInventory: (item: InventoryItem) => void;
    removeFromInventory: (itemId: string) => void;
    clearInventory: () => void;
    hasItem: (itemId: string) => boolean;
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
    currentTypingSpeed: DEFAULT_TYPING_SPEED,
    currentVolume: DEFAULT_VOLUME,
    currentSoundEffects: DEFAULT_SOUND_EFFECTS,
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
    addItem: (name: string) => {
        // Legacy method kept for compatibility
        set(state => ({
            inventory: [...state.inventory, { id: name, name, description: name, img_src: '' }]
        }));
        // Play sound effect
        get().playItemAcquiredSound();
    },

    addToInventory: (item) => {
        // Check if item already exists
        if (get().hasItem(item.id)) {
            console.log(`Item ${item.id} already in inventory`);
            return;
        }

        console.log(`Adding item to inventory: ${item.id}`);
        set(state => ({
            inventory: [...state.inventory, item]
        }));
        // Play sound effect
        get().playItemAcquiredSound();
    },

    removeFromInventory: (itemId) => {
        console.log(`Removing item from inventory: ${itemId}`);
        set(state => ({
            inventory: state.inventory.filter(item => item.id !== itemId)
        }));
    },

    hasItem: (itemId) => {
        return get().inventory.some(item => item.id === itemId);
    },

    clearInventory: () => {
        console.log('Clearing inventory');
        set({ inventory: [] });
    },

    clearItems: () => {
        // Keep for backward compatibility
        get().clearInventory();
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

    // Save/Load methods using storage service
    saveGame: () => {
        const { currentScene, currentTypingSpeed, currentVolume, currentSoundEffects, inventory } = get();

        // Cast inventory to proper type for storage service
        return saveGame(
            currentScene,
            currentTypingSpeed,
            currentVolume,
            currentSoundEffects,
            inventory as unknown as string[]
        );
    },

    loadGame: (saveId) => {
        const saveData = loadSave(saveId);

        if (!saveData) {
            return false;
        }

        // Restore game state
        set({
            currentScene: saveData.gameState.currentScene,
            currentTypingSpeed: saveData.gameState.currentTypingSpeed,
            currentVolume: saveData.gameState.currentVolume,
            currentSoundEffects: saveData.gameState.currentSoundEffects,
            // Cast inventory data to proper type
            inventory: (saveData.inventory || []) as unknown as InventoryItem[]
        });

        // Update scene
        get().setScene('curr');

        // Hide save list menu
        get().hideSaveList();

        return true;
    },

    getSavedGames: () => {
        return getSavedGames();
    },

    deleteSave: (saveId) => {
        return deleteSave(saveId);
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
        return hasSavedGames();
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

    // Scene functions
    setScene: (action) => {
        set(state => {
            // Check if we're in a loading state to prevent multiple transitions
            if (state.loadingStory) {
                return state;
            }

            // Set loading state
            set({ loadingStory: true });

            let nextScene = state.currentScene;

            if (action === 'next') {
                nextScene = state.currentScene + 1;
            } else if (action === 'prev') {
                nextScene = Math.max(0, state.currentScene - 1);
            }

            // Asynchronously fetch the story data to check if scene exists
            fetchStoryData().then(storyData => {
                if (storyData.scenes && nextScene >= 0 && nextScene < storyData.scenes.length) {
                    // Scene exists, update state with new scene
                    set({
                        currentScene: nextScene,
                        loadingStory: false
                    });
                } else {
                    // Scene doesn't exist or index out of bounds
                    console.error(`Scene index ${nextScene} is out of bounds. Total scenes: ${storyData.scenes?.length || 0}`);
                    set({ loadingStory: false });
                }
            }).catch(error => {
                console.error('Error fetching story data:', error);
                set({ loadingStory: false });
            });

            return state;
        });
    },

    zoomIn: () => {
        // Will be implemented when we create the Scene component
    },

    zoomOut: () => {
        // Will be implemented when we create the Scene component
    },

    toggleZoom: () => {
        // Will be implemented when we create the Scene component
    },

    // Event handlers
    setupKeyboardListeners: () => {
        window.addEventListener('keydown', get().handleKeyDown);
    },

    cleanupKeyboardListeners: () => {
        window.removeEventListener('keydown', get().handleKeyDown);
    },

    handleKeyDown: (event) => {
        const {
            carouselVisible,
            overlayVisible,
            saveListMenuVisible,
            settingsMenuVisible,
            creditsMenuVisible,
            helpMenuVisible,
            gameStarted
        } = get();

        // Ignore key events if any menu is open
        if (saveListMenuVisible || settingsMenuVisible || creditsMenuVisible || helpMenuVisible) {
            return;
        }

        switch (event.code) {
            case 'KeyI':
                // Toggle inventory
                get().toggleCarousel();
                break;
            case 'Space':
            case 'Enter':
            case 'KeyN':
                // Next scene if game has started
                if (gameStarted && !carouselVisible) {
                    get().playPageFlipSound();
                    get().setScene('next');
                } else if (!gameStarted) {
                    // Start game if not started
                    get().startGame();
                }
                break;
            case 'KeyP':
            case 'ArrowLeft':
                // Previous scene
                if (gameStarted && !carouselVisible) {
                    get().playPageFlipSound();
                    get().setScene('prev');
                }
                break;
            case 'Escape':
                // Close carousel if open
                if (carouselVisible) {
                    get().hideCarousel();
                } else if (overlayVisible) {
                    // If other overlay is open, close it
                    get().hideOverlay();
                } else {
                    // Otherwise toggle settings menu
                    get().showSettings();
                }
                break;
            case 'KeyS':
                // Quick save
                if (gameStarted && !overlayVisible) {
                    get().showSaveList('save');
                }
                break;
            case 'KeyL':
                // Quick load
                if (gameStarted && !overlayVisible) {
                    get().showSaveList('load');
                }
                break;
            case 'KeyH':
                // Toggle help
                get().showHelp();
                break;
            default:
                break;
        }
    },

    // Game state methods
    startGame: () => {
        console.log('Starting game, hiding sidebar');
        set({
            gameStarted: true,
            dialogueVisible: true,
            sidebarVisible: false
        });
        // Play sound effect
        get().playBackgroundMusic();
    },

    restartGame: () => {
        set({
            currentScene: 0,
            gameStarted: true,
            dialogueVisible: true,
            inventory: [],
            restartConfirmationVisible: false,
            overlayVisible: false
        });
        get().setScene('curr');
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