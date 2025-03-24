import React, { useState, useEffect } from 'react';
import useStore from '../../store';
import { fetchStoryData } from '../../utils/scene';
import { getAsset } from '../../utils/assets';
import './Sprites.css';

const Sprites = () => {
    const [characterSprite, setCharacterSprite] = useState<string | null>(null);
    const [characterName, setCharacterName] = useState<string | null>(null);

    const currentScene = useStore(state => state.currentScene);

    useEffect(() => {
        const loadSprite = async () => {
            try {
                const { scenes } = await fetchStoryData();
                if (scenes && scenes[currentScene]) {
                    const scene = scenes[currentScene];

                    // Set character name
                    setCharacterName(scene.character_name || null);

                    // Set character sprite if available
                    if (scene.character_sprite && scene.character_sprite.trim() !== '') {
                        setCharacterSprite(getAsset(scene.character_sprite, 'sprite'));
                    } else {
                        setCharacterSprite(null);
                    }
                }
            } catch (error) {
                console.error('Error loading sprite:', error);
                setCharacterSprite(null);
                setCharacterName(null);
            }
        };

        loadSprite();
    }, [currentScene]);

    if (!characterSprite) return null;

    return (
        <div className="sprite-container">
            <img
                src={characterSprite}
                alt={characterName || 'character'}
                className="character-sprite"
            />
        </div>
    );
};

export default Sprites; 