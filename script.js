const sideBar = document.getElementById('sidebar');
const playGame = document.getElementById('play-game');
const restartGame = document.getElementById('restart-game')

// Background Constants
const background = document.getElementById('background');
const spriteContainer = document.getElementById('sprite-container')

const sprite1 = document.getElementById('sprite-1')
const sprite2 = document.getElementById('sprite-2')
const sprite3 = document.getElementById('sprite-3')

// Settings Menu Constants 
const settingsButton = document.getElementById('settings')
const settingsMenu = document.getElementById('settings-menu')
const closeSettingsMenu = document.getElementById('close-settings-btn')

// Volume Settings Constants
const overlay = document.getElementById('overlay');
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');

// Restart Confirmation Constants
const restartButton = document.getElementById('restart-game')
const restartConfirmationMenu = document.getElementById('restart-confirmation')
const yesRestart = document.getElementById('yes-restart')
const noRestart = document.getElementById('no-restart')

// Dialogue Constants
const dialogueContainer = document.getElementById('dialogue-container');
const dialogueTitle = document.getElementById('dialogue-title')
const dialogueText = document.getElementById("dialogue-text");

let typingInterval;
let currentScene = 0;

// Start Game Method
playGame.addEventListener('click', () => {
    playGame.innerHTML = "Continue ?";
    restartButton.removeAttribute("hidden")
    toggleSidebar();
    zoomIn();
    setScene("curr");
    sprite2.classList.toggle('show');

    // Create an item and add it to the play area
    const pointItemEnv = new PointItemEnv();
    pointItemEnv.addItem("circle", 200, 200);
    pointItemEnv.removeItem();

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
            setScene("next");
            break;
        case "Escape":
            sprite2.classList.toggle('show');
            toggleSidebar();
            toggleZoom();
            break;
        case "ArrowLeft":
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
    scenes = data["scenes"]
    sceneLength = Object.keys(scenes).length

    // Handle scene change by moving to the next or previous scene position
    if (action === "curr") currentScene = currentScene;
    else if (action === "next" && currentScene <= sceneLength - 2) currentScene += 1;
    else if (action === "prev" && currentScene != 0) currentScene -= 1;

    // Update the dialogue box -- present in parts if dialogue exceeds box word lmit
    dialogueTitle.innerHTML = ' &#x2746; &nbsp; ' + scenes[`scene_${currentScene}`]['character_name'] + ' '
    dialogue = scenes[`scene_${currentScene}`]['dialogue']

    // Display the character to the screen 
    sprite2.src = scenes[`scene_${currentScene}`]['character_sprite']
    sprite2.classList.add("show");
    typeText(dialogue, dialogueText);
}

// Show Restart Confirmation Menu 
restartButton.addEventListener('click', () => {
    restartConfirmationMenu.classList.add('show');
    overlay.classList.add('show');
})

// Restart the game and clear progress 
yesRestart.addEventListener('click', () => {
    playGame.innerHTML = "Start Game";
    restartButton.setAttribute("hidden", "hidden")
    currentScene = 0;
    closeOverlays();
});

// Don't restart the game and exit back to menu 
noRestart.addEventListener('click', closeOverlays)

// Show settings menu
settingsButton.addEventListener('click', () => {
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
}

// Class to generate clickable items for a scene
class PointItemEnv {
    constructor() {
        this.items = {}
    }

    // Adds item to playing area, hotspot
    addItem(name, x, y, r) {
        // Create element
        let element = document.createElement("div");
        element.setAttribute("id", name)

        element.style.border = "3px solid yellow";
        element.style.borderRadius = `10px`;
        element.style.height = "20px";
        element.style.width = "20px";
        element.style.zIndex = "10";

        element.style.position = "absolute";
        element.style.top = `${x}px`;
        element.style.left = `${y}px`;

        document.body.appendChild(element);

        this.items[name] = {
            name: name,
            el: element,
        }
    }

    // Remove the item from the screen
    removeItem(name) {
        setTimeout(() => {
            this.items["circle"].el.style.display = "none";
        }, 3000)
    }

    // Give the player the item clicked on
    retrieveItem() {

    }

    // Print the items to the screen 
    printInventory() {

    }
}