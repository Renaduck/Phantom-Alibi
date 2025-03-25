import { useEffect, Fragment, useState, useCallback } from 'react'
import useStore from './core/store'
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
import HelpButton from './components/HelpButton'
import RestartConfirmation from './components/RestartConfimation'
import Carousel from './components/Carousel'
import InteractiveItems from './components/InteractiveItems'
import { fetchStoryData } from './services/scene'
import { SCENE_TYPES } from './common/constants'

import './App.css'

// Immediately log when the App module loads
console.log('App module loaded');

function App() {
    console.log('App function - START rendering');
    // Use individual selectors instead of destructuring multiple properties
    const setupKeyboardListeners = useStore(state => state.setupKeyboardListeners);
    const cleanupKeyboardListeners = useStore(state => state.cleanupKeyboardListeners);
    const currentScene = useStore(state => state.currentScene);
    const gameStarted = useStore(state => state.gameStarted);
    const sidebarVisible = useStore(state => state.sidebarVisible);

    // debug logging
    console.log('Initial state:', {
        gameStarted,
        sidebarVisible,
        currentScene
    });

    const [isOverlayTextScene, setIsOverlayTextScene] = useState(false);
    const [overlayTextContent, setOverlayTextContent] = useState('');
    const [sceneType, setSceneType] = useState<string>('');
    const [hasCharacterSprite, setHasCharacterSprite] = useState(false);
    const [hasInteractiveItems, setHasInteractiveItems] = useState(false);

    // Check if current scene is an overlay text scene
    useEffect(() => {
        // Don't load scene data if the game hasn't started
        if (!gameStarted) {
            setIsOverlayTextScene(false);
            setOverlayTextContent('');
            setSceneType('');
            setHasCharacterSprite(false);
            setHasInteractiveItems(false);
            return;
        }

        const loadSceneData = async () => {
            try {
                const { scenes } = await fetchStoryData();
                if (scenes && scenes[currentScene]) {
                    const scene = scenes[currentScene];
                    console.log('Current scene:', scene);

                    // Get scene type and sanitize it
                    let type = scene.type || '';
                    console.log('Raw scene type:', type);

                    // Check if scene has character sprite
                    const hasSprite = !!(scene.character_sprite && scene.character_sprite.trim());
                    setHasCharacterSprite(hasSprite);

                    // Check if scene has interactive items
                    const hasItems = !!(scene.items && scene.items.length > 0);
                    setHasInteractiveItems(hasItems);

                    // Properly handle multi-type formats like "overlay_text / dialogue / inner_monologue"
                    // This logic is kept in case we encounter slash-delimited types in the future
                    if (type.includes('/')) {
                        // Split by slash and trim each type
                        const types = type.split('/').map(t => t.trim());
                        console.log('Split scene types:', types);

                        // If it contains overlay_text, prioritize that
                        if (types.includes(SCENE_TYPES.OVERLAY_TEXT)) {
                            type = SCENE_TYPES.OVERLAY_TEXT;
                        }
                        // Otherwise use the first type
                        else {
                            type = types[0];
                        }
                    }

                    console.log('Processed scene type:', type);
                    setSceneType(type);

                    // Check if this is an overlay text scene
                    const isOverlay = type === SCENE_TYPES.OVERLAY_TEXT;
                    setIsOverlayTextScene(isOverlay);

                    if (isOverlay) {
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

    // Callback to handle completion of overlay text typing
    const handleOverlayTextComplete = useCallback(() => {
        console.log('Overlay text typing completed');
    }, []);

    // Should sprites be displayed?
    // Only show sprites if:
    // 1. Game has started
    // 2. Not in an overlay text scene
    // 3. Has a character sprite defined
    const shouldShowSprites = gameStarted &&
        !isOverlayTextScene &&
        hasCharacterSprite;

    console.log('App render - gameStarted:', gameStarted,
        'isOverlayTextScene:', isOverlayTextScene,
        'sceneType:', sceneType,
        'hasCharacterSprite:', hasCharacterSprite,
        'hasInteractiveItems:', hasInteractiveItems,
        'shouldShowSprites:', shouldShowSprites);

    // Track what components are being rendered
    console.log('Rendering components:',
        gameStarted ? 'Game Started - ' : 'Game Not Started - ',
        shouldShowSprites ? 'Sprites - ' : 'No Sprites - ',
        hasInteractiveItems ? 'Interactive Items - ' : 'No Interactive Items - ',
        !isOverlayTextScene && gameStarted ? 'Dialogue' : 'No Dialogue'
    );

    console.log('App function - DONE creating render logic');
    return (
        <Fragment>
            <Background />
            {!gameStarted && <Sidebar />}
            <HelpButton />
            {shouldShowSprites && <Sprites />}
            {gameStarted && !isOverlayTextScene && <Dialogue />}
            {gameStarted && hasInteractiveItems && <InteractiveItems />}
            {gameStarted && isOverlayTextScene && (
                <OverlayText
                    content={overlayTextContent}
                    onComplete={handleOverlayTextComplete}
                />
            )}
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
