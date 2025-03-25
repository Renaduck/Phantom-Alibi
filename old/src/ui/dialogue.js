import { dialogueText } from '../constants.js';
import { gameState } from '../index.js';

// TypeText effect using an iterative approach with proper interruption
export function typeText(
    content = "Please submit some text...",
    element = dialogueText,
    speed = 15
) {
    clearInterval(gameState.typingInterval);              // Stop any ongoing typing effect
    element.innerHTML = "";                               // Clear existing text before starting new typing effect
    speed = gameState.currentTypingSpeed / 50 * speed;    // Adjust speed based on user settings
    
    // Store the full content in gameState for later use
    gameState.currentDialogueContent = content;
    gameState.currentDialogueElement = element;

    // Hide continue marker while typing
    const continueMarker = document.querySelector('.continue-marker');
    if (continueMarker) {
        continueMarker.style.visibility = 'hidden';
    }

    // Start typing effect
    let index = 0;
    gameState.typingInterval = setInterval(() => {
        if (index < content.length) {
            element.innerHTML += content.charAt(index);
            index++;
        } else {
            clearInterval(gameState.typingInterval); // Stop when done typing
            gameState.typingInterval = null;         // Reset typing interval
            
            // Show continue marker after typing is complete
            if (continueMarker) {
                continueMarker.style.visibility = 'visible';
            }
        }
    }, speed);
}

// Function to immediately complete any ongoing typing animation
export function completeTypingAnimation() {
    if (gameState.typingInterval !== null) {
        clearInterval(gameState.typingInterval);
        
        // Set the content immediately to its final state
        if (gameState.currentDialogueContent && gameState.currentDialogueElement) {
            gameState.currentDialogueElement.innerHTML = gameState.currentDialogueContent;
        }
        
        // Reset typing interval
        gameState.typingInterval = null;
        
        // Show continue marker after typing is complete
        const continueMarker = document.querySelector('.continue-marker');
        if (continueMarker) {
            continueMarker.style.visibility = 'visible';
        }
    }
} 