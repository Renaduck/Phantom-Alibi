import { Item } from "../../common/types";

// Define items in the game
const items: Record<string, Item & {
    img_src: string;
    itemType?: 'inventory' | 'dialogue';
    dialogueText?: string;
}> = {
    // Investigation clues
    door_paint: {
        img_src: "door_paint.png",
        description: "Paint on the door handle",
        x: 0,
        y: 0,
        itemType: 'inventory'
    },
    door_scratches: {
        img_src: "door_scratches.png",
        description: "Scratches under the door",
        x: 0,
        y: 0,
        itemType: 'inventory'
    },
    fishing_wire: {
        img_src: "fishing_wire.png",
        description: "Fishing wire",
        x: 30,
        y: 20,
        itemType: 'inventory'
    },
    neck_bruises: {
        img_src: "neck_bruises.jpg",
        description: "Neck bruises",
        x: 73,
        y: 37,
        itemType: 'inventory'
    },

    // Room items - dialogue hotspots
    bed: {
        img_src: "",
        description: "Bed",
        x: 50,
        y: 65,
        itemType: 'dialogue',
        dialogueText: "Huh. Looks pretty soft— Thump. …UUUUGH. That was a trap."
    },
    desk: {
        img_src: "",
        description: "Desk",
        x: 85,
        y: 50,
        itemType: 'dialogue',
        dialogueText: "Do guests actually use desks in their rooms, or is it just one of those 'fancy house' things?"
    },
    window: {
        img_src: "",
        description: "Window",
        x: 25,
        y: 40,
        itemType: 'dialogue',
        dialogueText: "Yup. Method of escape confirmed."
    },
    chair: {
        img_src: "",
        description: "Chair",
        x: 15,
        y: 70,
        itemType: 'dialogue',
        dialogueText: "Oh hey, it's one of those… uh… you know… Whatever it's called."
    },
    bookshelf: {
        img_src: "",
        description: "Bookshelf",
        x: 80,
        y: 30,
        itemType: 'dialogue',
        dialogueText: "So many books... I wonder if anyone has actually read all of these."
    },

    // Inventory items
    strange_note: {
        img_src: "weird_note.png",
        description: "A strange warning note",
        x: 62,
        y: 55,
        itemType: 'inventory'
    },
    weird_note: {
        img_src: "weird_note.png",
        description: "The note reads \"don't sleep here...\"",
        x: 62,
        y: 55,
        itemType: 'inventory'
    }
};

export default items; 