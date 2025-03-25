import { useCallback, memo } from 'react';
import useStore from '../../core/store';
import './Overlay.css';

// Using memo to prevent unnecessary re-renders
const Overlay = memo(() => {
    const overlayVisible = useStore(state => state.overlayVisible);

    // Create hideAllOverlays outside the render function using useCallback
    const hideAllOverlays = useCallback(() => {
        // Hide all overlay-related UI
        useStore.setState({
            overlayVisible: false,
            settingsMenuVisible: false,
            creditsMenuVisible: false,
            helpMenuVisible: false,
            restartConfirmationVisible: false,
            saveListMenuVisible: false,
            carouselVisible: false
        });
    }, []);

    if (!overlayVisible) {
        return null;
    }

    return (
        <div
            id="overlay"
            className="show"
            onClick={hideAllOverlays}
        />
    );
});

export default Overlay; 