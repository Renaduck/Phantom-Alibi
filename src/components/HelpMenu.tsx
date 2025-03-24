import { memo, useCallback } from 'react';
import useStore from '../store';

// Using memo to prevent unnecessary re-renders
const HelpMenu = memo(() => {
    // Use individual selectors to minimize re-renders
    const helpMenuVisible = useStore(state => state.helpMenuVisible);
    const hideHelp = useStore(state => state.hideHelp);

    // Memoize the close handler
    const handleClose = useCallback(() => {
        hideHelp();
    }, [hideHelp]);

    // Early return if menu is not visible
    if (!helpMenuVisible) {
        return null;
    }

    return (
        <div id="help-menu" className="show">
            <div className="modal-header">
                <h2>Controls</h2>
                <span
                    id="close-help-btn"
                    onClick={handleClose}
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
});

export default HelpMenu; 