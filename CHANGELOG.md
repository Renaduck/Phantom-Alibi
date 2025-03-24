# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Refactored codebase from a single monolithic script into multiple modular files
- Organized code into logical modules with clear responsibilities:
  - `src/index.js`: Main entry point that imports all modules
  - `src/constants.js`: All DOM element references and constants
  - `src/audio.js`: Audio-related functions
  - `src/environment.js`: Environment management for scene items
  - `src/scene.js`: Scene management functions
  - `src/events.js`: Event listeners and handlers
  - `src/ui/`: UI-related modules (carousel, dialogue, overlay, sidebar)
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

## [0.1.0]

### Added

- Initial prototype of Adventure & Click game
- Basic interactive visual novel functionality
- Dialogue system with typing animation
- Inventory system with item collection
- Settings menu with audio and typing speed controls
- Scene navigation with transitions
