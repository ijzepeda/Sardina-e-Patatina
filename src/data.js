export const AFFIRMATIONS = [
    "You don't have to feel ready to begin.",
    "Doing something small still counts.",
    "You're allowed to create without enjoying it.",
    "Nothing needs to be shared to be real.",
    "Today doesn't need a breakthrough.",
    "Starting messy is still starting.",
    "You're not behind — you're just here.",
    "Showing up quietly is enough.",
    "You don't need a reason to try.",
    "Not today is still a valid answer.",
    "You can stop whenever you want.",
    "This doesn't have to be good.",
    "You're allowed to be unfinished.",
    "No one is waiting for perfection.",
    "You're not wasting time by existing.",
    "You don't need to explain yourself.",
    "Curiosity is enough for today.",
    "You can create without an outcome.",
    "Nothing is expected from you right now.",
    "Trying counts, even if it feels empty.",
    "You're allowed to begin again."
];

export const ACTIVITIES = [
    // --- Sketch Prompts ---
    { type: "Sketch", instruction: "Draw the object directly to your left without looking at the paper.", duration: "5 min" },
    { type: "Sketch", instruction: "Draw a sound you hear right now.", duration: "5 min" },
    { type: "Sketch", instruction: "Sketch your hand in a weird position.", duration: "5 min" },
    { type: "Sketch", instruction: "Draw the view from the nearest window.", duration: "10 min" },
    { type: "Sketch", instruction: "Draw something from memory: your childhood bedroom.", duration: "10 min" },
    { type: "Sketch", instruction: "Draw a cup or mug without lifting your pen.", duration: "5 min" },
    { type: "Sketch", instruction: "Draw an object, but only its shadow.", duration: "5 min" },
    { type: "Sketch", instruction: "Doodle patterns until you fill a page.", duration: "10 min" },

    // --- Talk / Record Prompts ---
    { type: "Talk", instruction: "Record yourself explaining your day to your future self.", duration: "3 min" },
    { type: "Talk", instruction: "Talk about a random object in your room as if it's the most interesting thing ever.", duration: "3 min" },
    { type: "Talk", instruction: "Describe a dream you had recently, real or imagined.", duration: "5 min" },
    { type: "Talk", instruction: "Record a voice note for someone you haven't talked to in a while (you don't have to send it).", duration: "5 min" },
    { type: "Talk", instruction: "Explain how to make your favorite meal, step by step.", duration: "5 min" },

    // --- Photo Prompts (Street Photography inspired) ---
    { type: "Photo", instruction: "Take a photo of a shadow.", duration: "2 min" },
    { type: "Photo", instruction: "Capture something blue.", duration: "2 min" },
    { type: "Photo", instruction: "Find and photograph a reflection.", duration: "5 min" },
    { type: "Photo", instruction: "Take a photo of something that looks out of place.", duration: "5 min" },
    { type: "Photo", instruction: "Photograph a mundane object from an unusual angle.", duration: "5 min" },
    { type: "Photo", instruction: "Find geometry in your surroundings (lines, circles, squares).", duration: "5 min" },
    { type: "Photo", instruction: "Capture light falling on a surface.", duration: "5 min" },
    { type: "Photo", instruction: "Take a photo of something old.", duration: "2 min" },

    // --- Texture / Imprint Prompts ---
    { type: "Texture", instruction: "Make a rubbing of a textured surface nearby.", duration: "5 min" },
    { type: "Texture", instruction: "Press your finger into something soft and observe the imprint.", duration: "2 min" },
    { type: "Texture", instruction: "Find three different textures and photograph them close-up.", duration: "5 min" },
    { type: "Texture", instruction: "Collect a small piece of something (leaf, paper, fabric) and glue it somewhere.", duration: "5 min" },

    // --- Video Reaction / Themes ---
    { type: "Video Reaction", instruction: "React to a happy memory you have.", duration: "5 min" },
    { type: "Video Reaction", instruction: "Watch a video of rain falling and describe how it makes you feel.", duration: "5 min" },
    { type: "Video Reaction", instruction: "Find an old photo of yourself and record your thoughts about it.", duration: "5 min" },
    { type: "Video Reaction", instruction: "Listen to a song you loved years ago and react honestly.", duration: "5 min" },

    // --- Discussion / Writing Prompts (Reddit-style) ---
    { type: "Discussion", instruction: "Write 3 questions you would ask a time traveler.", duration: "5 min" },
    { type: "Discussion", instruction: "What's a hill you're willing to die on? Write a short defense.", duration: "10 min" },
    { type: "Discussion", instruction: "Describe an object you own that has a story.", duration: "5 min" },
    { type: "Discussion", instruction: "What's something you changed your mind about recently?", duration: "10 min" },
    { type: "Discussion", instruction: "Write a short review of the last thing you ate.", duration: "5 min" },
    { type: "Discussion", instruction: "If you could only keep 5 apps on your phone, which ones?", duration: "5 min" },

    // --- Observation Prompts ---
    { type: "Observation", instruction: "List 5 things you can see that are blue.", duration: "2 min" },
    { type: "Observation", instruction: "Close your eyes and list 5 sounds you hear.", duration: "2 min" },
    { type: "Observation", instruction: "Find something in your space you haven't noticed in a while.", duration: "3 min" },
    { type: "Observation", instruction: "Observe a single object for 2 minutes. Write what you notice.", duration: "5 min" },

    // --- Writing Prompts ---
    { type: "Writing", instruction: "Write one sentence about the weather, but don't use weather words.", duration: "5 min" },
    { type: "Writing", instruction: "Describe your current mood as a landscape.", duration: "5 min" },
    { type: "Writing", instruction: "Write a haiku about something you see right now.", duration: "5 min" },
    { type: "Writing", instruction: "Write three sentences that start with 'I remember...'", duration: "5 min" },
    { type: "Writing", instruction: "Make a list of 10 things you like. No explanations needed.", duration: "5 min" }
];
