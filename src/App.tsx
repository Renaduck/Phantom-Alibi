import { useEffect, Fragment } from 'react'
import './App.css'
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

function App() {
    // Use individual selectors instead of destructuring multiple properties
    const setupKeyboardListeners = useStore(state => state.setupKeyboardListeners);
    const cleanupKeyboardListeners = useStore(state => state.cleanupKeyboardListeners);

    // Set up event listeners on mount
    useEffect(() => {
        // Set up keyboard event listeners
        setupKeyboardListeners();

        // Clean up event listeners on unmount
        return () => {
            cleanupKeyboardListeners();
        };
    }, [setupKeyboardListeners, cleanupKeyboardListeners]);

    return (
        <Fragment>
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
        </Fragment>
    )
}

export default App
