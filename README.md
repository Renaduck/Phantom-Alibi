# Phantom Alibi

React/TypeScript migration of the original vanilla JavaScript implementation.

## Setup & Running

This project uses Vite as a build tool and development server.

### Prerequisites

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

#### Installing Node.js and npm on Windows

1. Install Chocolatey package manager:
   - Open PowerShell as Administrator
   - Run the following command:
     ```
     Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
     ```
   - Close and reopen PowerShell

2. Install Node Version Manager (nvm):
   ```
   choco install nvm
   ```

3. Install the latest LTS version of Node.js:
   ```
   nvm install lts
   ```

4. Use the installed Node.js version (replace xx.xx.xx with the version number displayed after installation):
   ```
   nvm use xx.xx.xx
   ```

5. Verify installation:
   - Run `node -v` to verify Node.js installation
   - Run `npm -v` to verify npm installation

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