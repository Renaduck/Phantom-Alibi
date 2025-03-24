import { useRef, useEffect } from 'react';
import useStore from '../store';
import exteriorBg from '../assets/scenes/exterior.jpg';

const Background = () => {
    const backgroundRef = useRef<HTMLDivElement>(null);

    // Only use what we need from the store, avoid destructuring properties that cause re-renders
    const setScene = useStore(state => state.setScene);
    const completeTypingAnimation = useStore(state => state.completeTypingAnimation);
    const typingInterval = useStore(state => state.typingInterval);
    const sidebarVisible = useStore(state => state.sidebarVisible);

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
        if (!sidebarVisible) return;

        if (typingInterval !== null) {
            completeTypingAnimation();
        } else {
            setScene("next");
        }
    };

    return (
        <div
            id="background"
            ref={backgroundRef}
            onClick={handleClick}
            style={{ backgroundImage: `url(${exteriorBg})` }}
        />
    );
};

export default Background; 