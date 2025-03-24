import { setupDOMListeners } from './events.js';
import { setScene } from './scene.js';
import './ui/carousel.js';
import './ui/overlay.js';
import { playBackgroundMusic } from './audio.js';

// Initialize the game on load
document.addEventListener('DOMContentLoaded', () => {
  setupDOMListeners();
  playBackgroundMusic();
});

// Export global game state for modules that need it
export const gameState = {
  currentScene: 0,
  typingInterval: null, // Keep track of the typing interval identifier in order to clear it when needed
  currentTypingSpeed: parseInt(document.getElementById('type-speed-slider')?.value) || 50,
  currentVolume: parseInt(document.getElementById('volume-slider')?.value) || 80,
  currentSoundEffects: parseInt(document.getElementById('sound-effects-slider')?.value) || 70,
}; 