import { background, carousel, carouselItems, dialogueContainer, nextBtn, playGame, prevBtn, restartBtn, saveSettingsBtn, sideBar, sprite2, spriteContainer } from './constants.js';
import { environment } from './environment.js';
import { gameState } from './index.js';
import { pageFlipSound, swooshSound } from './audio.js';
import { setScene, toggleZoom, zoomIn } from './scene.js';
import { toggleSidebar } from './ui/sidebar.js';
import { containsOverlay, closeOverlays, updateSettings } from './ui/overlay.js';

// Setup all event listeners
export function setupDOMListeners() {
    // Start game button
    playGame.addEventListener('click', () => {
        playGame.innerHTML = "Continue ?";
        toggleSidebar();
        zoomIn();
        setScene("curr");
        swooshSound();
        
        sprite2.classList.toggle('show');
    });

    // Add event listeners for clicking to go to the next scene -- ignore in special cases
    dialogueContainer.addEventListener('click', (event) => {
        if (!sideBar.classList.contains('translate')) return;
        if (!event.target.closest('#dialogue-options')) return;
    });

    // Next button click to advance scene
    nextBtn.addEventListener('click', () => {
        if (!sideBar.classList.contains('translate')) return;
        setScene("next");
    });

    // Prev button click to go back a scene
    prevBtn.addEventListener('click', () => {
        if (!sideBar.classList.contains('translate')) return;
        setScene("prev");
    });

    // Save settings button 
    saveSettingsBtn.addEventListener('click', updateSettings);

    // Background click to advance scene
    background.addEventListener('click', () => {
        if (!sideBar.classList.contains('translate')) return;
        setScene("next");
    });

    // Sprite click to advance scene
    spriteContainer.addEventListener('click', () => {
        if (!sideBar.classList.contains('translate')) return;
        setScene("next");
    });

    // Keydown event listener
    document.addEventListener('keydown', handleKeyDown);
}

// Handle keyboard inputs
function handleKeyDown(event) {
    // Return early if sidebar is in view or we're in an overlay
    const isInSidebar = !sideBar.classList.contains('translate') && playGame.innerHTML === "Start Game";
    const isInOverlay = containsOverlay() && playGame.innerHTML === "Continue ?";
    
    if (isInSidebar || isInOverlay) {
        // Exit overlay if overlay is displayed and escape is pressed
        if (isInOverlay && event.key === "Escape") {
            closeOverlays();
        }
        return;
    }

    // Only handle carousel events if carousel is showing but we're not in sidebar
    if (!isInSidebar && carousel.classList.contains('show')) {
        handleCarouselKeyEvents(event);
        return;
    }

    // Functionality to handle the keyboard shortcuts while in the game
    switch (event.key) {
        case "Escape":
            handleEscapeKey();
            break;
        case "ArrowLeft":
            if (!sideBar.classList.contains('translate')) return;
            pageFlipSound();
            setScene("prev");
            break;
        case "Enter":
        case "ArrowRight":
        case " ":
            if (!sideBar.classList.contains('translate')) return;
            pageFlipSound();
            setScene("next");
            break;
        case "i":
            environment.toggleCarousel();
            environment.createPlaceholders();
            break;
        default:
            break;
    }
}

// Handle escape key functionality
function handleEscapeKey() {
    sprite2.classList.toggle("show");
    environment.carouselHide();
    restartBtn.removeAttribute("hidden")

    toggleSidebar();
    toggleZoom();

    // If there is overlay text then toggle it whenever escape is pressed
    const overlayText = document.querySelector('.overlay-text');
    if (overlayText) {
        if (background.style.filter === 'brightness(0)') {
            background.style.filter = 'brightness(1)';
            overlayText.style.display = 'none';
            overlayText.style.opacity = "0";
        } else if (background.style.filter === 'brightness(1)') {
            background.style.filter = 'brightness(0)';
            overlayText.style.display = 'flex';

            setTimeout(() => {
                overlayText.style.opacity = "1";
            }, 150);
        }
    }

    // Toggle the item markers on the screen
    const itemMarkers = document.querySelectorAll(".item-marker");
    itemMarkers.forEach((item) => {
        item.classList.toggle("hide");
    });
}

// Handle keyboard events when carousel is showing
function handleCarouselKeyEvents(event) {
    if (event.key === "Escape" || event.key === "i") {
        environment.carouselHide();
    } else if (event.key === "ArrowLeft") {
        carouselItems.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
    } else if (event.key === "ArrowRight") {
        carouselItems.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
    }
} 