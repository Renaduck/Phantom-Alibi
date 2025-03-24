import { useRef, useEffect, useState, memo } from 'react';
import useStore from '../../store';
import './Background.css';
import { fetchStoryData } from '../../utils/scene';
import { getAsset } from '../../utils/assets';

const Background = memo(() => {
    const backgroundRef = useRef<HTMLDivElement>(null);
    const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);

    // Only use what we need from the store, avoid destructuring properties that cause re-renders
    const setScene = useStore(state => state.setScene);
    const sidebarVisible = useStore(state => state.sidebarVisible);
    const currentScene = useStore(state => state.currentScene);
    const gameStarted = useStore(state => state.gameStarted);

    // Load the background for the current scene
    useEffect(() => {
        // If game hasn't started yet, use the exterior background for the title screen
        if (!gameStarted) {
            const defaultBg = getAsset('exterior.jpg', 'background');
            console.log('Setting default background:', defaultBg);
            setBackgroundUrl(defaultBg);
            return;
        }

        const loadBackground = async () => {
            try {
                const { scenes } = await fetchStoryData();
                if (scenes && scenes[currentScene]) {
                    const scene = scenes[currentScene];
                    console.log('Loading background for scene:', scene);

                    if (scene.background && scene.background.trim() !== '') {
                        const bgPath = scene.background;
                        console.log('Background path:', bgPath);
                        const resolvedBg = getAsset(bgPath, 'background');
                        console.log('Resolved background:', resolvedBg);
                        setBackgroundUrl(resolvedBg);
                    } else {
                        // No background specified, will use black background from CSS
                        console.log('No background specified, using black');
                        setBackgroundUrl(null);
                    }
                }
            } catch (error) {
                console.error('Error loading background:', error);
                setBackgroundUrl(null);
            }
        };

        loadBackground();
    }, [currentScene, gameStarted]);

    // Set up zoom functionality ONCE on mount
    useEffect(() => {
        // Define the functions
        const zoomInFn = () => {
            if (backgroundRef.current) {
                backgroundRef.current.classList.add('zoom');
            }
        };

        const zoomOutFn = () => {
            if (backgroundRef.current) {
                backgroundRef.current.classList.remove('zoom');
            }
        };

        const toggleZoomFn = () => {
            if (backgroundRef.current) {
                backgroundRef.current.classList.toggle('zoom');
            }
        };

        // Set the functions in the store WITHOUT triggering a re-render
        useStore.setState({
            zoomIn: zoomInFn,
            zoomOut: zoomOutFn,
            toggleZoom: toggleZoomFn
        }, false); // false = don't trigger re-renders

        // No cleanup needed for these functions
    }, []); // Empty dependency array means this runs ONCE on mount

    // Handle click event to advance scene
    const handleClick = () => {
        // Only allow navigation when sidebar is visible and game has started
        if (!sidebarVisible || !gameStarted) return;

        // Advance to the next scene on click
        setScene("next");
    };

    console.log('Rendering background with URL:', backgroundUrl);
    return (
        <div
            id="background"
            ref={backgroundRef}
            onClick={handleClick}
            style={{
                backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none',
                backgroundColor: !backgroundUrl ? 'black' : undefined
            }}
        />
    );
});

export default Background; 