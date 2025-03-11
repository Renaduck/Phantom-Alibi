const startGame = document.getElementById('start-game');
const sideBar = document.getElementById('sidebar');
const dialogueContainer = document.getElementById('dialogue-container');
const dialogueText = document.getElementById("dialogue-text");
const background = document.getElementById('background');
const spriteContainer = document.getElementById('sprite_container')

// Sound Settings Constants
const soundButton = document.getElementById('sound');
const soundSettings = document.getElementById('sound-settings');
const closeSoundSettings = document.getElementById('close-sound-settings');
const overlay = document.getElementById('overlay');
const volumeSlider = document.getElementById('volume-slider');
const volumeValue = document.getElementById('volume-value');

let typingInterval;
let currentScene = 0;

// Start Game Method
startGame.addEventListener('click', () => {
    sideBar.classList.toggle('translate');
    dialogueContainer.classList.toggle('translate');
    typeText("Welcome to the game! Pressing 'enter', 'right-arrow' or 'spacebar' will advance the dialogue.");
    zoomIn();
    setScene("next");
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
            spriteContainer.classList.toggle("show");
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
    fetch('./assets/story.json')
        .then(response => response.json())
        .then(data => {
            scenes = data["scenes"]
            sceneLength = Object.keys(scenes).length
            spriteContainer.classList.add("show");

            if (action === "next") {
                if (currentScene >= sceneLength - 1) {
                    typeText(scenes[`scene_${currentScene}`]["dialogue"])
                } else {
                    typeText(scenes[`scene_${currentScene}`]["dialogue"])
                    currentScene += 1
                }

            } else if (action === "prev") {
                if (currentScene == 0) {
                    typeText(scenes[`scene_${currentScene}`]["dialogue"])
                } else {
                    typeText(scenes[`scene_${currentScene}`]["dialogue"])
                    currentScene -= 1
                }
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
}
// show sound settings
soundButton.addEventListener('click', () => {
    soundSettings.classList.add('show');
    overlay.classList.add('show');
});

// close sound settings
closeSoundSettings.addEventListener('click', () => {
    soundSettings.classList.remove('show');
    overlay.classList.remove('show');
});

overlay.addEventListener('click', () => {
    soundSettings.classList.remove('show');
    overlay.classList.remove('show');
});

// volume level with slider
volumeSlider.addEventListener('input', (event) => {
    const volume = event.target.value;
    volumeValue.textContent = `${volume}%`;
});