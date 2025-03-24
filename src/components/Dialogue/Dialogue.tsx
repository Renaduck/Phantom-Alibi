import { useState, useCallback, memo, useEffect } from 'react';
import useStore from '../../store';
import { fetchStoryData } from '../../utils/scene';
import { Scene } from '../../types';
import TypedText from '../TypedText';
import './Dialogue.css';

// Use memo to prevent unnecessary re-renders
const Dialogue = memo(() => {
    // Use individual selectors instead of destructuring multiple properties at once
    const currentScene = useStore(state => state.currentScene);
    const dialogueVisible = useStore(state => state.dialogueVisible);
    const setScene = useStore(state => state.setScene);
    const playPageFlipSound = useStore(state => state.playPageFlipSound);
    const toggleCarousel = useStore(state => state.toggleCarousel);
    const currentTypingSpeed = useStore(state => state.currentTypingSpeed);

    // Local state
    const [characterName, setCharacterName] = useState('');
    const [dialogueContent, setDialogueContent] = useState('');
    const [dialogueType, setDialogueType] = useState('');
    const [shouldCompleteTyping, setShouldCompleteTyping] = useState(false);
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    // Cache story data to prevent multiple fetches
    const [cachedScenes, setCachedScenes] = useState<Scene[]>([]);

    // Fetch story data once and cache it
    useEffect(() => {
        let isMounted = true;

        const loadStoryData = async () => {
            try {
                if (cachedScenes.length === 0) {
                    const { scenes } = await fetchStoryData();
                    if (isMounted && scenes) {
                        setCachedScenes(scenes);
                    }
                }
            } catch (error) {
                console.error('Error loading story data:', error);
            }
        };

        loadStoryData();

        return () => {
            isMounted = false;
        };
    }, [cachedScenes.length]);

    // Update scene data when current scene changes
    useEffect(() => {
        // Only proceed if we have cached scenes
        if (!cachedScenes || !cachedScenes[currentScene]) return;

        const scene = cachedScenes[currentScene];

        // Reset typing state
        setShouldCompleteTyping(false);
        setIsTypingComplete(false);

        // Update state with scene data
        setCharacterName(scene.character_name || '');
        setDialogueContent(scene.dialogue || '');
        setDialogueType(scene.type || '');

    }, [currentScene, cachedScenes]);

    // Handle typing completion
    const handleTypingComplete = useCallback(() => {
        setIsTypingComplete(true);
    }, []);

    // Handle click to advance scene
    const handleClick = useCallback((e: React.MouseEvent) => {
        // Don't trigger for clicks on dialogue options or when sidebar is not visible
        if (
            e.target instanceof HTMLElement &&
            e.target.closest('#dialogue-options') ||
            !dialogueVisible
        ) {
            return;
        }

        // If text is still typing, complete it immediately
        if (!isTypingComplete) {
            setShouldCompleteTyping(true);
        } else {
            playPageFlipSound();
            setScene('next');
        }
    }, [dialogueVisible, isTypingComplete, playPageFlipSound, setScene]);

    // Handle next button click
    const handleNextClick = useCallback(() => {
        if (!dialogueVisible) return;

        if (!isTypingComplete) {
            setShouldCompleteTyping(true);
        } else {
            playPageFlipSound();
            setScene('next');
        }
    }, [dialogueVisible, isTypingComplete, playPageFlipSound, setScene]);

    // Handle prev button click
    const handlePrevClick = useCallback(() => {
        if (!dialogueVisible) return;
        playPageFlipSound();
        setScene('prev');
    }, [dialogueVisible, playPageFlipSound, setScene]);

    // Handle inventory button click
    const handleInventoryClick = useCallback(() => {
        toggleCarousel();
    }, [toggleCarousel]);

    // If no scenes are loaded yet
    if (cachedScenes.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div
            id="dialogue-container"
            className={dialogueVisible ? 'translate' : ''}
            onClick={handleClick}
            style={{
                display: dialogueType === 'none' ? 'none' : 'flex',
                translate: dialogueType === 'none' ? '-100vw' : '0'
            }}
        >
            <div id="dialogue-title">
                &#x2746; &nbsp; {characterName}
            </div>

            <div
                id="dialogue-text"
                style={{
                    color: dialogueType === 'inner_monologue' ? 'rgb(144, 238, 144)' : 'whitesmoke'
                }}
            >
                <TypedText
                    content={dialogueContent}
                    typingSpeed={currentTypingSpeed}
                    color={dialogueType === 'inner_monologue' ? 'rgb(144, 238, 144)' : 'whitesmoke'}
                    onComplete={handleTypingComplete}
                    shouldComplete={shouldCompleteTyping}
                />
            </div>

            <div id="dialogue-options">
                <div id="next-btn" onClick={handleNextClick}>Next</div>
                <div id="inventory-btn" onClick={handleInventoryClick}>Inventory</div>
                <div id="prev-btn" onClick={handlePrevClick}>Prev</div>
            </div>
        </div>
    );
});

export default Dialogue; 