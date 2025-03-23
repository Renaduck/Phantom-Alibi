const sideBar = document.getElementById('sidebar');
const playGame = document.getElementById('play-game');

// Background Constants
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

// Volume Settings Constants
const overlay = document.getElementById('overlay');
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');

// Audio class 
const buttonAudio = new Audio("./audio/page-flip.mp3");
const backgroundAudio = new Audio("./audio/ominous.mp3");
// backgroundAudio.play();

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

let typingInterval;
let currentScene = 0;

// Start Game Method
playGame.addEventListener('click', () => {
    playGame.innerHTML = "Continue ?";
    toggleSidebar();
    zoomIn();
    setScene("curr");
    sprite2.classList.toggle('show');

    // typeText("Welcome to the game! Pressing 'enter', 'right-arrow' or 'spacebar' will advance the dialogue.");
});

// TypeText effect using an iterative approach with proper interruption
function typeText(
    content = "Please submit some text...",
    element = dialogueText,
    speed = 15
) {
    clearInterval(typingInterval);  // Stop any ongoing typing effect
    element.innerHTML = "";         // Clear existing text before starting new typing effect

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

// Keydown event listener
document.addEventListener('keydown', (event) => {
    // Functionality to return early and not handle keyboard shortcuts if sidebar is in view
    if (!sideBar.classList.contains('translate') && playGame.innerHTML == "Start Game" || containsOverlay() && playGame.innerHTML == "Continue ?") {
        // Exit overlay if overlay is displayed and escape is pressed
        if (event.key == "Escape" && containsOverlay()) {
            closeOverlays();
            return;
        }

        return
    }

    // Functionality to handle the keyboard shortcuts while in the game
    switch (event.key) {
        case "Enter":
        case "ArrowRight":
        case " ":
            toggleSound();
            setScene("next");
            break;
        case "Escape":
            sprite2.classList.toggle("show");
            carousel.classList.remove("show");
            restartBtn.removeAttribute("hidden")

            toggleSidebar();
            toggleZoom();

            const itemMarkers = document.querySelectorAll(".item-marker");
            itemMarkers.forEach((item) => {
                item.classList.toggle("hide");
            });
            break;
        case "ArrowLeft":
            toggleSound();
            setScene("prev");
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
function changeBackground(newBackground) {
    background.style.backgroundImage = `url(${newBackground})`;
}

// Fetch to fetch the current scene
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

    // Update the background
    changeBackground(scenes[`scene_${currentScene}`]['background'])

    // Update the environment play area with the background items
    sceneItems = scenes[`scene_${currentScene}`]['items'];
    environment = new PointItemEnv();

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
    const pointItemEnv = new PointItemEnv();
    pointItemEnv.toggleCarousel();
    pointItemEnv.createPlaceholders();
});

carouselRight.addEventListener('click', () => {
    carouselItems.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
});

carouselLeft.addEventListener('click', () => {
    carouselItems.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
});

// On Screen Resize
addEventListener("resize", (event) => {
    const pointItemEnv = new PointItemEnv();
    pointItemEnv.createPlaceholders();
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

// Show settings menu
settingsBtn.addEventListener('click', () => {
    settingsMenu.classList.add('show')
    overlay.classList.add('show')
});

// Close settings menu 
closeSettingsMenu.addEventListener('click', () => {
    settingsMenu.classList.remove('show')
    overlay.classList.remove('show')
})

// Volume level with slider
volumeSlider.addEventListener('input', (event) => {
    const volume = event.target.value;
    volumeValue.textContent = `${volume}%`;
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
    else return false;
}

// Close any overlayed menus
function closeOverlays() {
    settingsMenu.classList.remove('show');
    overlay.classList.remove('show');
    restartConfirmationMenu.classList.remove('show');
    overlay.classList.remove('show');
    carousel.classList.remove('show');
}

// Class to generate clickable items for a scene
class PointItemEnv {
    constructor() {
        this.inventory = [];
    }

    // Adds item to playing area, hotspot
    addItem(name, item) {
        // Create element
        const element = document.createElement("div");
        element.setAttribute("id", name)
        element.classList.add('item-marker');

        element.style.position = "absolute";
        element.style.top = `${item["y"]}%`;
        element.style.left = `${item["x"]}%`;

        element.addEventListener("click", () => {
            // Add the item to the player's inventory & retrieve the element
            this.inventory.push(name);
            const itemMarker = document.getElementById(name)

            // Remove the item from the screen
            itemMarker.remove();

            // Add the item to the carousel on the screen
            const item = document.createElement('div');
            item.setAttribute("class", "carousel-item");

            const img = document.createElement('img');
            img.src = 'character_sprites/pikachu.png';
            item.appendChild(img);

            carouselItems.appendChild(item);

            // Animate the item into the carousel
            img.style.transform = "scale(0)";
            img.style.opacity = "0";
            img.style.transition = "transform 1s, opacity 1s";

            setTimeout(() => {
                img.style.transform = "scale(1)";
                img.style.opacity = "1";
            }, 300);

            // Print the inventory to the screen
            carousel.classList.add('show');

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
    }
}

// Toggle gameplay sound
function toggleSound() {
    if (buttonAudio.paused) {
        // buttonAudio.play();
    } else {
        buttonAudio.currentTime = 0;
    }
}