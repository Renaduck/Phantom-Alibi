/// <reference types="vite/client" />

// Declare module for media files to make TypeScript happy
declare module '*.mp3' {
    const src: string;
    export default src;
}

// Declare image module types
declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

// Case insensitive extensions
declare module '*.PNG' {
    const src: string;
    export default src;
}

declare module '*.JPG' {
    const src: string;
    export default src;
}
