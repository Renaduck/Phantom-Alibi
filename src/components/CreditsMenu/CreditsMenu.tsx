import { memo, useCallback } from 'react';
import useStore from '../../core/store';

import './CreditsMenu.css';

// Using memo to prevent unnecessary re-renders
const CreditsMenu = memo(() => {
    // Use individual selectors to minimize re-renders
    const creditsMenuVisible = useStore(state => state.creditsMenuVisible);
    const hideCredits = useStore(state => state.hideCredits);

    // Memoize the close handler
    const handleClose = useCallback(() => {
        hideCredits();
    }, [hideCredits]);

    // Early return if menu is not visible
    if (!creditsMenuVisible) {
        return null;
    }

    return (
        <div id="credits-menu" className="show">
            <h2>Credits</h2>
            <hr />
            <span>Created by: <a target="_blank">Not Real Studio</a></span>
            <span>Story & Artwork: <a href="https://github.com/Renaduck" target="_blank">Effy</a></span>
            <span>Sound Effects: <a href="https://github.com/jfeenfalcon" target="_blank">Jake, </a>
                <a target="_blank">Jayden, </a>
                <a target="_blank">Mauricio</a>
            </span>
            <span>Game Developers: <a href="https://github.com/jfeenfalcon" target="_blank">Jake, </a>
                <a target="_blank">Jayden, </a>
                <a target="_blank">Mauricio</a>
            </span>
            <button id="close-credits-btn" onClick={handleClose}>Close</button>
        </div>
    );
});

export default CreditsMenu; 