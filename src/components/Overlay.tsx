import useStore from '../store';

const Overlay = () => {
  const { overlayVisible, hideAllOverlays } = useStore(state => ({
    overlayVisible: state.overlayVisible,
    hideAllOverlays: () => {
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
    }
  }));

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
};

export default Overlay; 