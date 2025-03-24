import { useEffect, Fragment } from 'react'
import './App.css'
import useStore from './store'
import Background from './components/Background'
import Sidebar from './components/Sidebar'
import Dialogue from './components/Dialogue'
import Sprites from './components/Sprites'
import Overlay from './components/Overlay'
import OverlayText from './components/OverlayText'
import ClickToPlay from './components/ClickToPlay'
import SaveListMenu from './components/SaveListMenu'
import SettingsMenu from './components/SettingsMenu'
import CreditsMenu from './components/CreditsMenu'
import HelpMenu from './components/HelpMenu'
import RestartConfirmation from './components/RestartConfirmation'
import Carousel from './components/Carousel'
import { useState } from 'react'
import { fetchStoryData } from './utils/scene'

function App() {
    // Use individual selectors instead of destructuring multiple properties
    const setupKeyboardListeners = useStore(state => state.setupKeyboardListeners);
    const cleanupKeyboardListeners = useStore(state => state.cleanupKeyboardListeners);
    const currentScene = useStore(state => state.currentScene);
    const gameStarted = useStore(state => state.gameStarted);

    const [isOverlayTextScene, setIsOverlayTextScene] = useState(false);
    const [overlayTextContent, setOverlayTextContent] = useState('');

    // Check if current scene is an overlay text scene
    useEffect(() => {
        // Don't load scene data if the game hasn't started
        if (!gameStarted) {
            setIsOverlayTextScene(false);
            setOverlayTextContent('');
            return;
        }

        const loadSceneData = async () => {
            try {
                const { scenes } = await fetchStoryData();
                if (scenes && scenes[currentScene]) {
                    const scene = scenes[currentScene];
                    setIsOverlayTextScene(scene.type === 'overlay_text');
                    if (scene.type === 'overlay_text') {
                        setOverlayTextContent(scene.dialogue);
                    }
                }
            } catch (error) {
                console.error('Error loading scene data:', error);
            }
        };

        loadSceneData();
    }, [currentScene, gameStarted]);

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
            {gameStarted && <Sprites />}
            {gameStarted && !isOverlayTextScene && <Dialogue />}
            {gameStarted && isOverlayTextScene && <OverlayText content={overlayTextContent} />}
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
