import { carousel, carouselItems, carouselLeft, carouselRight, inventoryBtn } from '../constants.js';
import { environment } from '../environment.js';

// Set up carousel event listeners
export function setupCarouselListeners() {
    inventoryBtn.addEventListener('click', () => {
        environment.toggleCarousel();
        environment.createPlaceholders();
    });

    carouselRight.addEventListener('click', () => {
        carouselItems.scrollBy({ left: carousel.offsetWidth, behavior: 'smooth' });
    });

    carouselLeft.addEventListener('click', () => {
        carouselItems.scrollBy({ left: -carousel.offsetWidth, behavior: 'smooth' });
    });

    // On Screen Resize
    window.addEventListener("resize", () => {
        environment.createPlaceholders();
    });
}

// Initialize the module
setupCarouselListeners(); 