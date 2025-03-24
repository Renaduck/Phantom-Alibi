# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Added persistent help button in top-left corner
  - Implemented using Iconify for scalable vector icons
  - Added smooth fade-in and hover animations
  - Ensured visibility across all game states with proper z-indexing
  - Created dedicated help modal with game controls
- Implemented continue marker icon for scene transitions
  - Added animated chevron indicator that appears when text is complete
  - Integrated Iconify for scalable vector icons via CDN
  - Created bounce animation to improve visibility
  - Positioned marker appropriately for different scene types
  - Marker automatically hides during text typing and appears when ready to continue
- Improved dialogue text interaction
  - Added ability to instantly complete typing animation when clicking
  - Implemented two-step interaction (first click completes text, second advances scene)
  - Fixed overlay text click handling for centered text elements
  - Applied consistent behavior across all input methods (clicks, keyboard)

### Changed

- Refactored scene storage from object-based to array-based structure
  - Changed story.json to use an array of scene objects instead of numbered keys
  - Updated scene navigation to use array indexing
  - Removed initial welcome scene as it's replaced by the help button functionality
  - Improved maintainability by simplifying scene addition, removal, and reordering
- Moved controls from settings menu to dedicated help modal
  - Improved accessibility by making controls always available
  - Simplified settings menu to focus on game preferences
  - Added close button for better UX
- Removed initial welcome/controls dialog
  - Game now starts directly with first story scene
  - Controls accessible via help button instead
- Refactored codebase from a single monolithic script into multiple modular files
- Organized code into logical modules with clear responsibilities:
  - `src/index.js`: Main entry point that imports all modules
  - `src/constants.js`: All DOM element references and constants
  - `src/audio.js`: Audio-related functions
  - `src/environment.js`: Environment management for scene items
  - `src/scene.js`: Scene management functions
  - `src/events.js`: Event listeners and handlers
  - `src/ui/`: UI-related modules (carousel, dialogue, overlay, sidebar)
- Modularized CSS into component-based files:
  - `styles/reset.css`: Basic styles and resets
  - `styles/layout.css`: Containers and backgrounds
  - `styles/sidebar.css`: Sidebar components
  - `styles/dialogue.css`: Dialogue box and options
  - `styles/overlay.css`: Overlays and settings
  - `styles/sprites.css`: Character sprites
  - `styles/inventory.css`: Carousel and items
  - `styles/credits.css`: Credits section
  - `styles/help.css`: Help button and modal styles
  - `styles/main.css`: Imports all style modules
- Updated HTML to use module imports instead of traditional script tag
- Removed inline onclick handlers in HTML in favor of proper event listeners
- Added documentation in src/README.md explaining the new code structure

### Fixed

- Fixed potential issues with settings not being properly initialized
- Improved initialization of game state values from DOM elements
- Added missing event listeners for navigation buttons
- Added click-to-play overlay to handle browser autoplay restrictions for background music
- Implemented promise-based error handling for audio playback to prevent uncaught exceptions
- Fixed background color for overlay text scenes, ensuring proper black background instead of bluish-grey
- Fixed browser caching issue with story.json by adding a timestamp parameter to fetch requests

## [0.1.0]

### Added

- Initial prototype of Adventure & Click game
- Basic interactive visual novel functionality
- Dialogue system with typing animation
- Inventory system with item collection
- Settings menu with audio and typing speed controls
- Scene navigation with transitions
