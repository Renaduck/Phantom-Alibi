import { setupDOMListeners } from './events.js';
import { setScene } from './scene.js';
import './ui/carousel.js';
import './ui/overlay.js';
import { playBackgroundMusic } from './audio.js';
import { initSaveLoad } from './saveload.js';

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
  initSaveLoad(); // Initialize save/load UI
  updateLoadButtonState();
});

// Check for previously saved data to enable/disable Load button on startup
function updateLoadButtonState() {
  const loadGameBtn = document.getElementById('load-game');
  const loadMenu = document.getElementById('load-menu');
  
  try {
    const savedGames = localStorage.getItem('adventureClickSaves');
    const hasSavedGames = savedGames && Object.keys(JSON.parse(savedGames)).length > 0;
    
    // Update in-game load button
    if (loadGameBtn) {
      loadGameBtn.style.opacity = hasSavedGames ? '1' : '0.5';
      loadGameBtn.style.cursor = hasSavedGames ? 'pointer' : 'not-allowed';
    }
    
    // Update menu load button
    if (loadMenu) {
      loadMenu.style.opacity = hasSavedGames ? '1' : '0.5';
      loadMenu.style.cursor = hasSavedGames ? 'pointer' : 'not-allowed';
    }
  } catch (e) {
    console.error("Error checking saved games:", e);
  }
}

// Export global game state for modules that need it
export const gameState = {
  currentScene: 0, // Start at index 0 (first scene in the array)
  typingInterval: null, // Keep track of the typing interval identifier in order to clear it when needed
  currentTypingSpeed: parseInt(document.getElementById('type-speed-slider')?.value) || 50,
  currentVolume: parseInt(document.getElementById('volume-slider')?.value) || 80,
  currentSoundEffects: parseInt(document.getElementById('sound-effects-slider')?.value) || 70,
}; 