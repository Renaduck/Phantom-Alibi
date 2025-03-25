import { Scene } from "../../../common/types";
import { SCENE_TYPES } from "../../../common/constants";

const investigationScenes: Scene[] = [
    {
        character_name: "",
        character_sprite: "",
        background: "death_scene.png",
        dialogue: "[Investigation]",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "death_scene.png",
        dialogue: "I should look carefully for clues that might tell me what happened...",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "death_scene.png",
        dialogue: "Examine the crime scene for clues",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "death_scene.png",
        dialogue: "",
        type: SCENE_TYPES.NONE,
        items: [
            "door_paint",
            "door_scratches",
            "fishing_wire",
            "neck_bruises"
        ]
    },
    {
        character_name: "",
        character_sprite: "",
        background: "doorway_scene.webp",
        dialogue: "Clue 1: Lock Mechanism Scratches",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "doorway_scene.webp",
        dialogue: "These are… scratches? Tiny and shallow—right above the locking bolt. Looks like someone forced the lock to turn. From the outside. But how?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "doorway_scene.webp",
        dialogue: "Clue 2: Thin Line Stuck in the Doorframe",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "doorway_scene.webp",
        dialogue: "There's a thread caught down here… (pulls gently) …No, not thread—fishing line? And it's frayed at the end… Looks like it snapped under pressure. But what was it being used for?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "doorway_scene.webp",
        dialogue: "Clue 3: Red Paint Smudge on Door Handle (Inside)",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "doorway_scene.webp",
        dialogue: "…There's a red smear on the inside of the handle. It's not blood… it's paint. Exactly the same shade as what was smeared on the outside. Whoever painted the door… touched this.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "death_scene.png",
        dialogue: "Clue 4: Something Under the Bed – A Broken Garrote",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "death_scene.png",
        dialogue: "What is this…? (reaches and pulls out a broken loop of thin wire) It's stiff—almost like a noose. One side's twisted, and the loop is… shaped like a neck. This isn't rope. This is a homemade garrote.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "death_scene.png",
        dialogue: "Clue 5: Faint Bruising on Neck (Post-Mortem Body Inspection)",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "death_scene.png",
        dialogue: "There's barely visible marks… like thin red lines circling his neck. Too faint for rope… …but a wire would leave marks just like this. It wouldn't take much to cut off airflow.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "Other Locations: Dining Room",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Tomo",
        character_sprite: "tomo_talking.png",
        background: "common_space.webp",
        dialogue: "(holding a cup of cold tea, unimpressed) Okay but like, why would anyone use paint? That whole 'bloody door' thing was so extra.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ken",
        character_sprite: "ken_smart.png",
        background: "common_space.webp",
        dialogue: "(adjusting glasses) Red paint doesn't dry instantly. Someone did it right before the scream, otherwise it would've been tacky or dry. Which means they were right outside the room.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Tomo",
        character_sprite: "tomo_talking.png",
        background: "common_space.webp",
        dialogue: "…Wait, so wouldn't Ren have heard someone painting his door?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ken",
        character_sprite: "ken_smart.png",
        background: "common_space.webp",
        dialogue: "Exactly. Assuming he was alive at the time.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "ghost_calling_scene.jpg",
        dialogue: "Location: Séance Room (Earlier Séance Scene)",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Ken",
        character_sprite: "ken_smart.png",
        background: "ghost_calling_scene.jpg",
        dialogue: "(during the séance setup) You know, if you wanted to create a perfect ghost hoax, all you'd need is some monofilament line and a decent knowledge of physics.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Hana",
        character_sprite: "hana_normal.png",
        background: "ghost_calling_scene.jpg",
        dialogue: "(quietly, almost too knowing) …Fishing line's basically invisible under candlelight.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ren",
        character_sprite: "ren_normal.png",
        background: "ghost_calling_scene.jpg",
        dialogue: "(laughing) Man, you sound like you've done this before.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Hana",
        character_sprite: "hana_upset.png",
        background: "ghost_calling_scene.jpg",
        dialogue: "(shrugs) Some tricks are just common sense if you're not an idiot.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "bedroom.jpg",
        dialogue: "Location: Guest Room (Sora's Room)",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "bedroom.jpg",
        dialogue: "(examining the old art supplies on the desk) Hey, didn't you use this paint set for that dumb portrait of Tomo last year?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_evil.png",
        background: "bedroom.jpg",
        dialogue: "(laughing) Oh god, yeah. She made me repaint her eyelashes three times. Why?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "bedroom.jpg",
        dialogue: "This red paint—it's the same one on the door. Was this always in here?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_scared.png",
        background: "bedroom.jpg",
        dialogue: "No, I brought it out before dinner. I was gonna use it for a prank later but I never got the chance. Wait… someone must've taken it from this room.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    }
];

export default investigationScenes; 