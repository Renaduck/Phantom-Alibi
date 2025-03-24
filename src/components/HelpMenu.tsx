import useStore from '../store';

const HelpMenu = () => {
  const { helpMenuVisible, hideHelp } = useStore(state => ({
    helpMenuVisible: state.helpMenuVisible,
    hideHelp: state.hideHelp
  }));

  if (!helpMenuVisible) {
    return null;
  }

  return (
    <div id="help-menu" className="show">
      <div className="modal-header">
        <h2>Controls</h2>
        <span 
          id="close-help-btn" 
          onClick={hideHelp}
          style={{ cursor: 'pointer' }}
        >
          ✕
        </span>
      </div>
      <hr />
      <div className="keybinding">
        <span>Inventory :</span>
        <span>i</span>
      </div>
      <div className="keybinding">
        <span>Toggle Sidebar :</span>
        <span>Escape</span>
      </div>
      <div className="keybinding">
        <span>Next Dialogue :</span>
        <span>Space / Right-Arrow / Enter</span>
      </div>
    </div>
  );
};

export default HelpMenu; 