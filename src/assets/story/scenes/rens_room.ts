import { Scene } from "../../../common/types";
import { SCENE_TYPES } from "../../../common/constants";

const rensRoomScenes: Scene[] = [
    {
        character_name: "",
        character_sprite: "",
        background: "death_scene.png",
        dialogue: "[Inside Ren's Room]",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "death_scene.png",
        dialogue: "He was there. Ren. Slumped on the floor, his back awkwardly propped against the edge of the bed. One hand limp in his lap. Eyes wide open. Staring at nothing.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "death_scene.png",
        dialogue: "I rushed to him— Grabbed his shoulders—",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "sora_talking.png",
        background: "death_scene.png",
        dialogue: "Ren? Hey—wake up!",
        type: SCENE_TYPES.DIALOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "death_scene.png",
        dialogue: "I shook him once. Twice. His skin was cold. Not just chilly. Cold. And then I knew. Without needing to check his pulse. Without needing to say it out loud. Ren was dead. And someone in this house did it.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "death_scene.png",
        dialogue: "There's no way the police will make it to us before the killer escapes with the storm the way it is. I have to investigate",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    }
];

export default rensRoomScenes; 