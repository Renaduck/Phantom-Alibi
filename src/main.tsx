import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import CSS files
import './index.css'
import './App.css'
import '../styles/reset.css'
import '../styles/layout.css'
// main.css is now imported through App.css

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
