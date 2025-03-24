import useStore from '../store';

const RestartConfirmation = () => {
  const { 
    restartConfirmationVisible,
    restartGame,
    hideRestartConfirmation
  } = useStore(state => ({
    restartConfirmationVisible: state.restartConfirmationVisible,
    restartGame: state.restartGame,
    hideRestartConfirmation: state.hideRestartConfirmation
  }));

  if (!restartConfirmationVisible) {
    return null;
  }

  return (
    <div id="restart-confirmation" className="show">
      <h2>Are you sure you want to restart the game?</h2>
      <div>
        <button id="no-restart" onClick={hideRestartConfirmation}>Back</button>
        <button id="yes-restart" onClick={restartGame}>Yes</button>
      </div>
    </div>
  );
};

export default RestartConfirmation; 