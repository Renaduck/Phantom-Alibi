import { useEffect, useState } from 'react';
import useStore from '../store';
import { SaveData } from '../types';

const SaveListMenu = () => {
  const { 
    saveListMenuVisible, 
    hideSaveList,
    getSavedGames,
    loadGame,
    saveGame,
    deleteSave
  } = useStore(state => ({
    saveListMenuVisible: state.saveListMenuVisible,
    hideSaveList: state.hideSaveList,
    getSavedGames: state.getSavedGames,
    loadGame: state.loadGame,
    saveGame: state.saveGame,
    deleteSave: state.deleteSave
  }));

  const [saves, setSaves] = useState<Record<string, SaveData>>({});
  const [selectedSaveId, setSelectedSaveId] = useState<string | null>(null);
  const [mode, setMode] = useState<'load' | 'save' | 'delete'>('load');

  // Fetch saved games when component mounts or becomes visible
  useEffect(() => {
    if (saveListMenuVisible) {
      const savedGames = getSavedGames();
      setSaves(savedGames);
    }
  }, [saveListMenuVisible, getSavedGames]);

  if (!saveListMenuVisible) {
    return null;
  }

  // Handle save selection
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

  // Simple placeholder for now
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
        {mode === 'load' && (
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
};

export default SaveListMenu; 