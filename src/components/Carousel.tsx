import { useEffect, useRef } from 'react';
import useStore from '../store';

const Carousel = () => {
  const { 
    carouselVisible, 
    inventory,
    hideCarousel
  } = useStore(state => ({
    carouselVisible: state.carouselVisible,
    inventory: state.inventory,
    hideCarousel: state.hideCarousel
  }));

  const carouselItemsRef = useRef<HTMLDivElement>(null);

  // Create placeholders for empty inventory slots
  useEffect(() => {
    const createPlaceholders = () => {
      if (!carouselItemsRef.current || !carouselVisible) return;
      
      // Clear any previously created placeholders
      const existingPlaceholders = carouselItemsRef.current.querySelectorAll('.carousel-placeholder');
      existingPlaceholders.forEach(item => item.remove());
      
      // Calculate and add new placeholders based on available space
      const carouselWidth = carouselItemsRef.current.offsetWidth;
      const itemWidth = 100; // Standard item width in pixels
      const placeholderCount = Math.floor(carouselWidth / ((itemWidth + 32) - inventory.length));
      
      for (let i = 0; i <= placeholderCount; i++) {
        const placeholder = document.createElement('div');
        placeholder.className = 'carousel-placeholder';
        carouselItemsRef.current.appendChild(placeholder);
      }
    };
    
    createPlaceholders();
    
    // Recreate placeholders on window resize
    window.addEventListener('resize', createPlaceholders);
    return () => window.removeEventListener('resize', createPlaceholders);
  }, [carouselVisible, inventory]);

  // Handle carousel navigation
  const handleScrollLeft = () => {
    if (carouselItemsRef.current) {
      carouselItemsRef.current.scrollBy({ 
        left: -carouselItemsRef.current.offsetWidth, 
        behavior: 'smooth' 
      });
    }
  };

  const handleScrollRight = () => {
    if (carouselItemsRef.current) {
      carouselItemsRef.current.scrollBy({ 
        left: carouselItemsRef.current.offsetWidth, 
        behavior: 'smooth' 
      });
    }
  };

  if (!carouselVisible) {
    return null;
  }

  return (
    <div id="carousel" className="show">
      <span id="carousel-left" onClick={handleScrollLeft}>&#10094;</span>
      <div id="carousel-items" ref={carouselItemsRef}>
        {/* Inventory items */}
        {inventory.map((itemName) => (
          <div key={itemName} className="carousel-item">
            <img src="./assets/character_sprites/pikachu.png" alt={itemName} />
            <div className="item-description">{itemName}</div>
          </div>
        ))}
      </div>
      <span id="carousel-right" onClick={handleScrollRight}>&#10095;</span>
    </div>
  );
};

export default Carousel; 