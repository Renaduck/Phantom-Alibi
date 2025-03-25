import { useState, useEffect, useCallback, memo } from 'react';
import useStore from '../../core/store';

import './SettingsMenu.css';

// Use memo to prevent unnecessary re-renders
const SettingsMenu = memo(() => {
    // Use individual selectors to minimize re-renders
    const settingsMenuVisible = useStore(state => state.settingsMenuVisible);
    const currentVolume = useStore(state => state.currentVolume);
    const currentTypingSpeed = useStore(state => state.currentTypingSpeed);
    const currentSoundEffects = useStore(state => state.currentSoundEffects);
    const updateSettings = useStore(state => state.updateSettings);
    const hideSettings = useStore(state => state.hideSettings);

    // Local state for settings before they're applied
    const [volume, setVolume] = useState(currentVolume);
    const [typingSpeed, setTypingSpeed] = useState(currentTypingSpeed);
    const [soundEffects, setSoundEffects] = useState(currentSoundEffects);

    // Reset to current settings when dialog opens (discard changes if closed without saving)
    useEffect(() => {
        if (settingsMenuVisible) {
            setVolume(currentVolume);
            setTypingSpeed(currentTypingSpeed);
            setSoundEffects(currentSoundEffects);
        }
    }, [settingsMenuVisible, currentVolume, currentTypingSpeed, currentSoundEffects]);

    // Handle saving settings
    const handleSaveSettings = useCallback(() => {
        updateSettings(volume, typingSpeed, soundEffects);
        hideSettings();
    }, [volume, typingSpeed, soundEffects, updateSettings, hideSettings]);

    // Handle volume change
    const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(parseInt(e.target.value));
    }, []);

    // Handle typing speed change
    const handleTypingSpeedChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTypingSpeed(parseInt(e.target.value));
    }, []);

    // Handle sound effects change
    const handleSoundEffectsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSoundEffects(parseInt(e.target.value));
    }, []);

    if (!settingsMenuVisible) {
        return null;
    }

    return (
        <div id="settings-menu" className="show">
            <h2>Settings</h2>

            <div id="volume-container">
                <label htmlFor="volume-slider">Background Music: </label>
                <input
                    type="range"
                    id="volume-slider"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                />
                <span id="volume-label">{volume}%</span>
            </div>

            <div id="sound-effects-container">
                <label htmlFor="sound-effects-slider">Sound Effects: </label>
                <input
                    type="range"
                    id="sound-effects-slider"
                    min="0"
                    max="100"
                    value={soundEffects}
                    onChange={handleSoundEffectsChange}
                />
                <span id="sound-effects-label">{soundEffects}%</span>
            </div>

            <div id="type-speed-container">
                <label htmlFor="type-speed-slider">Typing Speed: </label>
                <input
                    type="range"
                    id="type-speed-slider"
                    min="0"
                    max="100"
                    value={typingSpeed}
                    onChange={handleTypingSpeedChange}
                />
                <span id="type-speed-label">{typingSpeed}%</span>
            </div>

            <div id="settings-buttons">
                <button id="close-settings-btn" onClick={hideSettings}>Close</button>
                <button id="save-settings-btn" onClick={handleSaveSettings}>Save</button>
            </div>
        </div>
    );
});

export default SettingsMenu; 