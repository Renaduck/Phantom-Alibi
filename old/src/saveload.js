import { environment } from './environment.js';
import { gameState } from './index.js';
import { overlay } from './constants.js';
import { swooshSound } from './audio.js';
import { setScene } from './scene.js';

// Save menu DOM elements - will be initialized on DOM ready
let saveListMenu;
let closeSaveListBtn;
let saveListContainer;
let deleteSaveBtn;

// Maximum number of save slots
const MAX_SAVES = 10;

// Create UI elements after DOM is fully loaded
function createSaveLoadUI() {
  saveListMenu = document.createElement('div');
  saveListMenu.id = 'save-list-menu';
  saveListMenu.innerHTML = `
    <h2>Save Files</h2>
    <div id="save-list-container"></div>
    <div id="save-list-buttons">
      <button id="close-save-list-btn">Close</button>
      <button id="delete-save-btn">Delete</button>
    </div>
  `;
  document.getElementById('container').appendChild(saveListMenu);

  closeSaveListBtn = document.getElementById('close-save-list-btn');
  saveListContainer = document.getElementById('save-list-container');
  deleteSaveBtn = document.getElementById('delete-save-btn');
  
  // Add event listener to close button
  closeSaveListBtn.addEventListener('click', hideSaveList);
  
  // Add event listener to delete button
  deleteSaveBtn.addEventListener('click', () => {
    const selectedItems = document.querySelectorAll('.save-item.selected');
    
    selectedItems.forEach(item => {
      const saveId = item.dataset.saveId;
      if (deleteSave(saveId)) {
        item.remove();
      }
    });
    
    // Show "no saves" message if all saves were deleted
    if (saveListContainer.children.length === 0) {
      saveListContainer.innerHTML = '<div class="no-saves">No saved games found</div>';
      deleteSaveBtn.style.display = 'none';
    }
  });
}

// Save current game state to local storage
export function saveGame() {
  // Get current saved games
  const savedGames = getSavedGames();
  
  // Create unique save ID using timestamp
  const saveId = Date.now().toString();
  const date = new Date();
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  
  // Create save data object
  const saveData = {
    id: saveId,
    timestamp: formattedDate,
    gameState: {
      currentScene: gameState.currentScene,
      currentTypingSpeed: gameState.currentTypingSpeed,
      currentVolume: gameState.currentVolume,
      currentSoundEffects: gameState.currentSoundEffects
    },
    inventory: environment.inventory,
    // Add a small preview of current scene/dialogue
    preview: document.getElementById('dialogue-text').textContent.substring(0, 30) + '...'
  };
  
  // Add new save to saved games
  savedGames[saveId] = saveData;
  
  // Manage save limit (keep only MAX_SAVES most recent)
  const saveIds = Object.keys(savedGames).sort((a, b) => b - a);
  if (saveIds.length > MAX_SAVES) {
    const idsToRemove = saveIds.slice(MAX_SAVES);
    idsToRemove.forEach(id => delete savedGames[id]);
  }
  
  // Save to local storage
  localStorage.setItem('adventureClickSaves', JSON.stringify(savedGames));
  
  // Show confirmation message
  showSaveConfirmation();
  
  return saveId;
}

// Load game state from local storage
export function loadGame(saveId) {
  const savedGames = getSavedGames();
  const saveData = savedGames[saveId];
  
  if (!saveData) {
    console.error('Save not found:', saveId);
    return false;
  }
  
  // Restore game state
  gameState.currentScene = saveData.gameState.currentScene;
  gameState.currentTypingSpeed = saveData.gameState.currentTypingSpeed;
  gameState.currentVolume = saveData.gameState.currentVolume;
  gameState.currentSoundEffects = saveData.gameState.currentSoundEffects;
  
  // Restore inventory
  environment.inventory = saveData.inventory || [];
  
  // Update scene
  setScene('curr');
  
  // Hide save list menu
  hideSaveList();
  
  return true;
}

// Get saved games from local storage
export function getSavedGames() {
  const savedGamesJson = localStorage.getItem('adventureClickSaves');
  return savedGamesJson ? JSON.parse(savedGamesJson) : {};
}

// Delete a saved game
export function deleteSave(saveId) {
  const savedGames = getSavedGames();
  
  if (savedGames[saveId]) {
    delete savedGames[saveId];
    localStorage.setItem('adventureClickSaves', JSON.stringify(savedGames));
    return true;
  }
  
  return false;
}

// Show save list menu
export function showSaveList(mode = 'load') {
  if (!saveListMenu) {
    console.error("Save list menu not initialized");
    return;
  }
  
  saveListMenu.classList.add('show');
  overlay.classList.add('show');
  
  // Clear existing save list
  saveListContainer.innerHTML = '';
  
  // Remove any existing Load Selected button from previous calls
  const existingLoadBtn = document.getElementById('load-selected-btn');
  if (existingLoadBtn) {
    existingLoadBtn.remove();
  }
  
  // Get saved games and sort by most recent first
  const savedGames = getSavedGames();
  const saveIds = Object.keys(savedGames).sort((a, b) => b - a);
  
  if (saveIds.length === 0) {
    saveListContainer.innerHTML = '<div class="no-saves">No saved games found</div>';
    deleteSaveBtn.style.display = 'none';
  } else {
    deleteSaveBtn.style.display = 'block';
    
    // Create save list items
    saveIds.forEach(id => {
      const save = savedGames[id];
      const saveItem = document.createElement('div');
      saveItem.className = 'save-item';
      saveItem.dataset.saveId = id;
      
      saveItem.innerHTML = `
        <div class="save-timestamp">${save.timestamp}</div>
        <div class="save-preview">${save.preview}</div>
      `;
      
      // Add click event to load the save (if in load mode)
      if (mode === 'load') {
        saveItem.addEventListener('click', () => {
          // Clear selected class from all items
          document.querySelectorAll('.save-item').forEach(item => {
            item.classList.remove('selected');
          });
          
          // Add selected class to clicked item
          saveItem.classList.add('selected');
          
          // Enable load button
          document.getElementById('load-selected-btn').disabled = false;
        });
      } else if (mode === 'delete') {
        saveItem.addEventListener('click', () => {
          // Toggle selection
          saveItem.classList.toggle('selected');
        });
      }
      
      saveListContainer.appendChild(saveItem);
    });
    
    // Add action button based on mode
    if (mode === 'load') {
      const loadBtn = document.createElement('button');
      loadBtn.id = 'load-selected-btn';
      loadBtn.textContent = 'Load Selected';
      loadBtn.disabled = true;
      loadBtn.addEventListener('click', () => {
        const selected = document.querySelector('.save-item.selected');
        if (selected) {
          loadGame(selected.dataset.saveId);
        }
      });
      
      // Insert before the close button
      saveListMenu.querySelector('#save-list-buttons').insertBefore(
        loadBtn, 
        saveListMenu.querySelector('#close-save-list-btn')
      );
    }
  }
  
  // Make sure close button has event listener
  const closeBtn = saveListMenu.querySelector('#close-save-list-btn');
  if (closeBtn) {
    // Remove any existing listeners to prevent duplicates
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    
    // Add the event listener
    newCloseBtn.addEventListener('click', () => {
      console.log('Close button clicked');
      hideSaveList();
    });
  }
  
  swooshSound();
}

// Hide save list menu
export function hideSaveList() {
  if (!saveListMenu) {
    console.error('Save list menu not found');
    return;
  }
  
  console.log('Hiding save list menu');
  saveListMenu.classList.remove('show');
  overlay.classList.remove('show');
  
  // Remove any mode-specific buttons
  const loadSelectedBtn = document.getElementById('load-selected-btn');
  if (loadSelectedBtn) {
    loadSelectedBtn.remove();
  }
  
  swooshSound();
}

// Show save confirmation
function showSaveConfirmation() {
  const confirmation = document.createElement('div');
  confirmation.className = 'save-confirmation';
  confirmation.textContent = 'Game saved!';
  document.body.appendChild(confirmation);
  
  // Remove after animation
  setTimeout(() => {
    confirmation.classList.add('fade-out');
    setTimeout(() => {
      confirmation.remove();
    }, 500);
  }, 1500);
}

// Initialize save/load functionality
export function initSaveLoad() {
  // Create UI once DOM is ready
  createSaveLoadUI();
} 