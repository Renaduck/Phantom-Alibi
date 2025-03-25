import { SaveGames, SaveData } from '../common/types';
import { SAVE_STORAGE_KEY, MAX_SAVES } from '../common/constants';

/**
 * Get all saved games from local storage
 */
export function getSavedGames(): SaveGames {
    try {
        const savedGamesJson = localStorage.getItem(SAVE_STORAGE_KEY);
        return savedGamesJson ? JSON.parse(savedGamesJson) : {};
    } catch (error) {
        console.error("Error getting saved games:", error);
        return {};
    }
}

/**
 * Save game state to local storage
 */
export function saveGame(
    currentScene: number,
    currentTypingSpeed: number,
    currentVolume: number,
    currentSoundEffects: number,
    inventory: string[]
): string {
    // Get current saved games
    const savedGames = getSavedGames();

    // Create unique save ID using timestamp
    const saveId = Date.now().toString();
    const date = new Date();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    // Create save data object
    const saveData: SaveData = {
        id: saveId,
        timestamp: formattedDate,
        gameState: {
            currentScene,
            currentTypingSpeed,
            currentVolume,
            currentSoundEffects,
        },
        inventory,
        // Preview of current scene text
        preview: 'New game'
    };

    // Add new save to saved games
    savedGames[saveId] = saveData;

    // Manage save limit (keep only MAX_SAVES most recent)
    const saveIds = Object.keys(savedGames).sort((a, b) => b.localeCompare(a));
    if (saveIds.length > MAX_SAVES) {
        const idsToRemove = saveIds.slice(MAX_SAVES);
        idsToRemove.forEach(id => delete savedGames[id]);
    }

    // Save to local storage
    localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(savedGames));

    return saveId;
}

/**
 * Load game data for a specific save ID
 */
export function loadSave(saveId: string): SaveData | null {
    const savedGames = getSavedGames();
    const saveData = savedGames[saveId];

    if (!saveData) {
        console.error('Save not found:', saveId);
        return null;
    }

    return saveData;
}

/**
 * Delete a saved game
 */
export function deleteSave(saveId: string): boolean {
    try {
        const savedGames = getSavedGames();
        if (savedGames[saveId]) {
            delete savedGames[saveId];
            localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(savedGames));
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error deleting save:", error);
        return false;
    }
}

/**
 * Check if there are any saved games
 */
export function hasSavedGames(): boolean {
    try {
        const savedGames = getSavedGames();
        return Object.keys(savedGames).length > 0;
    } catch (error) {
        console.error("Error checking saved games:", error);
        return false;
    }
} 