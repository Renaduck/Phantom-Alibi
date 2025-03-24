import { useState } from 'react';
import useStore from '../store';

const ClickToPlay = () => {
  const [hidden, setHidden] = useState(false);
  const playBackgroundMusic = useStore(state => state.playBackgroundMusic);

  const handleClick = () => {
    // Play background music when user first interacts with the page
    playBackgroundMusic();
    
    // Hide the overlay
    setHidden(true);
  };

  if (hidden) {
    return null;
  }

  return (
    <div id="click-to-play-overlay" onClick={handleClick}>
      <div className="click-to-play-content">
        <h2>PLAY GAME</h2>
        <p>Click to start</p>
      </div>
    </div>
  );
};

export default ClickToPlay; 