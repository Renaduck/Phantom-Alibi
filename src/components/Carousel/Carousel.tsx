import { useCallback, useEffect, useState, useRef, memo } from 'react';
import useStore from '../../core/store';

import './Carousel.css';

// Using memo to prevent unnecessary rerenders
const Carousel = memo(() => {
    const carouselVisible = useStore(state => state.carouselVisible);
    const inventory = useStore(state => state.inventory);

    // Track placeholders in local state instead of DOM manipulation
    const [placeholderCount, setPlaceholderCount] = useState(0);
    const carouselItemsRef = useRef<HTMLDivElement>(null);

    // Calculate placeholder count based on viewport, safely separated from render cycle
    const calculatePlaceholders = useCallback(() => {
        if (!carouselItemsRef.current || !carouselVisible) return;

        const carouselWidth = carouselItemsRef.current.offsetWidth;
        const itemWidth = 100; // Standard item width in pixels
        // Safe calculation that avoids negative values
        const maxItems = Math.max(1, Math.floor(carouselWidth / itemWidth));
        const needed = Math.max(0, maxItems - inventory.length);

        setPlaceholderCount(needed);
    }, [carouselVisible, inventory.length]);

    // Handle window resize
    useEffect(() => {
        if (!carouselVisible) return;

        // Initial calculation
        calculatePlaceholders();

        // Set up resize handler
        window.addEventListener('resize', calculatePlaceholders);
        return () => window.removeEventListener('resize', calculatePlaceholders);
    }, [carouselVisible, calculatePlaceholders]);

    // Handle carousel navigation
    const handleScrollLeft = useCallback(() => {
        if (carouselItemsRef.current) {
            carouselItemsRef.current.scrollBy({
                left: -carouselItemsRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    }, []);

    const handleScrollRight = useCallback(() => {
        if (carouselItemsRef.current) {
            carouselItemsRef.current.scrollBy({
                left: carouselItemsRef.current.offsetWidth,
                behavior: 'smooth'
            });
        }
    }, []);

    // Early return if carousel isn't visible
    if (!carouselVisible) {
        return null;
    }

    // Create placeholder array
    const placeholders = Array.from({ length: placeholderCount }, (_, index) => (
        <div key={`placeholder-${index}`} className="carousel-placeholder" />
    ));

    // Default placeholder image path
    const defaultItemImagePath = "./assets/items/default-item.png";

    return (
        <div id="carousel" className="show">
            <span id="carousel-left" onClick={handleScrollLeft}>&#10094;</span>
            <div id="carousel-items" ref={carouselItemsRef}>
                {/* Inventory items */}
                {inventory.map((itemName) => (
                    <div key={itemName} className="carousel-item">
                        <img
                            src={defaultItemImagePath}
                            alt={itemName}
                        />
                        <div className="item-description">{itemName}</div>
                    </div>
                ))}
                {/* Placeholders */}
                {placeholders}
            </div>
            <span id="carousel-right" onClick={handleScrollRight}>&#10095;</span>
        </div>
    );
});

export default Carousel; 