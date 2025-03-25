// Import types for assets
type AssetImport = string;

// Import all background images
import exteriorBg from '../assets/scenes/exterior.jpg';
import entranceBg from '../assets/scenes/entrance.png';
import bedroomBg from '../assets/scenes/bedroom.jpg';
import commonSpaceBg from '../assets/scenes/common_space.webp';
import deathSceneBg from '../assets/scenes/death_scene.png';
import doorwaySceneBg from '../assets/scenes/doorway_scene.webp';
import ghostCallingSceneBg from '../assets/scenes/ghost_calling_scene.jpg';

// Import all character sprites
import ellieNormal from '../assets/character_sprites/ellie_normal.png';
import ellieScaredMouthClosed from '../assets/character_sprites/ellie_scared_mouth_closed.png';
import ellieScared from '../assets/character_sprites/ellie_scared.png';
import ellieTalking from '../assets/character_sprites/ellie_talking.png';
import hanaNormal from '../assets/character_sprites/hana_normal.png';
import hanaUpset from '../assets/character_sprites/hana_upset.png';
import kenScared from '../assets/character_sprites/ken_scared.png';
import kenSmart from '../assets/character_sprites/ken_smart.png';
import kenTalking from '../assets/character_sprites/ken_talking.png';
import kenUpset from '../assets/character_sprites/ken_upset.png';
import pikachu from '../assets/character_sprites/pikachu.png';
import renNormal from '../assets/character_sprites/ren_normal.png';
import rinaEvil from '../assets/character_sprites/rina_evil.png';
import rinaScared from '../assets/character_sprites/rina_scared.png';
import soraTalking from '../assets/character_sprites/sora_talking.png';
import tomoAngry from '../assets/character_sprites/tomo_angry.png';
import tomoScared from '../assets/character_sprites/tomo_scared.png';
import tomoTalking from '../assets/character_sprites/tomo_talking.png';

// Import clue/item images
import doorPaint from '../assets/clues/door_paint.png';
import doorScratches from '../assets/clues/door_scratches.png';
import fishingWire from '../assets/clues/fishing_wire.png';
import neckBruises from '../assets/clues/neck_bruises.jpg';
import weirdNote from '../assets/clues/weird_note.png';

// Log all sprite imports to verify they loaded
console.log('Sprite imports check:');
console.log('soraTalking:', soraTalking);
console.log('kenTalking:', kenTalking);
console.log('hanaNormal:', hanaNormal);
console.log('rinaScared:', rinaScared);

// Define types for asset maps
type AssetMap = Record<string, AssetImport>;

// Background image mapping - FILENAME ONLY
export const backgrounds: AssetMap = {
    'exterior.jpg': exteriorBg,
    'entrance.png': entranceBg,
    'bedroom.jpg': bedroomBg,
    'common_space.webp': commonSpaceBg,
    'death_scene.png': deathSceneBg,
    'doorway_scene.webp': doorwaySceneBg,
    'ghost_calling_scene.jpg': ghostCallingSceneBg
};

// Character sprite mapping - FILENAME ONLY
export const sprites: AssetMap = {
    // Map all sprites with case insensitivity
    'ellie_normal.png': ellieNormal,
    'ellie_scared_mouth_closed.png': ellieScaredMouthClosed,
    'ellie_scared.png': ellieScared,
    'ellie_talking.png': ellieTalking,
    'hana_normal.png': hanaNormal,
    'hana_upset.png': hanaUpset,
    'ken_scared.png': kenScared,
    'ken_smart.png': kenSmart,
    'ken_talking.png': kenTalking,
    'ken_upset.png': kenUpset,
    'pikachu.png': pikachu,
    'ren_normal.png': renNormal,
    'rina_evil.png': rinaEvil,
    'rina_scared.png': rinaScared,
    'sora_talking.png': soraTalking,
    'tomo_angry.png': tomoAngry,
    'tomo_scared.png': tomoScared,
    'tomo_talking.png': tomoTalking,

    // Clue/item images
    'door_paint.png': doorPaint,
    'door_scratches.png': doorScratches,
    'fishing_wire.png': fishingWire,
    'neck_bruises.jpg': neckBruises,
    'weird_note.png': weirdNote,

    // Map alternate names to the same assets
    'note.png': weirdNote,
    'strange_note.png': weirdNote
};

// Helper function to get just the filename from any path
function getFilenameFromPath(path: string): string {
    // Handle both paths with slash and plain filenames
    const lastSlashIndex = path.lastIndexOf('/');
    return lastSlashIndex >= 0 ? path.substring(lastSlashIndex + 1) : path;
}

// Helper function to resolve asset path to imported asset
export function getAsset(path: string, type: 'background' | 'sprite'): string {
    if (!path) return '';

    // Extract just the filename from the path
    const filename = getFilenameFromPath(path);
    if (!filename) return '';

    console.log(`Getting ${type} asset for filename: "${filename}"`);

    const assetMap = type === 'background' ? backgrounds : sprites;
    const asset = assetMap[filename] || '';

    if (!asset) {
        console.warn(`No ${type} found for filename: "${filename}"`);
        console.log('Available keys:', Object.keys(assetMap).join(', '));

        // For sprites, try lowercase version as fallback
        if (type === 'sprite') {
            const lowerFilename = filename.toLowerCase();
            const lowerAsset = assetMap[lowerFilename] || '';
            if (lowerAsset) {
                console.log(`Found asset using lowercase filename: "${lowerFilename}"`);
                return lowerAsset;
            }
        }
    } else {
        console.log(`Successfully resolved ${type}: "${filename}" to: ${asset}`);
    }

    return asset;
} 