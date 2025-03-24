import { dialogueContainer, sideBar } from '../constants.js';

// Toggle sidebar visibility
export function toggleSidebar() {
    sideBar.classList.toggle('translate');
    dialogueContainer.classList.toggle('translate');
} 