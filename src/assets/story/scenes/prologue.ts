import { Scene } from "../../../common/types";
import { SCENE_TYPES } from "../../../common/constants";

const prologueScenes: Scene[] = [
    {
        character_name: "",
        character_sprite: "",
        background: "",
        lighting: "",
        dialogue: "I-It wasn't supposed to be like this.",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "",
        lighting: "",
        dialogue: "It was just a game",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "",
        lighting: "",
        dialogue: "He can't really be dead… right?",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "???",
        character_sprite: "sora_talking.png",
        background: "exterior.jpg",
        lighting: "normal",
        dialogue: "Huff... huff... Looks like I finally made it. Just a train, two buses, and a scenic hike through nowhere.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "???",
        character_sprite: "sora_talking.png",
        background: "exterior.jpg",
        lighting: "normal",
        dialogue: "I don't know why Rina picked her summer cabin of all places for a birthday party. Kind of a pain making everyone commute all the way out here. ",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "???",
        character_sprite: "sora_talking.png",
        background: "exterior.jpg",
        lighting: "normal",
        dialogue: "But I guess I'll never understand rich people....",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "???",
        character_sprite: "",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "Sora! Right on brand—last one here, as always.",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "There she is—Rina. Once my quiet childhood friend, now a social butterfly who throws parties in the middle of the woods.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "Oh yeah, thanks for the warm and totally not sarcastic welcome.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_scared.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "Come on, let me introduce you to everyone! She gestures toward a grumpy-looking girl who clearly didn't want to be here.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_scared.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "This is Hana!",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Hana",
        character_sprite: "hana_normal.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "(arms crossed, unimpressed) Nice to meet you. Rina talks about you all the time. I've even heard some of your bathtime stories.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "Wow. Fantastic. Just what I wanted to hear.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_evil.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "(grinning) Oh, come on, you used to be so cute back then! Back when you weren't such a buzzkill. If I knew this party was going to be a roast, I would've stayed home. I shift my gaze to the corner of the room, where a studious-looking guy stands stiffly. Didn't peg Rina for the type to date bookworms, but we haven't talked in a year. Ever since she transferred to that fancy private school, we kind of… fell apart.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_evil.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "Oh! That's Ken, our class president. If you're ever in trouble, he's the guy to go to.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "Noted. Standing next to him is… trouble. The kind of guy your parents warn you about.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "???",
        character_sprite: "ren_normal.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "(smirks) Hey there, sweetheart. You can just ask me out instead of staring.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ken",
        character_sprite: "ken_talking.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "(sighs, already exhausted) Ren, for the love of everything decent, please stop harassing people.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ren",
        character_sprite: "ren_normal.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "(grinning, clearly not sorry) What? It's called charisma. Yeah. This is gonna be a long night.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_scared.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "(hands on hips, teasing smirk) Oh, you boys. Behave, or I'll feed you to the wolves. They'd be happy to eat a meathead like Ren.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ren",
        character_sprite: "ren_normal.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "(grinning) Bold of you to assume they'd pick me first.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ken",
        character_sprite: "ken_talking.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "(sighs) They would. No contest.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_evil.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "(ignoring them, turning to Sora) Come on, let me show you to your room before you get sucked into their nonsense.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_evil.png",
        background: "entrance.png",
        lighting: "normal",
        dialogue: "This one's yours! Get comfy—dinner's in 30 minutes, so take your time.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "bedroom.jpg",
        lighting: "normal",
        dialogue: "The door clicks shut behind her, and I take a look around. Pretty plain. Not what I expected from a mansion, but at least it's quiet.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    }
];

export default prologueScenes; 