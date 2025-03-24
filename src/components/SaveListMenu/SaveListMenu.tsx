import { useEffect, useState, memo } from 'react';
import useStore from '../../store';
import { SaveData } from '../../types';

import './SaveListMenu.css';

// Using memo to prevent unnecessary re-renders
const SaveListMenu = memo(() => {
    // Use individual selectors to minimize re-renders
    const saveListMenuVisible = useStore(state => state.saveListMenuVisible);
    const hideSaveList = useStore(state => state.hideSaveList);
    const getSavedGames = useStore(state => state.getSavedGames);
    const loadGame = useStore(state => state.loadGame);
    const deleteSave = useStore(state => state.deleteSave);
    const currentSaveMode = useStore(state => state.currentSaveMode);

    const [saves, setSaves] = useState<Record<string, SaveData>>({});
    const [selectedSaveId, setSelectedSaveId] = useState<string | null>(null);

    // Fetch saved games when component mounts or becomes visible
    useEffect(() => {
        if (saveListMenuVisible) {
            try {
                // Safely get saved games
                const savedGames = getSavedGames();
                setSaves(savedGames || {});
            } catch (error) {
                console.error("Error loading saved games:", error);
                setSaves({});
            }
        } else {
            // Reset selection when menu closes
            setSelectedSaveId(null);
        }
    }, [saveListMenuVisible, getSavedGames]);

    // Early return if menu is not visible
    if (!saveListMenuVisible) {
        return null;
    }

    // Handle save selection - no need for useCallback since this is only used in render
    const handleSaveClick = (saveId: string) => {
        setSelectedSaveId(saveId);
    };

    // Handle load button click
    const handleLoadClick = () => {
        if (selectedSaveId) {
            loadGame(selectedSaveId);
            hideSaveList();
        }
    };

    // Handle delete button click
    const handleDeleteClick = () => {
        if (selectedSaveId) {
            deleteSave(selectedSaveId);
            // Remove from local state
            const newSaves = { ...saves };
            delete newSaves[selectedSaveId];
            setSaves(newSaves);
            setSelectedSaveId(null);
        }
    };

    return (
        <div id="save-list-menu" className="show">
            <h2>Save Files</h2>
            <div id="save-list-container">
                {Object.keys(saves).length === 0 ? (
                    <div className="no-saves">No saved games found</div>
                ) : (
                    Object.entries(saves)
                        .sort(([, a], [, b]) => Number(b.id) - Number(a.id)) // Sort by timestamp (newest first)
                        .map(([saveId, save]) => (
                            <div
                                key={saveId}
                                className={`save-item ${selectedSaveId === saveId ? 'selected' : ''}`}
                                data-save-id={saveId}
                                onClick={() => handleSaveClick(saveId)}
                            >
                                <div className="save-timestamp">{save.timestamp}</div>
                                <div className="save-preview">{save.preview}</div>
                            </div>
                        ))
                )}
            </div>
            <div id="save-list-buttons">
                {currentSaveMode === 'load' && (
                    <button
                        id="load-selected-btn"
                        onClick={handleLoadClick}
                        disabled={!selectedSaveId}
                    >
                        Load Selected
                    </button>
                )}
                <button id="close-save-list-btn" onClick={hideSaveList}>Close</button>
                {Object.keys(saves).length > 0 && (
                    <button id="delete-save-btn" onClick={handleDeleteClick}>Delete</button>
                )}
            </div>
        </div>
    );
});

export default SaveListMenu; 