import items from "./items";
import prologueScenes from "./scenes/prologue";
import tutorialScenes from "./scenes/tutorial";
import preDinnerScenes from "./scenes/pre_dinner";
import dinnerScenes from "./scenes/dinner";
import blackwoodManorScenes from "./scenes/blackwood_manor";
import storyReactionsScenes from "./scenes/story_reactions";
import livingRoomScenes from "./scenes/living_room";
import ouijaBoardScenes from "./scenes/ouija_board";
import beforeCrimeScenes from "./scenes/before_crime";
import crimeScenes from "./scenes/crime";
import rensRoomScenes from "./scenes/rens_room";
import investigationScenes from "./scenes/investigation";
import finalDeductionScenes from "./scenes/final_deduction";
import finalConfrontationScenes from "./scenes/final_confrontation";
import epilogueScenes from "./scenes/epilogue";

// Create the complete story by combining all scene collections
const storyData = {
    title: "The Mystery at Blackwood Manor",
    items,
    scenes: [
        ...prologueScenes,
        ...tutorialScenes,
        ...preDinnerScenes,
        ...dinnerScenes,
        ...blackwoodManorScenes,
        ...storyReactionsScenes,
        ...livingRoomScenes,
        ...ouijaBoardScenes,
        ...beforeCrimeScenes,
        ...crimeScenes,
        ...rensRoomScenes,
        ...investigationScenes,
        ...finalDeductionScenes,
        ...finalConfrontationScenes,
        ...epilogueScenes
    ]
};

export default storyData; 