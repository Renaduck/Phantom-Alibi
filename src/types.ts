export interface GameState {
  currentScene: number;
  typingInterval: number | null;
  currentTypingSpeed: number;
  currentVolume: number;
  currentSoundEffects: number;
  currentDialogueContent?: string;
  currentDialogueElement?: HTMLElement | null;
}

export interface Item {
  x: number;
  y: number;
  description: string;
}

export interface Scene {
  character_name: string;
  dialogue: string;
  background: string;
  type: 'none' | 'inner_monologue' | 'overlay_text';
  character_sprite: string;
  items: string[];
}

export interface SaveData {
  id: string;
  timestamp: string;
  gameState: GameState;
  inventory: string[];
  preview: string;
}

export type SaveGames = Record<string, SaveData>; 