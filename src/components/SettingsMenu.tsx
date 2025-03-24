import { useState } from 'react';
import useStore from '../store';

const SettingsMenu = () => {
  const { 
    settingsMenuVisible,
    currentVolume,
    currentTypingSpeed,
    currentSoundEffects,
    updateSettings,
    hideSettings
  } = useStore(state => ({
    settingsMenuVisible: state.settingsMenuVisible,
    currentVolume: state.currentVolume,
    currentTypingSpeed: state.currentTypingSpeed,
    currentSoundEffects: state.currentSoundEffects,
    updateSettings: state.updateSettings,
    hideSettings: state.hideSettings
  }));

  // Local state for settings before they're applied
  const [volume, setVolume] = useState(currentVolume);
  const [typingSpeed, setTypingSpeed] = useState(currentTypingSpeed);
  const [soundEffects, setSoundEffects] = useState(currentSoundEffects);

  // Reset to current settings when dialog opens (discard changes if closed without saving)
  useState(() => {
    if (settingsMenuVisible) {
      setVolume(currentVolume);
      setTypingSpeed(currentTypingSpeed);
      setSoundEffects(currentSoundEffects);
    }
  });

  // Handle saving settings
  const handleSaveSettings = () => {
    updateSettings(volume, typingSpeed, soundEffects);
    hideSettings();
  };

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
          onChange={(e) => setVolume(parseInt(e.target.value))}
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
          onChange={(e) => setSoundEffects(parseInt(e.target.value))}
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
          onChange={(e) => setTypingSpeed(parseInt(e.target.value))}
        />
        <span id="type-speed-label">{typingSpeed}%</span>
      </div>
      
      <div id="settings-buttons">
        <button id="close-settings-btn" onClick={hideSettings}>Close</button>
        <button id="save-settings-btn" onClick={handleSaveSettings}>Save</button>
      </div>
    </div>
  );
};

export default SettingsMenu; 