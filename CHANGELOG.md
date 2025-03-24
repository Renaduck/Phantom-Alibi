# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Migrated from vanilla JavaScript to React with TypeScript
  - Added type safety with TypeScript interfaces for game state
  - Implemented Zustand for state management
  - Created modular React components for each game element
  - Properly handled assets with Vite's bundling system
  - Improved code maintainability with React patterns and hooks
- Reorganized component structure to follow modern React practices
  - Colocated CSS with component files in dedicated folders
  - Each component has its own directory with Component.tsx, Component.css, and index.tsx
  - Improved maintainability by keeping related files together
  - Better organization for imports and dependency management
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
- Created dedicated TypedText component for text animations
  - Implemented React-based typing animation without DOM manipulation
  - Added support for variable typing speeds
  - Enabled forced completion of typing animation
  - Used proper React state management for animation state
- Added OverlayText component for centrally positioned text scenes
  - Created component that displays text in the center of the screen
  - Added proper styling with semi-transparent background
  - Implemented fade-in animation for smooth appearance
  - Ensured proper positioning and responsiveness across screen sizes
- Integrated @tabler/icons-react for better icon support
  - Replaced CDN-based Iconify with proper React component library
  - Improved consistency and performance with native React components
  - Added better TypeScript support with properly typed icon components

### Changed

- Refactored codebase architecture for React/TypeScript
  - Organized code into React components with clear responsibilities
  - Moved application state to Zustand store
  - Used React hooks for component logic
  - Leveraged TypeScript for type safety
  - Implemented proper error handling and fallbacks
- Replaced container-based layout with direct React component structure
  - Removed outdated #container wrapper in favor of React Fragment
  - Updated component references to use #root instead of #container
  - Simplified DOM structure for better performance and maintainability
  - Fixed styling issues caused by incorrect container nesting
- Replaced fetch-based story loading with direct JSON import
  - Leveraged Vite's built-in JSON import capabilities
  - Removed timestamp-based cache busting logic
  - Simplified story data loading process
  - Improved performance by eliminating network request
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
- Improved typing animation in TypedText component
  - Simplified speed calculation for more natural typing
  - Removed blinking cursor during typing for cleaner appearance
  - Adjusted timing to ensure proper text rendering
  - Enhanced readability with better text formatting

### Fixed

- Fixed infinite update loops in React components using selective state selectors
  - Used individual state selectors instead of object destructuring in all components
  - Applied React.memo to prevent unnecessary re-renders
  - Added proper dependency arrays to useEffect and useCallback hooks
  - Separated data fetching from render operations in components
- Fixed text rendering issues in dialogue components
  - Added blinking cursor during text animation
  - Improved TypedText component with React-based animation
  - Enhanced readability with proper word-break and whitespace handling
  - Fixed styling and positioning of text within dialogue container
- Eliminated direct DOM manipulation in favor of React state management
  - Replaced imperative DOM updates with declarative React patterns
  - Created dedicated TypedText component for typing animations
  - Used component state instead of direct DOM element manipulation
  - Fixed dialogue text handling to use React's rendering system
- Optimized state management to prevent cyclic updates
  - Removed unnecessary state updates during render
  - Cached scene data to prevent redundant fetches
  - Used proper cleanup in useEffect hooks to prevent memory leaks
  - Added defensive programming with null/undefined checks
- Fixed memory leaks with proper interval cleanup in useEffect hooks
- Properly handled assets with Vite's ES module system
- Added type declarations for media files to support TypeScript
- Fixed circular dependencies in the codebase
- Fixed potential issues with settings not being properly initialized
- Improved initialization of game state values from DOM elements
- Added missing event listeners for navigation buttons
- Added click-to-play overlay to handle browser autoplay restrictions for background music
- Implemented promise-based error handling for audio playback to prevent uncaught exceptions
- Fixed background color for overlay text scenes, ensuring proper black background instead of bluish-grey
- Fixed browser caching issue with story.json by adding a timestamp parameter to fetch requests
- Fixed overlay text not displaying in the third scene by moving text from the sound field to the dialogue field
- Fixed missing characters in TypedText component
  - Updated text rendering approach to avoid truncated text
  - Improved handling of text state to preserve all characters
  - Enhanced animation timing to ensure complete text display
- Fixed continuation marker positioning in dialogue boxes
  - Moved marker to proper location at the bottom of dialogue container
  - Adjusted CSS to ensure consistent positioning across scenes
  - Improved visual clarity with better spacing and alignment
- Fixed game elements rendering on title screen
  - Added conditional rendering to only show game components after game start
  - Prevented dialogue and overlay text from appearing on title screen
  - Ensured proper background handling for title screen vs. in-game scenes

## [0.1.0]

### Added

- Initial prototype of Adventure & Click game
- Basic interactive visual novel functionality
- Dialogue system with typing animation
- Inventory system with item collection
- Settings menu with audio and typing speed controls
- Scene navigation with transitions
