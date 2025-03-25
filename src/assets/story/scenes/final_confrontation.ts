import { Scene } from "../../../common/types";
import { SCENE_TYPES } from "../../../common/constants";

const finalConfrontationScenes: Scene[] = [
    {
        character_name: "",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "[Final Confrontation – Living Room, Night]",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "The storm outside hadn't let up. Rain still lashed the windows, and the thunder was getting comfortable. We sat in a semi-circle around the fireplace. No one said much. We were tired. Shell-shocked. But I couldn't let this night end with a ghost story. Too much didn't add up. And the truth? It was in the room with us.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_scared.png",
        background: "common_space.webp",
        dialogue: "(wringing her hands) So… if it wasn't a ghost, or a prank gone wrong…",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "I stood up.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "I'd walked through Ren's room, retraced someone else's steps. There were no spirits—only secrets. And one of them was about to snap.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "common_space.webp",
        dialogue: "It wasn't an accident. And it wasn't supernatural. Ren was murdered. By someone in this house.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Tomo",
        character_sprite: "tomo_talking.png",
        background: "common_space.webp",
        dialogue: "(raising a brow) Oh come on—murder? Really?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ken",
        character_sprite: "ken_smart.png",
        background: "common_space.webp",
        dialogue: "(coldly) She's right. Door was locked. Windows sealed. He didn't do this to himself.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ellie",
        character_sprite: "ellie_scared.png",
        background: "common_space.webp",
        dialogue: "(shaking slightly) B-But it was painted… like the story. The ghost…",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "That was the point. Someone wanted us to believe it.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "common_space.webp",
        dialogue: "The red paint was fresh. Still wet when Ellie found it. Which means Ren was already dead when it was put there. But there's more—look closely at the door.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "common_space.webp",
        dialogue: "I held up the frayed thread of fishing line I found under the frame. This was jammed under the door. Fishing line—thin enough to go unnoticed. Strong enough to pull the lock shut from the outside.",
        type: SCENE_TYPES.DIALOGUE,
        items: ["fishing_wire"]
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "It was clever. I'll give them that. But clever plans fall apart under the weight of detail.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "common_space.webp",
        dialogue: "Whoever killed Ren locked the door after leaving. Painted the scene. Pulled the handle shut using this line, then snapped it off and walked away.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Ken",
        character_sprite: "ken_smart.png",
        background: "common_space.webp",
        dialogue: "Which means… it had to be someone who knew how to stage it.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Tomo",
        character_sprite: "tomo_talking.png",
        background: "common_space.webp",
        dialogue: "Okay, but why? Ren was annoying, sure, but not—murder-worthy!",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "And this is where it got personal. Because I'd seen it in her eyes. Not panic. Not fear. Resolution.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "I turned to her.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "[SELECT THE CULPRIT]",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "common_space.webp",
        dialogue: "Hana.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "Everyone looked at her. She didn't flinch.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "common_space.webp",
        dialogue: "You knew how fishing line works. You were calm. Too calm. And when I found the murder weapon under the bed—wire fashioned into a garrote—I knew it wasn't some spur-of-the-moment act. You planned this.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Hana",
        character_sprite: "hana_normal.png",
        background: "common_space.webp",
        dialogue: "(quietly) …So what if I did?",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "The words landed like a slap. Even now, she wasn't scared.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Hana",
        character_sprite: "hana_upset.png",
        background: "common_space.webp",
        dialogue: "He wasn't just some punk. He ruined my brother's life. Treated it like a joke. I waited for someone to do something. No one ever did.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Rina",
        character_sprite: "rina_scared.png",
        background: "common_space.webp",
        dialogue: "(shocked) Hana, you could've told us—",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Hana",
        character_sprite: "hana_upset.png",
        background: "common_space.webp",
        dialogue: "And you would've what? Believed me? Told me to let it go? I did what I had to.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "I could see it on her face— No guilt. Just… relief. Like she'd finally exhaled after holding her breath for years.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "common_space.webp",
        dialogue: "The police are on their way. You'll have to explain the rest to them.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Hana",
        character_sprite: "hana_normal.png",
        background: "common_space.webp",
        dialogue: "Let them come.",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "And that was it. The end of the séance. Only this ghost had a name. And a motive.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    }
];

export default finalConfrontationScenes; 