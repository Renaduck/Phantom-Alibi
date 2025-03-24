import { useEffect, useState, useCallback, memo } from 'react';
import useStore from '../store';
import { fetchStoryData } from '../utils/scene';

// Using memo to prevent unnecessary re-renders
const Sprites = memo(() => {
    const currentScene = useStore(state => state.currentScene);
    const setScene = useStore(state => state.setScene);
    const completeTypingAnimation = useStore(state => state.completeTypingAnimation);
    const typingInterval = useStore(state => state.typingInterval);
    const sidebarVisible = useStore(state => state.sidebarVisible);

    const [characterSprite, setCharacterSprite] = useState('');

    // Fetch and update character sprite when scene changes
    useEffect(() => {
        let isMounted = true;

        const getSceneData = async () => {
            try {
                const { scenes } = await fetchStoryData();
                if (isMounted && scenes && scenes[currentScene]) {
                    setCharacterSprite(scenes[currentScene].character_sprite || '');
                }
            } catch (error) {
                console.error('Error loading character sprite:', error);
            }
        };

        getSceneData();

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, [currentScene]);

    // Handle click to advance scene
    const handleClick = useCallback(() => {
        if (!sidebarVisible) return;

        // If text is currently typing, complete it immediately instead of advancing the scene
        if (typingInterval !== null) {
            completeTypingAnimation();
        } else {
            setScene('next');
        }
    }, [sidebarVisible, typingInterval, completeTypingAnimation, setScene]);

    return (
        <div id="sprite-container" onClick={handleClick}>
            <div id="sprite-1-container">
                {/* Empty container for sprite 1 - don't render img at all */}
            </div>
            <div id="sprite-2-container">
                {characterSprite && (
                    <img
                        id="sprite-2"
                        src={characterSprite}
                        alt="Character"
                        className="show"
                    />
                )}
            </div>
            <div id="sprite-3-container">
                {/* Empty container for sprite 3 - don't render img at all */}
            </div>
        </div>
    );
});

export default Sprites; 