import { memo, useCallback } from 'react';
import useStore from '../store';

// Using memo to prevent unnecessary re-renders
const RestartConfirmation = memo(() => {
    // Use individual selectors to minimize re-renders
    const restartConfirmationVisible = useStore(state => state.restartConfirmationVisible);
    const restartGame = useStore(state => state.restartGame);
    const hideRestartConfirmation = useStore(state => state.hideRestartConfirmation);

    // Memoize handlers
    const handleCancel = useCallback(() => {
        hideRestartConfirmation();
    }, [hideRestartConfirmation]);

    const handleRestart = useCallback(() => {
        restartGame();
    }, [restartGame]);

    // Early return if not visible
    if (!restartConfirmationVisible) {
        return null;
    }

    return (
        <div id="restart-confirmation" className="show">
            <h2>Are you sure you want to restart the game?</h2>
            <div>
                <button id="no-restart" onClick={handleCancel}>Back</button>
                <button id="yes-restart" onClick={handleRestart}>Yes</button>
            </div>
        </div>
    );
});

export default RestartConfirmation; 