import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import CSS files
import './index.css'
import './App.css'
import '../styles/main.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
