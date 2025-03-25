import { Scene } from "../../../common/types";
import { SCENE_TYPES } from "../../../common/constants";

const tutorialScenes: Scene[] = [
    {
        character_name: "Sora",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "Guess I should explore a bit...",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "Click on things in the room to interact with them",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "",
        type: SCENE_TYPES.NONE,
        items: [
            "bed",
            "desk",
            "window",
            "chair",
            "bookshelf",
            "pillow"
        ]
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "bedroom.jpg",
        dialogue: "Huh. Looks pretty soft— Thump. …UUUUGH. That was a trap.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "bedroom.jpg",
        dialogue: "Do guests actually use desks in their rooms, or is it just one of those 'fancy house' things?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "bedroom.jpg",
        dialogue: "Oh hey, it's one of those… uh… you know… (pause) Whatever it's called.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "bedroom.jpg",
        dialogue: "Yup. Method of escape confirmed.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "bedroom.jpg",
        dialogue: "Wait a second, what's this?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "A crumpled piece of paper peeks out from under the pillow.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "Don't fall asleep in this room.",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "bedroom.jpg",
        dialogue: "…Huh. That's not at all concerning.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "I fold the note and tuck it away. Definitely showing this to Rina later.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    }
];

export default tutorialScenes; 