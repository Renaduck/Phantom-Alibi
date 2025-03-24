const sideBar = document.getElementById('sidebar');
const playGame = document.getElementById('play-game');

// Credits Constants
const creditsBtn = document.getElementById('credits');
const creditsMenu = document.getElementById('credits-menu');
const closeCreditsBtn = document.getElementById('close-credits-btn');

// Background Constants
const container = document.getElementById('container');
const background = document.getElementById('background');
const spriteContainer = document.getElementById('sprite-container');

// Sprite Constants
const sprite1 = document.getElementById('sprite-1');
const sprite2 = document.getElementById('sprite-2');
const sprite3 = document.getElementById('sprite-3');

// Settings Menu Constants 
const settingsBtn = document.getElementById('settings');
const settingsMenu = document.getElementById('settings-menu');
const closeSettingsMenu = document.getElementById('close-settings-btn');

const keybinding = document.getElementById('keybinding');
const keybindingValue = document.getElementById('keybinding-value');

// Volume / Sound Effects / Typing Speed Setting Constants
const overlay = document.getElementById('overlay');
const volumeSlider = document.getElementById('volume-slider');
const soundEffectsSlider = document.getElementById('sound-effects-slider');
const volumeLabel = document.getElementById('volume-label');
const soundEffectsLabel = document.getElementById('sound-effects-label');
const typingSlider = document.getElementById('type-speed-slider');
const typingLabel = document.getElementById('type-speed-label');

// Audio Constants 
const pageFlipAudio = new Audio("./audio/page-flip.mp3");
const backgroundAudio = new Audio("./audio/ominous.mp3");
const itemAcquiredAudio = new Audio("./audio/item-acquired.mp3");
const swooshAudio = new Audio("./audio/swoosh.mp3");

// Restart Confirmation Constants
const restartBtn = document.getElementById('restart');
const restartConfirmationMenu = document.getElementById('restart-confirmation');
const yesRestart = document.getElementById('yes-restart');
const noRestart = document.getElementById('no-restart');

// Dialogue Constants
const dialogueContainer = document.getElementById('dialogue-container');
const dialogueTitle = document.getElementById('dialogue-title');
const dialogueText = document.getElementById("dialogue-text");

// Carousel Constants
const carousel = document.getElementById('carousel');
const carouselItems = document.getElementById('carousel-items');
const carouselRight = document.getElementById('carousel-right');
const carouselLeft = document.getElementById('carousel-left');
const inventoryBtn = document.getElementById('inventory-btn');
const nextBtn = document.getElementById('next-btn');

// Global values for the game
let currentTypingSpeed = typingSlider.value;
let currentVolume = volumeSlider.value;
let currentSoundEffects = soundEffectsSlider.value;
let currentScene = 0;
let typingInterval; // Keep track of the typing interval identifier in order to clear it when needed

// Define our environment class for scene items
class Environment {
    constructor() {
        this.inventory = [];
    }

    // Adds item to playing area, hotspot
    addItem(name, item) {
        // Return if the item is already in the inventory
        if (this.inventory.includes(name)) return;

        // Create element
        const element = document.createElement("div");
        element.setAttribute("id", name)
        element.classList.add('item-marker');

        element.style.position = "absolute";
        element.style.top = `${item["y"]}%`;
        element.style.left = `${item["x"]}%`;

        // On click add the item to the player's inventory & retrieve the element
        element.addEventListener("click", () => {
            this.inventory.push(name);
            const itemMarker = document.getElementById(name)
            itemAcquiredSound();

            // Remove the item from the screen
            itemMarker.remove();

            // Add the item to the carousel on the screen
            const itemContainer = document.createElement('div');
            itemContainer.setAttribute("class", "carousel-item");

            const img = document.createElement('img');
            img.src = 'character_sprites/pikachu.png';
            itemContainer.appendChild(img);

            carouselItems.appendChild(itemContainer);

            // Animate the item into the carousel
            img.style.transform = "scale(0)";
            img.style.opacity = "0";
            img.style.transition = "transform 0.5s, opacity 0.5s";

            setTimeout(() => {
                img.style.transform = "scale(1)";
                img.style.opacity = "1";
            }, 150);

            // Add a description to the itemContainer div which already has the item img
            const description = document.createElement('div');
            description.textContent = item["description"];
            description.classList.add('item-description');
            itemContainer.appendChild(description);

            // Add a hover effect transition to the itemContainer (for some reason it's glitchy when I simply do this with css)
            itemContainer.addEventListener('mouseenter', () => {
                itemContainer.style.transition = 'transform 0.3s ease-in-out';
            });

            // Print the inventory to the screen
            this.carouselShow();
            this.createPlaceholders(item.offsetWidth);
        });


        document.body.appendChild(element);
    }

    // Create placeholder items
    createPlaceholders(itemWidth = 100) {
        // Clear any previously created placeholders
        this.clearPlaceholders();

        // Add carousel placeholder elements
        const carouselWidth = carouselItems.offsetWidth;
        const placeholderCount = Math.floor(carouselWidth / ((itemWidth + 32) - this.inventory.length));

        for (let i = 0; i <= placeholderCount; i++) {
            const itemPlaceholder = document.createElement('div');
            itemPlaceholder.setAttribute("class", "carousel-placeholder");
            carouselItems.appendChild(itemPlaceholder);
        }
    }

    // Clear all the item markers in the scene
    clearItems() {
        const itemMarkers = document.querySelectorAll('.item-marker');
        itemMarkers.forEach((item) => {
            if (item.classList.contains('item-marker')) {
                item.remove()
            }
        });
    }

    // Clear all the placeholders in the carousel
    clearPlaceholders() {
        const placeholders = document.querySelectorAll('.carousel-placeholder');
        placeholders.forEach((item) => {
            item.remove();
        });
    }

    // Toggle carousel inventory
    toggleCarousel() {
        carousel.classList.toggle('show');
        overlay.classList.toggle('show');
        swooshSound();
    }

    carouselShow() {
        carousel.classList.add('show');
        overlay.classList.add('show');
        swooshSound();
    }

    carouselHide() {
        carousel.classList.remove('show');
        overlay.classList.remove('show');
        swooshSound();
    }
}

// Start Game Method
let environment = new Environment();

playGame.addEventListener('click', () => {
    playGame.innerHTML = "Continue ?";
    toggleSidebar();
    zoomIn();
    setScene("curr");
    swooshSound()
    sprite2.classList.toggle('show');
});

// TypeText effect using an iterative approach with proper interruption
function typeText(
    content = "Please submit some text...",
    element = dialogueText,
    speed = 15
) {
    clearInterval(typingInterval);              // Stop any ongoing typing effect
    element.innerHTML = "";                     // Clear existing text before starting new typing effect
    speed = currentTypingSpeed / 50 * speed;    // Adjust speed based on user settings

    // Start typing effect
    let index = 0;
    typingInterval = setInterval(() => {
        if (index < content.length) {
            element.innerHTML += content.charAt(index);
            index++;
        } else {
            clearInterval(typingInterval); // Stop when done typing
        }
    }, speed);
}

// Add event listeners for clicking to go to the next scene  -- ignore in special cases
dialogueContainer.addEventListener('click', (event) => {
    if (!sideBar.classList.contains('translate')) return;
    if (!event.target.closest('#dialogue-options')) return;
});

background.addEventListener('click', () => {
    if (!sideBar.classList.contains('translate')) return;
    setScene("next")
});

spriteContainer.addEventListener('click', () => {
    if (!sideBar.classList.contains('translate')) return;
    setScene("next")
});

// Play Background Music on First User Interaction
document.addEventListener('click', () => {
    if (backgroundAudio) {
        backgroundAudio.volume = volumeSlider.value / 100;
        backgroundAudio.play();
    }
});

// Keydown event listener
document.addEventListener('keydown', (event) => {

    // Functionality to return early and not handle keyboard shortcuts if sidebar is in view
    if (!sideBar.classList.contains('translate') && playGame.innerHTML == "Start Game" || containsOverlay() && playGame.innerHTML == "Continue ?") {

        // Exit overlay if overlay is displayed and escape is pressed
        if (containsOverlay() && event.key == "Escape") {
            closeOverlays();
            return;
        } else if (!carousel.classList.contains('show')) {
            return;
        }
    }

    // Functionality to handle the keyboard shortcuts while in the game
    switch (event.key) {
        case "Escape":
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
});

// Methods for zooming in and out of the background
function zoomIn() { background.classList.add('zoom'); }
function zoomOut() { background.classList.remove('zoom'); }
function toggleZoom() { background.classList.toggle('zoom'); }

// Method for changing the background (i.e. Location)
function changeBackground(newBackground, sceneType, dialogue) {
    // Remove any existing overlay text
    const existingOverlayText = document.querySelector('.overlay-text');
    if (existingOverlayText) {
        existingOverlayText.remove();
    }

    if (sceneType == 'overlay_text') {
        // Create overlay text element
        background.style.filter = 'brightness(0)';
        spriteContainer.style.display = "none";
        dialogueContainer.style.display = "none";

        // Create overlay text element
        const overlayText = document.createElement('div');
        overlayText.classList.add('overlay-text');
        overlayText.style.filter = 'brightness(1)';
        container.appendChild(overlayText);

        setTimeout(() => {
            typeText(dialogue, overlayText, 50);
        }, 100);


        // Add a fade-in effect
        overlayText.style.opacity = "0";
        overlayText.style.transition = "opacity 0.5s ease-in-out";
        setTimeout(() => {
            overlayText.style.opacity = "1";
        }, 150);
    } else {
        background.style.filter = 'brightness(1)';
        spriteContainer.style.display = "flex";
        dialogueContainer.style.display = "flex";
    }
    background.style.backgroundImage = `url(${newBackground})`;
}

// Method to fetch and update the current scene
async function setScene(action) {
    // Get Scene metadata from JSON
    const response = await fetch("assets/story.json");
    const data = await response.json();
    scenes = data["scenes"];
    itemCatalogue = data["items"];
    sceneLength = Object.keys(scenes).length

    // Handle scene change by moving to the next or previous scene position
    if (action === "curr") currentScene = currentScene;
    else if (action === "next" && currentScene <= sceneLength - 2) currentScene += 1;
    else if (action === "prev" && currentScene != 0) currentScene -= 1;

    // Update the dialogue box -- present in parts if dialogue exceeds box word lmit
    dialogueTitle.innerHTML = ' &#x2746; &nbsp; ' + scenes[`scene_${currentScene}`]['character_name'] + ' ';
    dialogue = scenes[`scene_${currentScene}`]['dialogue'];
    
    // Update the current scene to have no dialogue box (if needed) 
    textType = scenes[`scene_${currentScene}`][`type`]
    if (textType == "none") {
        dialogueContainer.style.translate = "-100vw"
    }
    // Update the scene based on the scene object
    changeBackground(scenes[`scene_${currentScene}`]['background'], scenes[`scene_${currentScene}`]['type'], scenes[`scene_${currentScene}`]['dialogue']);

    // Update the font color of the dialogue box based on the scene object
    if (scenes[`scene_${currentScene}`]['type'] == 'inner_monologue') {
        dialogueText.style.color = 'rgb(144, 238, 144)';
    } else {
        dialogueText.style.color = 'whitesmoke';
    }

    // Update the environment play area with the background items
    sceneItems = scenes[`scene_${currentScene}`]['items'];

    try {
        // Clear any items from the previous scene
        environment.clearItems();

        // For each item in the scene object, get it from the item catalogue and add it to the play area environment
        sceneItems.forEach(itemName => {
            environment.addItem(itemName, itemCatalogue[itemName]);
        });
    } catch (error) {
        // Ignore if there are no items in the scene
    }

    // Display the character to the screen 
    sprite2.src = scenes[`scene_${currentScene}`]['character_sprite']
    sprite2.classList.add("show");
    typeText(dialogue, dialogueText);
}

// Carousel Controls
inventoryBtn.addEventListener('click', () => {
    environment.toggleCarousel();
    environment.createPlaceholders();
});

carouselRight.addEventListener('click', () => {
    carouselItems.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
});

carouselLeft.addEventListener('click', () => {
    carouselItems.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
});

// On Screen Resize
addEventListener("resize", (event) => {
    environment.createPlaceholders();
});

// Show Restart Confirmation Menu 
restartBtn.addEventListener('click', () => {
    restartConfirmationMenu.classList.add('show');
    overlay.classList.add('show');
})

// Restart the game and clear progress 
yesRestart.addEventListener('click', () => {
    playGame.innerHTML = "Start Game";
    restartBtn.setAttribute("hidden", "hidden")
    currentScene = 0;
    closeOverlays();
});

// Don't restart the game and exit back to menu 
noRestart.addEventListener('click', closeOverlays)

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
    const currentVolume = volumeSlider.value;
    const currentTypingSpeed = typingSlider.value;
});

// Restore default settings
function restoreDefaultSettings() {
    volumeSlider.value = currentVolume;
    typingSlider.value = currentTypingSpeed;
    volumeLabel.textContent = `${currentVolume}%`;
    typingLabel.textContent = `${currentTypingSpeed}%`;
}

// Close settings menu 
closeSettingsMenu.addEventListener('click', () => {
    settingsMenu.classList.remove('show');
    overlay.classList.remove('show');
    restoreDefaultSettings();
})

// Close Credits Menu
closeCreditsBtn.addEventListener('click', () => {
    creditsMenu.classList.remove('show');
    overlay.classList.remove('show');
})

// Volume level with slider
volumeSlider.addEventListener('input', (event) => {
    volumeLabel.textContent = `${event.target.value}%`;
});

// Type Speed level with slider
typingSlider.addEventListener('input', (event) => {
    typingLabel.textContent = `${event.target.value}%`;
});

// Close the overlay if clicked outside the settings menus
overlay.addEventListener('click', () => {
    closeOverlays();
});

// Toggle sidebar
function toggleSidebar() {
    sideBar.classList.toggle('translate');
    dialogueContainer.classList.toggle('translate');
}

// Check menu overlay status
function containsOverlay() {
    if (settingsMenu.classList.contains('show')) return true;
    else if (overlay.classList.contains('show')) return true;
    else if (restartConfirmationMenu.classList.contains('show')) return true;
    else if (overlay.classList.contains('show')) return true;
    else if (carousel.classList.contains('show')) return true;
    else if (creditsMenu.classList.contains('show')) return true;
    else return false;
}

// Close any overlayed menus
function closeOverlays() {
    if (carousel.classList.contains('show')) swooshSound();;

    settingsMenu.classList.remove('show');
    overlay.classList.remove('show');
    restartConfirmationMenu.classList.remove('show');
    overlay.classList.remove('show');
    carousel.classList.remove('show');
    creditsMenu.classList.remove('show');

    restoreDefaultSettings();
}

// Update the default settings
function updateSettings() {
    currentVolume = volumeSlider.value;
    currentTypingSpeed = typingSlider.value;
    closeOverlays();
}

// Page flip sound
function pageFlipSound() {
    if (pageFlipAudio.paused) {
        pageFlipAudio.volume = (soundEffectsSlider.value / 100) * 0.2;
        pageFlipAudio.play();
    } else {
        pageFlipAudio.currentTime = 0;
    }
}

// Item acquired sound
function itemAcquiredSound() {
    if (itemAcquiredAudio.paused) {
        itemAcquiredAudio.volume = (soundEffectsSlider.value / 100) * 0.1;
        itemAcquiredAudio.play();
    } else {
        itemAcquiredAudio.currentTime = 0;
    }
}

// Swoosh sound
function swooshSound() {
    if (swooshAudio.paused) {
        swooshAudio.volume = (soundEffectsSlider.value / 100) * 0.5;
        swooshAudio.playbackRate = 3;
        swooshAudio.play();
    } else {
        swooshAudio.currentTime = 0;
    }
}