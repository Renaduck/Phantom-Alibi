import { useCallback, useEffect, useState, useRef, memo } from 'react';
import useStore from '../../core/store';
import { InventoryItem } from '../../core/store';
import './Carousel.css';

// Default image to use as fallback
const DEFAULT_ITEM_IMAGE = '/src/assets/character_sprites/pikachu.png';

// Using memo to prevent unnecessary rerenders
const Carousel = memo(() => {
    const carouselVisible = useStore(state => state.carouselVisible);
    const inventory = useStore(state => state.inventory);
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

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

    // Handle item click to show details
    const handleItemClick = useCallback((item: InventoryItem) => {
        setSelectedItem(item === selectedItem ? null : item);
    }, [selectedItem]);

    // Close item details modal
    const closeItemDetails = useCallback(() => {
        setSelectedItem(null);
    }, []);

    // Early return if carousel isn't visible
    if (!carouselVisible) {
        return null;
    }

    // Create placeholder array
    const placeholders = Array.from({ length: placeholderCount }, (_, index) => (
        <div key={`placeholder-${index}`} className="carousel-placeholder" />
    ));

    return (
        <>
            <div id="carousel" className="show">
                <span id="carousel-left" onClick={handleScrollLeft}>&#10094;</span>
                <div id="carousel-items" ref={carouselItemsRef}>
                    {/* Inventory items */}
                    {inventory.map((item) => (
                        <div
                            key={item.id}
                            className="carousel-item"
                            onClick={() => handleItemClick(item)}
                        >
                            <img
                                src={item.img_src || DEFAULT_ITEM_IMAGE}
                                alt={item.name}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = DEFAULT_ITEM_IMAGE;
                                }}
                            />
                            <div className="item-name">{item.name}</div>
                        </div>
                    ))}
                    {/* Placeholders */}
                    {placeholders}
                </div>
                <span id="carousel-right" onClick={handleScrollRight}>&#10095;</span>
            </div>

            {/* Item details modal */}
            {selectedItem && (
                <div className="item-details-modal" onClick={closeItemDetails}>
                    <div className="item-details-content" onClick={(e) => e.stopPropagation()}>
                        <div className="item-details-image-container">
                            <img
                                src={selectedItem.img_src || DEFAULT_ITEM_IMAGE}
                                alt={selectedItem.name}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = DEFAULT_ITEM_IMAGE;
                                }}
                            />
                        </div>
                        <div className="item-details-info">
                            <h3>{selectedItem.name}</h3>
                            <p>{selectedItem.description}</p>
                        </div>
                        <button className="item-details-close" onClick={closeItemDetails}>×</button>
                    </div>
                </div>
            )}
        </>
    );
});

export default Carousel; 