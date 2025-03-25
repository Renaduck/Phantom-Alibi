import { Scene } from '../common/types';
import { SCENE_TYPES } from '../common/constants';
import exteriorBg from '../assets/scenes/exterior.jpg';
import storyData from '../assets/story/main';

// Interface for story data
interface StoryData {
    scenes: Scene[];
    items: Record<string, unknown>;
}

// Fallback data to use if story data import fails
const fallbackData: StoryData = {
    scenes: [
        {
            character_name: "Narrator",
            dialogue: "Failed to load story data. Please check if story files exist in the assets directory.",
            background: exteriorBg,
            type: "inner_monologue",
            character_sprite: "",
            items: []
        }
    ],
    items: {}
};

// Get story data using direct import instead of fetch
export async function fetchStoryData(): Promise<StoryData> {
    try {
        console.log('Fetching story data from modular format');

        // Add validation to ensure storyData has the expected structure
        if (!storyData) {
            console.error('storyData is undefined or null');
            return fallbackData;
        }

        if (!storyData.scenes || !Array.isArray(storyData.scenes)) {
            console.error('storyData.scenes is missing or not an array:', storyData);
            return fallbackData;
        }

        console.log(`Successfully loaded story data with ${storyData.scenes.length} scenes`);
        return storyData as StoryData;
    } catch (error) {
        console.error("Error loading story data:", error);
        return fallbackData;
    }
}

// Change the background image and scene type
export function changeBackground(
    background: HTMLElement,
    spriteContainer: HTMLElement,
    dialogueContainer: HTMLElement,
    container: HTMLElement,
    newBackgroundUrl: string,
    sceneType: string,
    dialogue: string,
    typeTextFn: (text: string, element: HTMLElement, speed: number) => void
): void {
    // Remove any existing overlay text
    const existingOverlayText = document.querySelector('.overlay-text');
    if (existingOverlayText) {
        existingOverlayText.remove();
    }

    if (sceneType === SCENE_TYPES.OVERLAY_TEXT) {
        // Set up overlay text mode
        background.style.filter = 'brightness(0)';
        spriteContainer.style.display = "none";
        dialogueContainer.style.display = "none";

        // Create overlay text element
        const overlayText = document.createElement('div');
        overlayText.classList.add('overlay-text');
        overlayText.style.filter = 'brightness(1)';
        container.appendChild(overlayText);

        setTimeout(() => {
            typeTextFn(dialogue, overlayText, 50);
        }, 100);

        // Add a fade-in effect
        overlayText.style.opacity = "0";
        overlayText.style.transition = "opacity 0.5s ease-in-out";
        setTimeout(() => {
            overlayText.style.opacity = "1";
        }, 150);
    } else {
        // Standard scene mode
        background.style.filter = 'brightness(1)';
        spriteContainer.style.display = "flex";
        dialogueContainer.style.display = "flex";
    }

    // Update background image - make sure the path is correct for Vite
    try {
        background.style.backgroundImage = `url(${newBackgroundUrl})`;
        console.log('Successfully set background image:', newBackgroundUrl);
    } catch (error) {
        console.error('Error setting background image:', error);
        // Use fallback
        background.style.backgroundImage = `url(${exteriorBg})`;
    }
}

// Add a continue marker to navigate to the next scene
export function addContinueMarker(
    textType: string,
    dialogueContainer: HTMLElement,
    container: HTMLElement,
    onContinue: () => void
): void {
    // Remove any existing marker first
    const existingMarker = document.querySelector('.continue-marker');
    if (existingMarker) {
        existingMarker.remove();
    }

    // Create and add the continue marker
    const continueMarker = document.createElement('div');
    continueMarker.className = 'continue-marker';
    continueMarker.innerHTML = '▼'; // Unicode down arrow instead of iconify
    continueMarker.style.cursor = 'pointer';

    // Add click event listener to advance to the next scene
    continueMarker.addEventListener('click', onContinue);

    // Determine where to add the marker based on scene type
    if (textType === SCENE_TYPES.OVERLAY_TEXT) {
        container.appendChild(continueMarker);
        console.log('Added continue marker to overlay text container');
    } else if (textType !== SCENE_TYPES.NONE) {
        dialogueContainer.appendChild(continueMarker);
        console.log('Added continue marker to dialogue container');
    } else {
        console.log('No continue marker added for scene type:', textType);
    }
} 