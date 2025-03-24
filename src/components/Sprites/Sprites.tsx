import React, { useState, useEffect, memo } from 'react';
import useStore from '../../store';
import { fetchStoryData } from '../../utils/scene';
import { getAsset } from '../../utils/assets';
import './Sprites.css'; // Component-specific CSS

// Immediately log when the module is loaded
console.log('Sprites module loaded');

const Sprites = memo(() => {
    console.log('Sprites component rendering - START');

    const [characterSprite, setCharacterSprite] = useState<string | null>(null);
    const [characterName, setCharacterName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const currentScene = useStore(state => state.currentScene);
    const gameStarted = useStore(state => state.gameStarted);

    // Immediate log when component is rendered
    console.log('Sprites render - currentScene:', currentScene, 'gameStarted:', gameStarted);

    useEffect(() => {
        console.log('Sprites useEffect triggered');
        if (!gameStarted) {
            console.log('Game not started, skipping sprite loading');
            return;
        }

        const loadSprite = async () => {
            try {
                console.log('Loading sprite data from story.json');
                const { scenes } = await fetchStoryData();
                if (scenes && scenes[currentScene]) {
                    const scene = scenes[currentScene];
                    console.log('Loading sprite from scene:', scene);

                    // Check if this is a scene type that should show sprites
                    const sceneType = scene.type || '';
                    if (sceneType === 'overlay_text' || sceneType.includes('overlay_text')) {
                        console.log('Overlay text scene, not showing sprite');
                        setCharacterSprite(null);
                        return;
                    }

                    // Set character name
                    setCharacterName(scene.character_name || null);

                    // Set character sprite if available
                    if (scene.character_sprite && scene.character_sprite.trim() !== '') {
                        const spritePath = scene.character_sprite;
                        console.log('Character sprite path:', spritePath);

                        const spriteAsset = getAsset(spritePath, 'sprite');
                        console.log('Resolved sprite asset:', spriteAsset);

                        if (!spriteAsset) {
                            console.error('Failed to resolve sprite:', spritePath);
                            setError(`Could not resolve sprite: ${spritePath}`);
                            setCharacterSprite(null);
                        } else {
                            console.log('Setting character sprite:', spriteAsset);

                            // Ensure we're using the full URL, not just a filename
                            if (spriteAsset && !spriteAsset.startsWith('/')) {
                                console.error('Asset URL not properly resolved, got:', spriteAsset);
                                setError(`Invalid asset URL: ${spriteAsset}`);
                                setCharacterSprite(null);
                            } else {
                                setCharacterSprite(spriteAsset);
                            }
                        }
                    } else {
                        console.log('No character sprite in scene data');
                        setCharacterSprite(null);
                    }
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                console.error('Error loading sprite:', errorMessage);
                setError(`Error loading sprite: ${errorMessage}`);
                setCharacterSprite(null);
                setCharacterName(null);
            }
        };

        loadSprite();
    }, [currentScene, gameStarted]);

    // Skip rendering if no sprite to display
    if (!characterSprite) {
        console.log('No character sprite to display');
        if (error) {
            console.error('Rendering error message:', error);
            return (
                <div className="sprite-container">
                    <div className="error-message">{error}</div>
                </div>
            );
        }
        return null;
    }

    console.log('Rendering sprite component with image URL:', characterSprite);

    // Wrap the entire render in a try/catch to catch any silent errors
    try {
        return (
            <div id="sprite-container" className="sprite-container">
                <div id="sprite-1" className="sprite-position show">
                    <img
                        src={characterSprite}
                        alt={characterName || 'character'}
                        onError={(e) => {
                            console.error('Image failed to load:', characterSprite);
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Prevent infinite error loops
                            target.alt = "Failed to load character sprite";
                            setError(`Failed to load image: ${characterSprite}`);
                        }}
                    />
                </div>
            </div>
        );
    } catch (e) {
        console.error('Error rendering Sprites component:', e);
        return (
            <div className="sprite-container">
                <div className="error-message">Error rendering sprite</div>
            </div>
        );
    } finally {
        console.log('Sprites component rendering - END');
    }
});

export default Sprites; 