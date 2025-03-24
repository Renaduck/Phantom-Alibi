// Import types for assets
type AssetImport = string;

// Import all background images
import exteriorBg from '../assets/scenes/exterior.jpg';
import entranceBg from '../assets/scenes/entrance.png';
import bedroomBg from '../assets/scenes/bedroom.jpg';
import commonSpaceBg from '../assets/scenes/common_space.webp';

// Import all character sprites with lowercase extensions
import soraTalking from '../assets/character_sprites/sora_talking.png';
import rinaScared from '../assets/character_sprites/rina_scared.png';
import rinaEvil from '../assets/character_sprites/rina_evil.png';
import renNormal from '../assets/character_sprites/ren_normal.png';
import hanaNormal from '../assets/character_sprites/hana_normal.png';
import kenTalking from '../assets/character_sprites/ken_talking.png';

// Define types for asset maps
type AssetMap = Record<string, AssetImport>;

// Background image mapping - use just the filename
export const backgrounds: AssetMap = {
    'exterior.jpg': exteriorBg,
    'entrance.png': entranceBg,
    'bedroom.jpg': bedroomBg,
    'common_space.webp': commonSpaceBg,
};

// Character sprite mapping - use just the filename
export const sprites: AssetMap = {
    'sora_talking.png': soraTalking,
    'sora_talking.PNG': soraTalking, // Add case-insensitive variant
    'rina_scared.png': rinaScared,
    'rina_scared.PNG': rinaScared,
    'rina_evil.png': rinaEvil,
    'rina_evil.PNG': rinaEvil,
    'ren_normal.png': renNormal,
    'ren_normal.PNG': renNormal,
    'hana_normal.png': hanaNormal,
    'ken_talking.png': kenTalking,
    'ken_talking.PNG': kenTalking,
};

// Extract filename from a path
function getFilenameFromPath(path: string): string {
    return path.split('/').pop() || '';
}

// Helper function to resolve asset path to imported asset
export function getAsset(path: string, type: 'background' | 'sprite'): string {
    if (!path) return '';

    // Extract the filename from the path
    const filename = getFilenameFromPath(path);
    if (!filename) return '';

    const assetMap = type === 'background' ? backgrounds : sprites;
    return assetMap[filename] || '';
} 