import { useEffect } from 'react'
import useStore from './store'
import Background from './components/Background'
import Sidebar from './components/Sidebar'
import Dialogue from './components/Dialogue'
import Sprites from './components/Sprites'
import Overlay from './components/Overlay'
import ClickToPlay from './components/ClickToPlay'
import SaveListMenu from './components/SaveListMenu'
import SettingsMenu from './components/SettingsMenu'
import CreditsMenu from './components/CreditsMenu'
import HelpMenu from './components/HelpMenu'
import RestartConfirmation from './components/RestartConfirmation'
import Carousel from './components/Carousel'
import './App.css'

function App() {
  const { 
    updateLoadButtonState,
    setupKeyboardListeners,
    cleanupKeyboardListeners
  } = useStore(state => ({
    updateLoadButtonState: state.updateLoadButtonState,
    setupKeyboardListeners: state.setupKeyboardListeners,
    cleanupKeyboardListeners: state.cleanupKeyboardListeners
  }));

  // Set up event listeners on mount
  useEffect(() => {
    // Check for saved games to update load button state
    updateLoadButtonState();
    
    // Set up keyboard event listeners
    setupKeyboardListeners();
    
    // Clean up event listeners on unmount
    return () => {
      cleanupKeyboardListeners();
    };
  }, [updateLoadButtonState, setupKeyboardListeners, cleanupKeyboardListeners]);

  return (
    <div id="container">
      <Background />
      <Sidebar />
      <Sprites />
      <Dialogue />
      <Carousel />
      <Overlay />
      <ClickToPlay />
      <SaveListMenu />
      <SettingsMenu />
      <CreditsMenu />
      <HelpMenu />
      <RestartConfirmation />
    </div>
  )
}

export default App
