const sideBar = document.getElementById('sidebar');
const playGame = document.getElementById('play-game');
const restartGame = document.getElementById('restart-game')

// Background Constants
const background = document.getElementById('background');
const spriteContainer = document.getElementById('sprite-container')

const sprite1 = document.getElementById('sprite-1')
const sprite2 = document.getElementById('sprite-2')
const sprite3 = document.getElementById('sprite-3')

// Sound Settings Constants
const soundButton = document.getElementById('sound');
const soundSettings = document.getElementById('sound-settings');
const closeSoundSettings = document.getElementById('close-sound-settings');
const overlay = document.getElementById('overlay');
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');

// Settings Menu Constants 
const settingsButton = document.getElementById('settings')
const settingsMenu = document.getElementById('settings-menu')
const closeSettingsMenu = document.getElementById('close-settings-menu')

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
    sideBar.classList.toggle('translate');
    dialogueContainer.classList.toggle('translate');
    playGame.innerHTML = "Continue ?";
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
    switch (event.key) {
        case "Enter":
        case "ArrowRight":
        case " ":
            setScene("next");
            break;
        case "Escape":
            sprite2.classList.toggle('show');
            sideBar.classList.toggle('translate');
            dialogueContainer.classList.toggle('translate');
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

    spriteContainer.classList.add("show");

    // Handle scene change by moving to the next or previous scene position
    if (action === "curr") currentScene = currentScene;
    else if (action === "next" && currentScene <= sceneLength - 1) currentScene += 1;
    else if (action === "prev" && currentScene != 0) currentScene -= 1;

    // Update the dialogue box -- present in parts if dialogue exceeds box word lmit
    dialogueTitle.innerHTML = ' &#x2746; &nbsp; ' + scenes[`scene_${currentScene}`]['character_name'] + ' '

    dialogue = scenes[`scene_${currentScene}`]['dialogue']
    typeText(dialogue, dialogueText);
}

// Close the Restart Confirmation Menu 
function closeRestartConfirmationMenu() {
    restartConfirmationMenu.classList.remove('show')
    overlay.classList.remove('show')
}

// Show Restart Confirmation Menu 
restartButton.addEventListener('click', () => {
    restartConfirmationMenu.classList.add('show')
    overlay.classList.add('show')
})

// Restart the game and clear progress 
yesRestart.addEventListener('click', () => {
    playGame.innerHTML = "Start Game";
    currentScene = 0;
    closeRestartConfirmationMenu()
});

// Don't restart the game and exit back to menu 
noRestart.addEventListener('click', closeRestartConfirmationMenu) 

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

// Show sound settings
soundButton.addEventListener('click', () => {
    soundSettings.classList.add('show');
    overlay.classList.add('show');
});

// Close sound settings
closeSoundSettings.addEventListener('click', () => {
    soundSettings.classList.remove('show');
    overlay.classList.remove('show');
});

// Volume level with slider
volumeSlider.addEventListener('input', (event) => {
    const volume = event.target.value;
    volumeValue.textContent = `${volume}%`;
});