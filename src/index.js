import { setupDOMListeners } from './events.js';
import { setScene } from './scene.js';
import './ui/carousel.js';
import './ui/overlay.js';
import { playBackgroundMusic } from './audio.js';

// Handle the click-to-play overlay
function setupClickToPlayOverlay() {
  const clickToPlayOverlay = document.getElementById('click-to-play-overlay');
  
  // Add click event to the overlay
  clickToPlayOverlay.addEventListener('click', () => {
    // Play background music when user first interacts with the page
    playBackgroundMusic();
    
    // Hide the overlay
    clickToPlayOverlay.classList.add('hidden');
  });
}

// Initialize the game on load
document.addEventListener('DOMContentLoaded', () => {
  setupClickToPlayOverlay();
  setupDOMListeners();
});

// Export global game state for modules that need it
export const gameState = {
  currentScene: 0, // Start at index 0 (first scene in the array)
  typingInterval: null, // Keep track of the typing interval identifier in order to clear it when needed
  currentTypingSpeed: parseInt(document.getElementById('type-speed-slider')?.value) || 50,
  currentVolume: parseInt(document.getElementById('volume-slider')?.value) || 80,
  currentSoundEffects: parseInt(document.getElementById('sound-effects-slider')?.value) || 70,
}; 