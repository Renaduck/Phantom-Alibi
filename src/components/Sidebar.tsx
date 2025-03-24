import useStore from '../store';

const Sidebar = () => {
  const { 
    sidebarVisible,
    gameStarted,
    showSaveList,
    showRestartConfirmation,
    showCredits,
    showSettings,
    toggleSidebar,
    startGame,
    hasSavedGames
  } = useStore(state => ({
    sidebarVisible: state.sidebarVisible,
    gameStarted: state.gameStarted,
    showSaveList: state.showSaveList,
    showRestartConfirmation: state.showRestartConfirmation,
    showCredits: state.showCredits,
    showSettings: state.showSettings,
    toggleSidebar: state.toggleSidebar,
    startGame: state.startGame,
    hasSavedGames: state.updateLoadButtonState()
  }));

  // Handle start game button click
  const handlePlayClick = () => {
    if (!gameStarted) {
      startGame();
    } else {
      toggleSidebar();
    }
  };

  // Handle load game button click
  const handleLoadClick = () => {
    if (hasSavedGames) {
      showSaveList('load');
    }
  };

  return (
    <div id="sidebar" className={sidebarVisible ? '' : 'translate'}>
      <div id="side-container">
        <h2>Adventure &amp; Click</h2>
        
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
            
            <div id="save-game" onClick={() => showSaveList('save')}>
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
};

export default Sidebar; 