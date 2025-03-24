import { useCallback, useEffect, useState, memo } from 'react';
import useStore from '../store';

// Using memo to prevent unnecessary re-renders
const Sidebar = memo(() => {
    // Use local state for save games instead of store state
    const [hasSavedGames, setHasSavedGames] = useState(false);

    // Split store selections to minimize re-renders
    const sidebarVisible = useStore(state => state.sidebarVisible);
    const gameStarted = useStore(state => state.gameStarted);
    const showSaveList = useStore(state => state.showSaveList);
    const showRestartConfirmation = useStore(state => state.showRestartConfirmation);
    const showCredits = useStore(state => state.showCredits);
    const showSettings = useStore(state => state.showSettings);
    const toggleSidebar = useStore(state => state.toggleSidebar);
    const startGame = useStore(state => state.startGame);
    const getSavedGames = useStore(state => state.getSavedGames);

    // Check for saved games without modifying store state
    const checkSavedGames = useCallback(() => {
        try {
            const savedGames = getSavedGames();
            const hasGames = Object.keys(savedGames).length > 0;
            setHasSavedGames(hasGames);
        } catch (error) {
            console.error("Error checking saved games:", error);
            setHasSavedGames(false);
        }
    }, [getSavedGames]);

    // Only check for saved games when the component mounts
    useEffect(() => {
        checkSavedGames();
        // We intentionally don't include gameStarted as a dependency
        // to prevent re-renders, since we only need to check on mount and 
        // when explicitly triggered by game actions
    }, [checkSavedGames]);

    // Handle start game button click
    const handlePlayClick = useCallback(() => {
        if (!gameStarted) {
            startGame();
        } else {
            toggleSidebar();
        }
    }, [gameStarted, startGame, toggleSidebar]);

    // Handle load game button click
    const handleLoadClick = useCallback(() => {
        if (hasSavedGames) {
            showSaveList('load');
        }
    }, [hasSavedGames, showSaveList]);

    // Handle save game button click
    const handleSaveClick = useCallback(() => {
        showSaveList('save');
        // After saving, we should check for saved games again
        setTimeout(checkSavedGames, 100);
    }, [showSaveList, checkSavedGames]);

    return (
        <div id="sidebar" className={sidebarVisible ? '' : 'translate'}>
            <div id="side-container">
                <h2>Phantom Alibi</h2>

                <div id="play-game" onClick={handlePlayClick}>
                    {!gameStarted ? 'Start Game' : 'Continue Game'}
                </div>

                <div
                    id="load-menu"
                    onClick={handleLoadClick}
                    style={{
                        opacity: hasSavedGames ? 1 : 0.5,
                        cursor: hasSavedGames ? 'pointer' : 'not-allowed'
                    }}
                >
                    Load Game
                </div>

                {gameStarted && (
                    <>
                        <div id="restart" onClick={showRestartConfirmation}>
                            Restart
                        </div>

                        <div id="save-game" onClick={handleSaveClick}>
                            Save Game
                        </div>

                        <div id="load-game"
                            onClick={handleLoadClick}
                            style={{
                                opacity: hasSavedGames ? 1 : 0.5,
                                cursor: hasSavedGames ? 'pointer' : 'not-allowed'
                            }}
                        >
                            Load Game
                        </div>
                    </>
                )}

                <div id="credits" onClick={showCredits}>
                    Credits
                </div>

                <div id="settings" onClick={showSettings}>
                    Settings
                </div>
            </div>
        </div>
    );
});

export default Sidebar; 