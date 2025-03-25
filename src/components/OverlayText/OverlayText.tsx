import { memo, useState, useCallback } from 'react';
import useStore from '../../store';
import TypedText from '../TypedText';
import ContinueMarker from '../ContinueMarker';
import './OverlayText.css';

interface OverlayTextProps {
    content: string;
    onComplete?: () => void;
}

const OverlayText = memo(({ content, onComplete }: OverlayTextProps) => {
    const [shouldCompleteTyping, setShouldCompleteTyping] = useState(false);
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const currentTypingSpeed = useStore(state => state.currentTypingSpeed);
    const setScene = useStore(state => state.setScene);
    const playPageFlipSound = useStore(state => state.playPageFlipSound);

    // Handle typing completion
    const handleTypingComplete = useCallback(() => {
        setIsTypingComplete(true);
        if (onComplete) {
            onComplete();
        }
    }, [onComplete]);

    // Handle click to advance scene
    const handleClick = useCallback(() => {
        if (!isTypingComplete) {
            setShouldCompleteTyping(true);
        } else {
            playPageFlipSound();
            setScene('next');
        }
    }, [isTypingComplete, playPageFlipSound, setScene]);

    return (
        <div className="overlay-text-container" onClick={handleClick}>
            <div className="overlay-text-content">
                <TypedText
                    content={content}
                    typingSpeed={currentTypingSpeed}
                    color="whitesmoke"
                    onComplete={handleTypingComplete}
                    shouldComplete={shouldCompleteTyping}
                />

                {isTypingComplete && (
                    <ContinueMarker
                        onClick={handleClick}
                        color="whitesmoke"
                    />
                )}
            </div>
        </div>
    );
});

export default OverlayText; 