/**
 * Game-wide constants
 */

// Save data constants
export const SAVE_STORAGE_KEY = 'adventureClickSaves';
export const MAX_SAVES = 10;

// Default settings
export const DEFAULT_TYPING_SPEED = 50;
export const DEFAULT_VOLUME = 80;
export const DEFAULT_SOUND_EFFECTS = 70;

// Audio volume adjustments
export const PAGE_FLIP_VOLUME_MODIFIER = 0.2;
export const ITEM_ACQUIRED_VOLUME_MODIFIER = 0.1;
export const SWOOSH_VOLUME_MODIFIER = 0.5;
export const SWOOSH_PLAYBACK_RATE = 3;

// Scene types
export const SCENE_TYPES = {
    DIALOGUE: 'dialogue',
    INNER_MONOLOGUE: 'inner_monologue',
    OVERLAY_TEXT: 'overlay_text',
    NONE: 'none'
}; 