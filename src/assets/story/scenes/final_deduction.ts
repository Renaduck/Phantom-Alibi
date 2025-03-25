import { Scene } from "../../../common/types";
import { SCENE_TYPES } from "../../../common/constants";

const finalDeductionScenes: Scene[] = [
    {
        character_name: "",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "[Final Deduction Moment]",
        type: SCENE_TYPES.OVERLAY_TEXT,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "The door was locked from the outside… using fishing line. That explains the broken thread caught beneath the frame. The killer painted the door, closed it, then used the wire to pull the handle and engage the lock.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "That's why there's paint on the inside handle—Ren couldn't have done that from the outside. And the murder weapon? A garrote—thin wire, like the one under the bed.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    },
    {
        character_name: "Sora",
        character_sprite: "",
        background: "common_space.webp",
        dialogue: "This wasn't supernatural. This was cold, planned… and personal.",
        type: SCENE_TYPES.INNER_MONOLOGUE,
        items: []
    }
];

export default finalDeductionScenes;