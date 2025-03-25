import { Scene } from "../../../common/types";
import { SCENE_TYPES } from "../../../common/constants";

const livingRoomScenes: Scene[] = [
    {
        character_name: "",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "[Interior: Living Room]",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_scared.png",
        background: "common_space.webp",
        dialogue: "Haha… This is getting kinda awkward, huh?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "I could tell she was feeling it too. The distance. The unease. This night wasn't going the way she wanted.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "Then, her eyes lit up. That dangerous look of hers.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_evil.png",
        background: "common_space.webp",
        dialogue: "(grinning mischievously) Okay, okay—how about we settle this ghost debate another way?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "She leaned forward, hands on the table.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_evil.png",
        background: "common_space.webp",
        dialogue: "(grinning) Why don't we see if we can contact her?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Tomo",
        character_sprite: "tomo_talking.png",
        background: "common_space.webp",
        dialogue: "Oh, hell yes! Now we're talking!",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ellie",
        character_sprite: "ellie_scared.png",
        background: "common_space.webp",
        dialogue: "(nervous) W-Wait, w-we don't actually have to—",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ken",
        character_sprite: "ken_talking.png",
        background: "common_space.webp",
        dialogue: "(adjusting his glasses, sighing) Here we go…",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "I just let out a deep breath. Of course she'd suggest this.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    }
];

export default livingRoomScenes; 