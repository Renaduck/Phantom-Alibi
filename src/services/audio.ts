// Audio utility functions for Vite
import pageFlipSrc from '../assets/audio/page-flip.mp3';
import ominousSrc from '../assets/audio/ominous.mp3';
import itemAcquiredSrc from '../assets/audio/item-acquired.mp3';
import swooshSrc from '../assets/audio/swoosh.mp3';
import {
    PAGE_FLIP_VOLUME_MODIFIER,
    ITEM_ACQUIRED_VOLUME_MODIFIER,
    SWOOSH_VOLUME_MODIFIER,
    SWOOSH_PLAYBACK_RATE
} from '../common/constants';

// Create audio objects
let pageFlipAudio: HTMLAudioElement | null = null;
let backgroundAudio: HTMLAudioElement | null = null;
let itemAcquiredAudio: HTMLAudioElement | null = null;
let swooshAudio: HTMLAudioElement | null = null;

// Initialize audio objects safely
function initAudio() {
    if (typeof window !== 'undefined') {
        pageFlipAudio = new Audio(pageFlipSrc);
        backgroundAudio = new Audio(ominousSrc);
        itemAcquiredAudio = new Audio(itemAcquiredSrc);
        swooshAudio = new Audio(swooshSrc);

        // Set loop to true for continuous playback
        if (backgroundAudio) {
            backgroundAudio.loop = true;
        }
    }
}

// Initialize audio on import
initAudio();

// Play page flip sound
export function playPageFlipSound(soundEffectsVolume: number): void {
    if (!pageFlipAudio) return;

    if (pageFlipAudio.paused) {
        pageFlipAudio.volume = (soundEffectsVolume / 100) * PAGE_FLIP_VOLUME_MODIFIER;
        pageFlipAudio.play().catch(() => {
            console.log("Audio playback prevented");
        });
    } else {
        pageFlipAudio.currentTime = 0;
    }
}

// Play item acquired sound
export function playItemAcquiredSound(soundEffectsVolume: number): void {
    if (!itemAcquiredAudio) return;

    if (itemAcquiredAudio.paused) {
        itemAcquiredAudio.volume = (soundEffectsVolume / 100) * ITEM_ACQUIRED_VOLUME_MODIFIER;
        itemAcquiredAudio.play().catch(() => {
            console.log("Audio playback prevented");
        });
    } else {
        itemAcquiredAudio.currentTime = 0;
    }
}

// Play swoosh sound
export function playSwooshSound(soundEffectsVolume: number): void {
    if (!swooshAudio) return;

    if (swooshAudio.paused) {
        swooshAudio.volume = (soundEffectsVolume / 100) * SWOOSH_VOLUME_MODIFIER;
        swooshAudio.playbackRate = SWOOSH_PLAYBACK_RATE;
        swooshAudio.play().catch(() => {
            console.log("Audio playback prevented");
        });
    } else {
        swooshAudio.currentTime = 0;
    }
}

// Play Background Music
export function playBackgroundMusic(volume: number): void {
    if (!backgroundAudio) return;

    backgroundAudio.volume = volume / 100;

    // Browser autoplay policy fix
    backgroundAudio.play().catch(() => {
        console.log("Background music playback prevented. Click to play.");
    });
} 