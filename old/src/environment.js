import { carousel, carouselItems, overlay } from './constants.js';
import { itemAcquiredSound, swooshSound } from './audio.js';

// Managing game environment and inventory
// Note: This could be refactored to use individual functions instead of a class
export class Environment {
    constructor() {
        this.inventory = [];
    }

    // Adds item to playing area, hotspot
    addItem(name, item) {
        // Return if the item is already in the inventory
        if (this.inventory.includes(name)) return;

        // Create element
        const element = document.createElement("div");
        element.setAttribute("id", name)
        element.classList.add('item-marker');

        element.style.position = "absolute";
        element.style.top = `${item["y"]}%`;
        element.style.left = `${item["x"]}%`;

        // On click add the item to the player's inventory & retrieve the element
        element.addEventListener("click", () => {
            this.inventory.push(name);
            const itemMarker = document.getElementById(name)
            itemAcquiredSound();

            // Remove the item from the screen
            itemMarker.remove();

            // Add the item to the carousel on the screen
            const itemContainer = document.createElement('div');
            itemContainer.setAttribute("class", "carousel-item");

            const img = document.createElement('img');
            img.src = './assets/character_sprites/pikachu.png';
            itemContainer.appendChild(img);

            carouselItems.appendChild(itemContainer);

            // Animate the item into the carousel
            img.style.transform = "scale(0)";
            img.style.opacity = "0";
            img.style.transition = "transform 0.5s, opacity 0.5s";

            setTimeout(() => {
                img.style.transform = "scale(1)";
                img.style.opacity = "1";
            }, 150);

            // Add a description to the itemContainer div which already has the item img
            const description = document.createElement('div');
            description.textContent = item["description"];
            description.classList.add('item-description');
            itemContainer.appendChild(description);

            // Add a hover effect transition to the itemContainer (for some reason it's glitchy when I simply do this with css)
            itemContainer.addEventListener('mouseenter', () => {
                itemContainer.style.transition = 'transform 0.3s ease-in-out';
            });

            // Print the inventory to the screen
            this.carouselShow();
            this.createPlaceholders(item.offsetWidth);
        });

        document.body.appendChild(element);
    }

    // Create placeholder items
    createPlaceholders(itemWidth = 100) {
        // Clear any previously created placeholders
        this.clearPlaceholders();

        // Add carousel placeholder elements
        const carouselWidth = carouselItems.offsetWidth;
        const placeholderCount = Math.floor(carouselWidth / ((itemWidth + 32) - this.inventory.length));

        for (let i = 0; i <= placeholderCount; i++) {
            const itemPlaceholder = document.createElement('div');
            itemPlaceholder.setAttribute("class", "carousel-placeholder");
            carouselItems.appendChild(itemPlaceholder);
        }
    }

    // Clear all the item markers in the scene
    clearItems() {
        const itemMarkers = document.querySelectorAll('.item-marker');
        itemMarkers.forEach((item) => {
            if (item.classList.contains('item-marker')) {
                item.remove()
            }
        });
    }

    // Clear all the placeholders in the carousel
    clearPlaceholders() {
        const placeholders = document.querySelectorAll('.carousel-placeholder');
        placeholders.forEach((item) => {
            item.remove();
        });
    }

    // Toggle carousel inventory
    toggleCarousel() {
        carousel.classList.toggle('show');
        overlay.classList.toggle('show');
        swooshSound();
    }

    carouselShow() {
        carousel.classList.add('show');
        overlay.classList.add('show');
        swooshSound();
    }

    carouselHide() {
        carousel.classList.remove('show');
        overlay.classList.remove('show');
        swooshSound();
    }
}

// Create and export a singleton instance
export const environment = new Environment(); 