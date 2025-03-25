import { soundEffectsSlider, volumeSlider } from './constants.js';

// Audio Constants 
export const pageFlipAudio = new Audio("./assets/audio/page-flip.mp3");

// Background music setup
export const backgroundAudio = new Audio("./assets/audio/ominous.mp3");
// Set loop to true for continuous playback throughout the game
backgroundAudio.loop = true;

export const itemAcquiredAudio = new Audio("./assets/audio/item-acquired.mp3");
export const swooshAudio = new Audio("./assets/audio/swoosh.mp3");

// Page flip sound
export function pageFlipSound() {
    if (pageFlipAudio.paused) {
        pageFlipAudio.volume = (soundEffectsSlider.value / 100) * 0.2;
        pageFlipAudio.play();
    } else {
        pageFlipAudio.currentTime = 0;
    }
}

// Item acquired sound
export function itemAcquiredSound() {
    if (itemAcquiredAudio.paused) {
        itemAcquiredAudio.volume = (soundEffectsSlider.value / 100) * 0.1;
        itemAcquiredAudio.play();
    } else {
        itemAcquiredAudio.currentTime = 0;
    }
}

// Swoosh sound
export function swooshSound() {
    if (swooshAudio.paused) {
        swooshAudio.volume = (soundEffectsSlider.value / 100) * 0.5;
        swooshAudio.playbackRate = 3;
        swooshAudio.play();
    } else {
        swooshAudio.currentTime = 0;
    }
}

// Play Background Music
export function playBackgroundMusic() {
    if (backgroundAudio) {
        backgroundAudio.volume = volumeSlider.value / 100;
        
        // Browser autoplay policy fix:
        // Audio.play() returns a promise that may be rejected if autoplay is blocked
        // This pattern handles the rejection gracefully instead of throwing an uncaught exception
        const playPromise = backgroundAudio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Audio playback was prevented by the browser. Click to play.");
            });
        }
    }
} 