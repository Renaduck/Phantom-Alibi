import { background, container, dialogueContainer, dialogueText, dialogueTitle, spriteContainer, sprite2 } from './constants.js';
import { environment } from './environment.js';
import { typeText } from './ui/dialogue.js';
import { gameState } from './index.js';

// Methods for zooming in and out of the background
export function zoomIn() { background.classList.add('zoom'); }
export function zoomOut() { background.classList.remove('zoom'); }
export function toggleZoom() { background.classList.toggle('zoom'); }

// Method for changing the background (i.e. Location)
export function changeBackground(newBackground, sceneType, dialogue) {
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
export async function setScene(action) {
    // Get Scene metadata from JSON
    const response = await fetch("./assets/story.json");
    const data = await response.json();
    const scenes = data["scenes"];
    const itemCatalogue = data["items"];
    const sceneLength = Object.keys(scenes).length;

    // Handle scene change by moving to the next or previous scene position
    if (action === "curr") {
        // Keep current scene
    } else if (action === "next" && gameState.currentScene <= sceneLength - 2) {
        gameState.currentScene += 1;
    } else if (action === "prev" && gameState.currentScene != 0) {
        gameState.currentScene -= 1;
    }

    // Update the dialogue box -- present in parts if dialogue exceeds box word limit
    dialogueTitle.innerHTML = ' &#x2746; &nbsp; ' + scenes[`scene_${gameState.currentScene}`]['character_name'] + ' ';
    const dialogue = scenes[`scene_${gameState.currentScene}`]['dialogue'];

    // Update the current scene to have no dialogue box (if needed) 
    const textType = scenes[`scene_${gameState.currentScene}`][`type`];
    if (textType == "none") {
        dialogueContainer.style.translate = "-100vw";
    } else {
        dialogueContainer.style.translate = "0";
    }

    // Update the scene based on the scene object
    changeBackground(
        scenes[`scene_${gameState.currentScene}`]['background'], 
        scenes[`scene_${gameState.currentScene}`]['type'], 
        scenes[`scene_${gameState.currentScene}`]['dialogue']
    );

    // Update the font color of the dialogue box based on the scene object
    if (scenes[`scene_${gameState.currentScene}`]['type'] == 'inner_monologue') {
        dialogueText.style.color = 'rgb(144, 238, 144)';
    } else {
        dialogueText.style.color = 'whitesmoke';
    }

    // Update the environment play area with the background items
    const sceneItems = scenes[`scene_${gameState.currentScene}`]['items'];

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
    sprite2.src = scenes[`scene_${gameState.currentScene}`]['character_sprite'];
    sprite2.classList.add("show");
    typeText(dialogue, dialogueText);
} 