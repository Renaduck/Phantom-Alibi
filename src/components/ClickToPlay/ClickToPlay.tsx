import { useState, useCallback, memo } from 'react';
import useStore from '../../core/store';

import './ClickToPlay.css';

// Using memo to prevent unnecessary re-renders
const ClickToPlay = memo(() => {
    const [hidden, setHidden] = useState(false);
    const playBackgroundMusic = useStore(state => state.playBackgroundMusic);

    const handleClick = useCallback(() => {
        // Play background music when user first interacts with the page
        playBackgroundMusic();

        // Hide the overlay
        setHidden(true);
    }, [playBackgroundMusic]);

    if (hidden) {
        return null;
    }

    return (
        <div id="click-to-play" onClick={handleClick}>
            <div className="click-to-play-content">
                <h2>PLAY GAME</h2>
                <p>Click to start</p>
            </div>
        </div>
    );
});

export default ClickToPlay; 