# Phantom Alibi

React/TypeScript migration of the original vanilla JavaScript implementation.

## Setup & Running

This project uses Vite as a build tool and development server.

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

### Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to http://localhost:5173 (or the URL shown in your terminal)

The development server features hot module replacement for fast development.

### Building for Production

1. Build the project:
   ```
   npm run build
   ```

2. The build output will be in the `dist` directory

3. To preview the production build locally:
   ```
   npm run preview
   ```

## Project Structure

- `src/`: Source code directory
  - `assets/`: Contains all game images, sprites and other resources
  - `components/`: React components
  - `utils/`: Utility functions for audio, dialogue, and scene management
  - `store.ts`: Zustand store for global state management
  - `types.ts`: TypeScript type definitions
- `index.html`: Main entry point
- `vite.config.js`: Vite configuration