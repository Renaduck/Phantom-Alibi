import { Scene } from "../../../common/types";
import { SCENE_TYPES } from "../../../common/constants";

const beforeCrimeScenes: Scene[] = [
    {
        character_name: "",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "[Scene: Guest Bedroom – Night]",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "Lying in bed, my thoughts refused to settle. The board. The flickering candles. The cold that hadn't left. Where had that wind come from? Why did it feel like something had actually been there?",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "I told myself it was just drama. Just nerves. But my body didn't believe me. Eventually, my eyes grew heavy, and sleep started to pull me under—",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "",
        dialogue: "...",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    }
];

export default beforeCrimeScenes; 