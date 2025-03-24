import { useEffect, useState } from 'react';
import useStore from '../store';
import { fetchStoryData } from '../utils/scene';

const Sprites = () => {
  const currentScene = useStore(state => state.currentScene);
  const setScene = useStore(state => state.setScene);
  const completeTypingAnimation = useStore(state => state.completeTypingAnimation);
  const typingInterval = useStore(state => state.typingInterval);
  const sidebarVisible = useStore(state => state.sidebarVisible);

  const [characterSprite, setCharacterSprite] = useState('');

  // Fetch and update character sprite when scene changes
  useEffect(() => {
    let isMounted = true;
    
    const getSceneData = async () => {
      try {
        const { scenes } = await fetchStoryData();
        if (isMounted && scenes && scenes[currentScene]) {
          setCharacterSprite(scenes[currentScene].character_sprite || '');
        }
      } catch (error) {
        console.error('Error loading character sprite:', error);
      }
    };

    getSceneData();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [currentScene]);

  // Handle click to advance scene
  const handleClick = () => {
    if (!sidebarVisible) return;
    
    // If text is currently typing, complete it immediately instead of advancing the scene
    if (typingInterval !== null) {
      completeTypingAnimation();
    } else {
      setScene('next');
    }
  };

  return (
    <div id="sprite-container" onClick={handleClick}>
      <div>
        <img id="sprite-1" src="" alt="" />
      </div>
      <div>
        <img 
          id="sprite-2" 
          src={characterSprite || undefined} 
          alt={characterSprite ? "Character" : ""}
          className={characterSprite ? 'show' : ''}
        />
      </div>
      <div>
        <img id="sprite-3" src="" alt="" />
      </div>
    </div>
  );
};

export default Sprites; 