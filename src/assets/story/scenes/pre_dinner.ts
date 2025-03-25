import { Scene } from "../../../common/types";
import { SCENE_TYPES } from "../../../common/constants";

const preDinnerScenes: Scene[] = [
    {
        character_name: "",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "You've found a strange note. It has been added to your inventory. (Press the 'I' key anytime to view your inventory items.)",
        type: SCENE_TYPES.DIALOGUE,
        items: ["weird_note"]
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "— Slightly damp. Looks like it's been here a while. No name. No answers. Guess it's time for dinner. Might as well head down.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "entrance.png",
        dialogue: "As I step out, I collide with something—no, someone. A small girl, practically weightless, but the impact still catches me off guard. At her feet, a torn piece of paper flutters to the ground. My breath catches. It looks just like the one in my pocket.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "entrance.png",
        dialogue: "Oh, uh—are you okay?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "entrance.png",
        dialogue: "I offer her a hand, but she's up in an instant, snatching the paper away like I just tried to steal state secrets. Suspicious. I know this girl. I've seen her in pictures with Rina before.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "entrance.png",
        dialogue: "(casual, but probing) You're Ellie, right? What was that you just dropped?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "entrance.png",
        dialogue: "I try not to pry, but let's be real—curiosity is practically in my DNA.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Ellie",
        character_sprite: "ellie_scared.png",
        background: "entrance.png",
        dialogue: "(visibly nervous, gripping the paper tight) Y-Yeah, that's right. But it's— it's nothing! I-It's not a-anything to do with you!",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "entrance.png",
        dialogue: "And just like that, she bolts.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "entrance.png",
        dialogue: "(sighs) Yeah, okay. That wasn't weird at all.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "entrance.png",
        dialogue: "Can I just have one normal day? Is that too much to ask?",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    }
];

export default preDinnerScenes; 