import { useState, useCallback, memo, useEffect } from 'react';
import useStore from '../../core/store';
import { fetchStoryData } from '../../services/scene';
import TypedText from '../TypedText';
import ContinueMarker from '../ContinueMarker';
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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Update scene data when current scene changes
    useEffect(() => {
        console.log(`Dialogue: Loading data for scene ${currentScene}`);
        setIsLoading(true);
        setError(null);

        const loadSceneData = async () => {
            try {
                const storyData = await fetchStoryData();

                if (!storyData || !storyData.scenes) {
                    console.error('No story data or scenes available');
                    setError('Failed to load story data');
                    setIsLoading(false);
                    return;
                }

                if (!storyData.scenes[currentScene]) {
                    console.error(`Scene ${currentScene} not found (max: ${storyData.scenes.length - 1})`);
                    setError(`Scene ${currentScene} not found`);
                    setIsLoading(false);
                    return;
                }

                const scene = storyData.scenes[currentScene];
                console.log(`Dialogue: Loaded scene ${currentScene}:`, scene);

                // Reset typing state
                setShouldCompleteTyping(false);
                setIsTypingComplete(false);

                // Update state with scene data
                setCharacterName(scene.character_name || '');
                setDialogueContent(scene.dialogue || '');
                setDialogueType(scene.type || '');
                setIsLoading(false);
            } catch (err) {
                console.error('Error loading scene data:', err);
                setError('Error loading scene data');
                setIsLoading(false);
            }
        };

        loadSceneData();
    }, [currentScene]);

    // Handle typing completion
    const handleTypingComplete = useCallback(() => {
        console.log('Dialogue: Typing complete');
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
            console.log('Dialogue: Completing typing on click');
            setShouldCompleteTyping(true);
        } else {
            console.log('Dialogue: Advancing to next scene on click');
            playPageFlipSound();
            setScene('next');
        }
    }, [dialogueVisible, isTypingComplete, playPageFlipSound, setScene]);

    // Handle next button click
    const handleNextClick = useCallback(() => {
        if (!dialogueVisible) return;

        if (!isTypingComplete) {
            console.log('Dialogue: Completing typing on next button');
            setShouldCompleteTyping(true);
        } else {
            console.log('Dialogue: Advancing to next scene on next button');
            playPageFlipSound();
            setScene('next');
        }
    }, [dialogueVisible, isTypingComplete, playPageFlipSound, setScene]);

    // Handle prev button click
    const handlePrevClick = useCallback(() => {
        if (!dialogueVisible) return;
        console.log('Dialogue: Going to previous scene');
        playPageFlipSound();
        setScene('prev');
    }, [dialogueVisible, playPageFlipSound, setScene]);

    // Handle inventory button click
    const handleInventoryClick = useCallback(() => {
        console.log('Dialogue: Toggling inventory');
        toggleCarousel();
    }, [toggleCarousel]);

    // If still loading
    if (isLoading) {
        return <div className="dialogue-loading">Loading...</div>;
    }

    // If error occurred
    if (error) {
        return <div className="dialogue-error">{error}</div>;
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

            {isTypingComplete && (
                <ContinueMarker
                    onClick={handleNextClick}
                    color={dialogueType === 'inner_monologue' ? 'rgb(144, 238, 144)' : 'whitesmoke'}
                />
            )}

            <div id="dialogue-options">
                <div id="next-btn" onClick={handleNextClick}>Next</div>
                <div id="inventory-btn" onClick={handleInventoryClick}>Inventory</div>
                <div id="prev-btn" onClick={handlePrevClick}>Prev</div>
            </div>
        </div>
    );
});

export default Dialogue; 