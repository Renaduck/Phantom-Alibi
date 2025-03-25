import { 
    carousel, 
    closeCreditsBtn, 
    closeHelpBtn,
    closeSettingsMenu, 
    creditsBtn, 
    creditsMenu, 
    helpBtn,
    helpMenu,
    noRestart, 
    overlay, 
    playGame,
    restartBtn, 
    restartConfirmationMenu, 
    settingsBtn, 
    settingsMenu, 
    typingLabel, 
    typingSlider, 
    volumeLabel, 
    volumeSlider,
    saveGameBtn,
    loadGameBtn,
    yesRestart 
} from '../constants.js';
import { gameState } from '../index.js';
import { swooshSound } from '../audio.js';

// Store the current settings
let storedSettings = {
    volume: parseInt(volumeSlider.value) || 80,
    typingSpeed: parseInt(typingSlider.value) || 50
};

// Check menu overlay status
export function containsOverlay() {
    if (settingsMenu.classList.contains('show')) return true;
    else if (overlay.classList.contains('show')) return true;
    else if (restartConfirmationMenu.classList.contains('show')) return true;
    else if (carousel.classList.contains('show')) return true;
    else if (creditsMenu.classList.contains('show')) return true;
    else if (helpMenu.classList.contains('show')) return true;
    else if (document.getElementById('save-list-menu').classList.contains('show')) return true;
    else return false;
}

// Close any overlayed menus
export function closeOverlays() {
    if (carousel.classList.contains('show')) swooshSound();

    settingsMenu.classList.remove('show');
    overlay.classList.remove('show');
    restartConfirmationMenu.classList.remove('show');
    carousel.classList.remove('show');
    creditsMenu.classList.remove('show');
    helpMenu.classList.remove('show');

    restoreDefaultSettings();
}

// Restore default settings
export function restoreDefaultSettings() {
    volumeSlider.value = storedSettings.volume;
    typingSlider.value = storedSettings.typingSpeed;
    volumeLabel.textContent = `${storedSettings.volume}%`;
    typingLabel.textContent = `${storedSettings.typingSpeed}%`;
}

// Update the default settings
export function updateSettings() {
    storedSettings.volume = volumeSlider.value;
    storedSettings.typingSpeed = typingSlider.value;
    gameState.currentVolume = volumeSlider.value;
    gameState.currentTypingSpeed = typingSlider.value;
    closeOverlays();
}

// Add event listeners
export function setupOverlayListeners() {
    // Ensure help button appears correctly on page load
    setTimeout(() => {
        helpBtn.style.opacity = '1';
    }, 500);

    // Show Restart Confirmation Menu 
    restartBtn.addEventListener('click', () => {
        restartConfirmationMenu.classList.add('show');
        overlay.classList.add('show');
    });

    // Restart the game and clear progress 
    yesRestart.addEventListener('click', () => {
        gameState.currentScene = 0;
        // Reset the game UI
        playGame.innerHTML = "Start Game";
        restartBtn.hidden = true;
        saveGameBtn.hidden = true;
        loadGameBtn.hidden = true;
        closeOverlays();
    });

    // Don't restart the game and exit back to menu 
    noRestart.addEventListener('click', closeOverlays);

    // Show credits menu
    creditsBtn.addEventListener('click', () => {
        creditsMenu.classList.add('show');
        overlay.classList.add('show');
    });

    // Show settings menu
    settingsBtn.addEventListener('click', () => {
        settingsMenu.classList.add('show');
        overlay.classList.add('show');
        
        // Store the current settings
        storedSettings.volume = volumeSlider.value;
        storedSettings.typingSpeed = typingSlider.value;
    });

    // Close settings menu 
    closeSettingsMenu.addEventListener('click', () => {
        settingsMenu.classList.remove('show');
        overlay.classList.remove('show');
        restoreDefaultSettings();
    });

    // Close Credits Menu
    closeCreditsBtn.addEventListener('click', () => {
        creditsMenu.classList.remove('show');
        overlay.classList.remove('show');
    });

    // Volume level with slider
    volumeSlider.addEventListener('input', (event) => {
        volumeLabel.textContent = `${event.target.value}%`;
    });

    // Type Speed level with slider
    typingSlider.addEventListener('input', (event) => {
        typingLabel.textContent = `${event.target.value}%`;
    });

    // Show help menu
    helpBtn.addEventListener('click', () => {
        helpMenu.classList.add('show');
        overlay.classList.add('show');
    });

    // Close help menu
    closeHelpBtn.addEventListener('click', () => {
        helpMenu.classList.remove('show');
        overlay.classList.remove('show');
    });

    // Close the overlay if clicked outside the settings menus
    overlay.addEventListener('click', () => {
        closeOverlays();
    });
}

// Initialize the module
setupOverlayListeners(); 