import { useState, useEffect, useRef, memo } from 'react';

interface TypedTextProps {
    content: string;
    typingSpeed: number;
    color?: string;
    onComplete?: () => void;
    shouldComplete?: boolean;
}

// Dedicated component for typed text animation that uses React state instead of DOM manipulation
const TypedText = memo(({ content, typingSpeed, color = 'whitesmoke', onComplete, shouldComplete = false }: TypedTextProps) => {
    // Track how much of the text to show
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    // Store interval ID for cleanup
    const intervalRef = useRef<number | null>(null);

    // Handle typing animation
    useEffect(() => {
        // Clear existing text and reset when content changes
        setDisplayedText('');
        setIsComplete(false);

        // Clean up any existing interval
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Skip animation if no content
        if (!content) {
            setIsComplete(true);
            return;
        }

        // Calculate typing speed
        const speed = Math.max(10, typingSpeed / 50 * 15);
        let index = 0;

        // Start typing animation
        intervalRef.current = window.setInterval(() => {
            if (index < content.length) {
                setDisplayedText(prev => prev + content.charAt(index));
                index++;
            } else {
                // Animation complete
                if (intervalRef.current !== null) {
                    window.clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                setIsComplete(true);
                if (onComplete) {
                    onComplete();
                }
            }
        }, speed);

        // Cleanup function
        return () => {
            if (intervalRef.current !== null) {
                window.clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [content, typingSpeed, onComplete]);

    // Handle forced completion
    useEffect(() => {
        if (shouldComplete && !isComplete && content !== displayedText) {
            // Force animation to complete immediately
            if (intervalRef.current !== null) {
                window.clearInterval(intervalRef.current);
                intervalRef.current = null;
            }

            setDisplayedText(content);
            setIsComplete(true);

            if (onComplete) {
                onComplete();
            }
        }
    }, [shouldComplete, isComplete, content, displayedText, onComplete]);

    return (
        <div style={{ color }}>
            {displayedText}
        </div>
    );
});

export default TypedText; 