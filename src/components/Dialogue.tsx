import { useEffect, useRef, useState } from 'react';
import useStore from '../store';
import { fetchStoryData } from '../utils/scene';
import { typeText } from '../utils/dialogue';

const Dialogue = () => {
  // Use individual selectors instead of destructuring multiple properties at once
  const currentScene = useStore(state => state.currentScene);
  const dialogueVisible = useStore(state => state.dialogueVisible);
  const setScene = useStore(state => state.setScene);
  const completeTypingAnimation = useStore(state => state.completeTypingAnimation);
  const typingInterval = useStore(state => state.typingInterval);
  const setTypingInterval = useStore(state => state.setTypingInterval);
  const currentTypingSpeed = useStore(state => state.currentTypingSpeed);
  const playPageFlipSound = useStore(state => state.playPageFlipSound);
  const toggleCarousel = useStore(state => state.toggleCarousel);

  const [characterName, setCharacterName] = useState('');
  // We need dialogueType for styles but not dialogueContent since it's typed directly
  const [, setDialogueContent] = useState('');
  const [dialogueType, setDialogueType] = useState('');
  
  const dialogueTextRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch and update dialogue when scene changes
  useEffect(() => {
    let isMounted = true;
    
    const getSceneData = async () => {
      try {
        const { scenes } = await fetchStoryData();
        if (!isMounted || !scenes || !scenes[currentScene]) return;
        
        const scene = scenes[currentScene];
        
        setCharacterName(scene.character_name || '');
        setDialogueContent(scene.dialogue || '');
        setDialogueType(scene.type || '');
        
        // Start typing animation for dialogue
        if (dialogueTextRef.current) {
          // Store element in the store for external access
          useStore.setState({
            currentDialogueElement: dialogueTextRef.current,
            currentDialogueContent: scene.dialogue
          }, false); // false prevents notifications/re-renders
          
          // Clear any existing typing interval
          if (typingInterval !== null) {
            window.clearInterval(typingInterval);
            setTypingInterval(null);
          }
          
          // Start new typing animation
          const interval = typeText(
            scene.dialogue,
            dialogueTextRef.current,
            currentTypingSpeed,
            () => {
              // Clear interval once typing is complete
              setTypingInterval(null);
            }
          );
          
          setTypingInterval(interval);
        }
      } catch (error) {
        console.error('Error loading dialogue:', error);
      }
    };

    getSceneData();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
      
      // Clear typing interval on unmount
      if (typingInterval !== null) {
        window.clearInterval(typingInterval);
      }
    };
  }, [currentScene, currentTypingSpeed, setTypingInterval, typingInterval]);

  // Handle click to advance scene
  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger for clicks on dialogue options or when sidebar is not visible
    if (
      e.target instanceof HTMLElement && 
      e.target.closest('#dialogue-options') ||
      !dialogueVisible
    ) {
      return;
    }
    
    // If text is currently typing, complete it immediately
    if (typingInterval !== null) {
      completeTypingAnimation();
    } else {
      playPageFlipSound();
      setScene('next');
    }
  };

  // Handle next button click
  const handleNextClick = () => {
    if (!dialogueVisible) return;
    playPageFlipSound();
    setScene('next');
  };

  // Handle prev button click
  const handlePrevClick = () => {
    if (!dialogueVisible) return;
    playPageFlipSound();
    setScene('prev');
  };

  return (
    <div 
      id="dialogue-container" 
      ref={containerRef}
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
        ref={dialogueTextRef}
        style={{ 
          color: dialogueType === 'inner_monologue' ? 'rgb(144, 238, 144)' : 'whitesmoke' 
        }}
      />
      
      <div id="dialogue-options">
        <div id="next-btn" onClick={handleNextClick}>Next</div>
        <div id="inventory-btn" onClick={toggleCarousel}>Inventory</div>
        <div id="prev-btn" onClick={handlePrevClick}>Prev</div>
      </div>
    </div>
  );
};

export default Dialogue; 