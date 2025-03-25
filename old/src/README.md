# Adventure & Click - Code Structure

This directory contains the modular JavaScript codebase for the Adventure & Click game. 

## Directory Structure

- **src/index.js**: Main entry point that imports all modules
- **src/constants.js**: All DOM element references and constants
- **src/audio.js**: Audio-related functions
- **src/environment.js**: Environment management for scene items
- **src/scene.js**: Scene management functions
- **src/events.js**: Event listeners and handlers
- **src/ui/**
  - **carousel.js**: Carousel-related functions
  - **dialogue.js**: Dialogue and text typing functions
  - **overlay.js**: Overlay and menu management
  - **sidebar.js**: Sidebar-related functions

## Module Responsibilities

### index.js
- Initializes the game
- Exports global game state
- Sets up event listeners through events.js

### constants.js
- Provides centralized access to all DOM elements
- Avoids duplicate querySelector calls

### audio.js
- Manages audio files and playback
- Controls sound effects and background music

### environment.js
- Manages the game environment and inventory
- Handles item interactions and carousel display

### scene.js
- Manages scene transitions and backgrounds
- Handles dialogue and scene content

### events.js
- Sets up event listeners for user input
- Manages keyboard shortcuts

### UI Modules
- **carousel.js**: Handles the inventory carousel display
- **dialogue.js**: Manages text typing animations
- **overlay.js**: Controls overlay menus and settings
- **sidebar.js**: Handles sidebar visibility

## Design Philosophy

The code follows these principles:
- Small, focused modules with clear responsibilities
- Pure functions that avoid side effects when possible
- Consistent error handling
- Minimal dependencies between modules 