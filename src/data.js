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
    // ================================
    // SKETCH PROMPTS (15)
    // ================================
    { type: "Sketch", instruction: "Draw the object directly to your left without looking at the paper.", duration: "5 min" },
    { type: "Sketch", instruction: "Draw a sound you hear right now.", duration: "5 min" },
    { type: "Sketch", instruction: "Sketch your hand in a weird position.", duration: "5 min" },
    { type: "Sketch", instruction: "Draw the view from the nearest window.", duration: "10 min" },
    { type: "Sketch", instruction: "Draw something from memory: your childhood bedroom.", duration: "10 min" },
    { type: "Sketch", instruction: "Draw a cup or mug without lifting your pen.", duration: "5 min" },
    { type: "Sketch", instruction: "Draw an object, but only its shadow.", duration: "5 min" },
    { type: "Sketch", instruction: "Doodle patterns until you fill a page.", duration: "10 min" },
    { type: "Sketch", instruction: "Draw the clouds you see or imagine right now.", duration: "5 min" },
    { type: "Sketch", instruction: "Sketch someone from memory without looking at a photo.", duration: "10 min" },
    { type: "Sketch", instruction: "Draw the first thing you see when you look up.", duration: "5 min" },
    { type: "Sketch", instruction: "Draw your breakfast or last meal.", duration: "5 min" },
    { type: "Sketch", instruction: "Sketch the same object 3 times, each time faster.", duration: "5 min" },
    { type: "Sketch", instruction: "Draw a plant or flower, real or imagined.", duration: "10 min" },
    { type: "Sketch", instruction: "Draw your favorite shoes.", duration: "5 min" },

    // ================================
    // TALK / RECORD PROMPTS (12)
    // ================================
    { type: "Talk", instruction: "Record yourself explaining your day to your future self.", duration: "3 min" },
    { type: "Talk", instruction: "Describe a random object as if it's the most interesting thing ever.", duration: "3 min" },
    { type: "Talk", instruction: "Describe a dream you had recently, real or imagined.", duration: "5 min" },
    { type: "Talk", instruction: "Record a voice note for someone (you don't have to send it).", duration: "5 min" },
    { type: "Talk", instruction: "Explain how to make your favorite meal, step by step.", duration: "5 min" },
    { type: "Talk", instruction: "Describe your perfect lazy Sunday.", duration: "3 min" },
    { type: "Talk", instruction: "Tell a story about how you got something you own.", duration: "5 min" },
    { type: "Talk", instruction: "Describe the room you're in to someone who can't see it.", duration: "3 min" },
    { type: "Talk", instruction: "Talk about a skill you wish you had.", duration: "3 min" },
    { type: "Talk", instruction: "Describe your favorite place without saying its name.", duration: "3 min" },
    { type: "Talk", instruction: "Record yourself humming a melody that's stuck in your head.", duration: "2 min" },
    { type: "Talk", instruction: "Tell a memory about rain.", duration: "3 min" },

    // ================================
    // PHOTO PROMPTS (15)
    // ================================
    { type: "Photo", instruction: "Take a photo of a shadow.", duration: "2 min" },
    { type: "Photo", instruction: "Capture something blue.", duration: "2 min" },
    { type: "Photo", instruction: "Find and photograph a reflection.", duration: "5 min" },
    { type: "Photo", instruction: "Take a photo of something that looks out of place.", duration: "5 min" },
    { type: "Photo", instruction: "Photograph a mundane object from an unusual angle.", duration: "5 min" },
    { type: "Photo", instruction: "Find geometry in your surroundings (lines, circles, squares).", duration: "5 min" },
    { type: "Photo", instruction: "Capture light falling on a surface.", duration: "5 min" },
    { type: "Photo", instruction: "Take a photo of something old.", duration: "2 min" },
    { type: "Photo", instruction: "Photograph your feet where you are right now.", duration: "1 min" },
    { type: "Photo", instruction: "Capture something soft.", duration: "3 min" },
    { type: "Photo", instruction: "Take a photo of the color you see most around you.", duration: "3 min" },
    { type: "Photo", instruction: "Find and capture a pattern.", duration: "5 min" },
    { type: "Photo", instruction: "Photograph something small.", duration: "3 min" },
    { type: "Photo", instruction: "Capture a doorway or entrance.", duration: "3 min" },
    { type: "Photo", instruction: "Take a photo of something that makes you calm.", duration: "5 min" },

    // ================================
    // TEXTURE / IMPRINT PROMPTS (10)
    // ================================
    { type: "Texture", instruction: "Make a rubbing of a textured surface nearby.", duration: "5 min" },
    { type: "Texture", instruction: "Press your finger into something soft and observe the imprint.", duration: "2 min" },
    { type: "Texture", instruction: "Find three different textures and photograph them close-up.", duration: "5 min" },
    { type: "Texture", instruction: "Collect a small piece of something (leaf, paper, fabric).", duration: "5 min" },
    { type: "Texture", instruction: "Touch five different textures and describe each in one word.", duration: "3 min" },
    { type: "Texture", instruction: "Find the roughest thing near you and draw it.", duration: "5 min" },
    { type: "Texture", instruction: "Create a texture by crumpling paper.", duration: "3 min" },
    { type: "Texture", instruction: "Find something smooth and something rough. Compare them.", duration: "3 min" },
    { type: "Texture", instruction: "Make marks on paper using something other than a pen.", duration: "5 min" },
    { type: "Texture", instruction: "Collect textures in photos: wood, metal, fabric, stone.", duration: "10 min" },

    // ================================
    // VIDEO REACTION PROMPTS (10)
    // ================================
    { type: "Video Reaction", instruction: "React to a happy memory you have.", duration: "5 min" },
    { type: "Video Reaction", instruction: "Watch rain falling and describe how it makes you feel.", duration: "5 min" },
    { type: "Video Reaction", instruction: "Find an old photo of yourself and record your thoughts.", duration: "5 min" },
    { type: "Video Reaction", instruction: "Listen to a song you loved years ago and react honestly.", duration: "5 min" },
    { type: "Video Reaction", instruction: "Watch a sunrise or sunset video and describe it.", duration: "5 min" },
    { type: "Video Reaction", instruction: "Record your reaction to opening a random book.", duration: "3 min" },
    { type: "Video Reaction", instruction: "Watch a video of ocean waves and talk about what you feel.", duration: "5 min" },
    { type: "Video Reaction", instruction: "React to looking at yourself in a mirror for 30 seconds.", duration: "3 min" },
    { type: "Video Reaction", instruction: "Watch a video of a place you want to visit.", duration: "5 min" },
    { type: "Video Reaction", instruction: "React to something cute (animal videos work).", duration: "5 min" },

    // ================================
    // DISCUSSION / WRITING PROMPTS (15)
    // ================================
    { type: "Discussion", instruction: "Write 3 questions you would ask a time traveler.", duration: "5 min" },
    { type: "Discussion", instruction: "What's a hill you're willing to die on? Write a short defense.", duration: "10 min" },
    { type: "Discussion", instruction: "Describe an object you own that has a story.", duration: "5 min" },
    { type: "Discussion", instruction: "What's something you changed your mind about recently?", duration: "10 min" },
    { type: "Discussion", instruction: "Write a short review of the last thing you ate.", duration: "5 min" },
    { type: "Discussion", instruction: "If you could only keep 5 apps on your phone, which ones?", duration: "5 min" },
    { type: "Discussion", instruction: "What would you tell your 10-year-old self?", duration: "5 min" },
    { type: "Discussion", instruction: "Describe a stranger you remember.", duration: "5 min" },
    { type: "Discussion", instruction: "What's overrated? What's underrated?", duration: "5 min" },
    { type: "Discussion", instruction: "Write about a small thing that made you happy this week.", duration: "5 min" },
    { type: "Discussion", instruction: "If you could master one skill overnight, what would it be?", duration: "5 min" },
    { type: "Discussion", instruction: "What's your unpopular opinion about something everyone loves?", duration: "5 min" },
    { type: "Discussion", instruction: "Describe the view from a window you remember.", duration: "5 min" },
    { type: "Discussion", instruction: "Write about a sound you associate with comfort.", duration: "5 min" },
    { type: "Discussion", instruction: "What would you do with an extra hour each day?", duration: "5 min" },

    // ================================
    // OBSERVATION PROMPTS (10)
    // ================================
    { type: "Observation", instruction: "List 5 things you can see that are blue.", duration: "2 min" },
    { type: "Observation", instruction: "Close your eyes and list 5 sounds you hear.", duration: "2 min" },
    { type: "Observation", instruction: "Find something in your space you haven't noticed in a while.", duration: "3 min" },
    { type: "Observation", instruction: "Observe a single object for 2 minutes. Write what you notice.", duration: "5 min" },
    { type: "Observation", instruction: "Count how many rectangles you can see around you.", duration: "2 min" },
    { type: "Observation", instruction: "Notice 3 things that are moving right now.", duration: "2 min" },
    { type: "Observation", instruction: "Look outside and describe the sky in detail.", duration: "3 min" },
    { type: "Observation", instruction: "List everything you can see that's smaller than your hand.", duration: "3 min" },
    { type: "Observation", instruction: "Observe someone (in person or memory) and describe their hands.", duration: "5 min" },
    { type: "Observation", instruction: "List 5 things you're grateful for that you can see right now.", duration: "3 min" },

    // ================================
    // WRITING PROMPTS (12)
    // ================================
    { type: "Writing", instruction: "Write one sentence about the weather without weather words.", duration: "5 min" },
    { type: "Writing", instruction: "Describe your current mood as a landscape.", duration: "5 min" },
    { type: "Writing", instruction: "Write a haiku about something you see right now.", duration: "5 min" },
    { type: "Writing", instruction: "Write three sentences that start with 'I remember...'", duration: "5 min" },
    { type: "Writing", instruction: "Make a list of 10 things you like. No explanations needed.", duration: "5 min" },
    { type: "Writing", instruction: "Write a letter to yourself from 5 years ago.", duration: "10 min" },
    { type: "Writing", instruction: "Describe a color to someone who can't see it.", duration: "5 min" },
    { type: "Writing", instruction: "Write the beginning of a story using only 3 sentences.", duration: "5 min" },
    { type: "Writing", instruction: "List 10 words that feel nice to say.", duration: "3 min" },
    { type: "Writing", instruction: "Write about a texture using only emotions.", duration: "5 min" },
    { type: "Writing", instruction: "Describe the last dream you remember in exactly 50 words.", duration: "10 min" },
    { type: "Writing", instruction: "Write a tiny poem about tea or coffee.", duration: "5 min" },

    // ================================
    // MOVEMENT / BODY PROMPTS (8)
    // ================================
    { type: "Movement", instruction: "Stretch for 2 minutes and notice how your body feels.", duration: "2 min" },
    { type: "Movement", instruction: "Walk around your space and touch 5 different textures.", duration: "3 min" },
    { type: "Movement", instruction: "Take 10 deep breaths and count them slowly.", duration: "2 min" },
    { type: "Movement", instruction: "Dance to one song, any song, however you want.", duration: "4 min" },
    { type: "Movement", instruction: "Walk to the window and look outside for 1 minute.", duration: "2 min" },
    { type: "Movement", instruction: "Shake your hands out for 30 seconds.", duration: "1 min" },
    { type: "Movement", instruction: "Sit in a different spot than usual for 5 minutes.", duration: "5 min" },
    { type: "Movement", instruction: "Stand up and notice 3 things about the room from that height.", duration: "2 min" },

    // ================================
    // LISTEN PROMPTS (8)
    // ================================
    { type: "Listen", instruction: "Listen to a song you've never heard before. Fully.", duration: "5 min" },
    { type: "Listen", instruction: "Go somewhere quiet and just listen for 2 minutes.", duration: "2 min" },
    { type: "Listen", instruction: "Listen to rain sounds and do nothing else.", duration: "5 min" },
    { type: "Listen", instruction: "Listen to a song that makes you nostalgic.", duration: "5 min" },
    { type: "Listen", instruction: "Listen to your own breathing for 1 minute.", duration: "2 min" },
    { type: "Listen", instruction: "Find a sound in your environment and focus only on that.", duration: "3 min" },
    { type: "Listen", instruction: "Listen to classical music you don't usually hear.", duration: "5 min" },
    { type: "Listen", instruction: "Listen to a language you don't speak. Just let it wash over you.", duration: "5 min" }
];

export const JAPAN_ACTIVITIES = [
    // ================================
    // JAPAN EXPLORATION (Specifically for Sarah)
    // ================================
    { type: "Exploration", instruction: "Find a train station stamp (Eki Stamp) and stamp your notebook.", duration: "15 min" },
    { type: "Exploration", instruction: "Find a manhole cover with a unique design and take a picture.", duration: "5 min" },
    { type: "Exploration", instruction: "Spot a statue of a character (anime/mascot) outside a shop.", duration: "5 min" },
    { type: "Exploration", instruction: "Go to a 'Gachapon' machine and get one random toy.", duration: "5 min" },
    { type: "Exploration", instruction: "Find a vending machine with a drink you've never seen before.", duration: "5 min" },
    { type: "Exploration", instruction: "Visit a convenience store (Konbini) and buy a seasonal snack.", duration: "10 min" },
    { type: "Exploration", instruction: "Find a small neighborhood shrine (not a big temple) and pay respects.", duration: "10 min" },
    { type: "Exploration", instruction: "Take a photo of a 'purikura' booth (or take one inside if brave!).", duration: "10 min" },
    { type: "Exploration", instruction: "Find a shop sign written in vertical Japanese text.", duration: "2 min" },
    { type: "Exploration", instruction: "Spot someone wearing a Kimono or Yukata.", duration: "5 min" },
    { type: "Exploration", instruction: "Find a quirky 'Engrish' sign or T-shirt.", duration: "2 min" },
    { type: "Exploration", instruction: "Collect a flyer or tissue pack handed out on the street.", duration: "1 min" },
    { type: "Exploration", instruction: "Find a hidden alleyway (Yokocho) that looks interesting.", duration: "10 min" },
    { type: "Social", instruction: "Ask a new student where they are from.", duration: "2 min" },
    { type: "Social", instruction: "Ask someone for a recommendation for a ramen shop.", duration: "3 min" },
    { type: "Social", instruction: "Say 'Ohayo Gozaimasu' to a neighbor or dorm mate.", duration: "1 min" },
    { type: "Social", instruction: "Ask a classmate what their favorite Japanese food is.", duration: "3 min" },
    { type: "Social", instruction: "Find out how to say 'Delicious' in your classmate's native language.", duration: "5 min" },
    { type: "Exploration", instruction: "Go to a 100-yen shop and find the weirdest gadget.", duration: "15 min" },
    { type: "Exploration", instruction: "Find a building with interesting architecture nearby.", duration: "5 min" },

    { type: "Otaku 📚", instruction: "Ve a una librería (Book Off o Tsutaya) y encuentra la sección BL.", duration: "10 min", rule: "Solo mira las portadas y los estilos de arte. No hace falta comprar." },
    { type: "Otaku 📚", instruction: "El desafío de las 'Manos Yaoi'.", duration: "5 min", rule: "Busca una portada de manga donde las manos sean desproporcionadamente grandes." },
    { type: "Otaku 👓", instruction: "Encuentra un 'Ikemen' (chico guapo) de cartón.", duration: "2 min", rule: "Suele haber anuncios de cantantes o animes fuera de las tiendas." },
    { type: "Otaku 🎒", instruction: "Spot an 'Ita-bag'.", duration: "2 min", rule: "Busca a alguien con una mochila cubierta de pines/chapitas de un solo personaje." },
    { type: "Otaku 🎵", instruction: "Entra a un Animate o tienda de hobbies.", duration: "15 min", rule: "Busca el merchandising más extraño o pequeño que encuentres." },
    { type: "Otaku 📺", instruction: "Prende la TV japonesa y busca un anime.", duration: "10 min", rule: "Intenta adivinar la personalidad del personaje solo por su voz." },

    { type: "Sabor 🍵", instruction: "El 'Matcha Hunt' de Konbini.", duration: "5 min", rule: "Entra a un 7-Eleven/Lawson y cuenta cuántos productos verdes (matcha) ves." },
    { type: "Sabor 🍵", instruction: "Compra una bebida de temporada limitada.", duration: "5 min", rule: "Busca la etiqueta 'Gentei' (限定). Si no te gusta, no tienes que terminártela." },
    { type: "Sabor 🍙", instruction: "Cena de microondas nivel experto.", duration: "10 min", rule: "Elige una comida preparada (Bento) basándote solo en lo bonita que es la caja." },
    { type: "Calma ☕", instruction: "Siéntate en un banco con una bebida caliente.", duration: "10 min", rule: "No mires el móvil. Solo observa a la gente pasar." },
    { type: "Sabor 🍦", instruction: "Busca un sabor de helado extraño.", duration: "5 min", rule: "Puede ser batata, sésamo negro o soda. Solo identifícalo." },

    { type: "Dorm Life 🏠", instruction: "Deja una nota adhesiva (Post-it) en la cocina común.", duration: "2 min", rule: "Dibuja una carita feliz o escribe 'Ganbatte!'." },
    { type: "Dorm Life 🧼", instruction: "Descifra un botón de la lavadora/inodoro.", duration: "3 min", rule: "Usa Google Translate cámara para entender qué hace ese botón misterioso." },
    { type: "Papelería 🖊️", instruction: "Prueba bolígrafos en una papelería (Loft/Tokyu Hands).", duration: "10 min", rule: "Encuentra el bolígrafo que se sienta mejor al escribir." },
    { type: "Estudio 🎧", instruction: "Escucha a escondidas (Eavesdrop) gentilmente.", duration: "5 min", rule: "En un café o tren, intenta captar UNA sola palabra que ya conozcas." },
    { type: "Estudio 🗾", instruction: "Encuentra tu Kanji favorito en la calle.", duration: "5 min", rule: "Busca un cartel que tenga un Kanji que ya sepas leer." },
    { type: "Dorm Life 🧺", instruction: "Organiza tu escritorio estilo 'Aesthetic'.", duration: "10 min", rule: "Ponlo bonito como si fuera para una foto, aunque luego lo desordenes." },

    { type: "Sonidos 🔊", instruction: "Escucha el semáforo.", duration: "1 min", rule: "Muchos cruces en Japón suenan como pajaritos o melodías. Cierra los ojos y escucha." },
    { type: "Exploración 🚲", instruction: "Cuenta las bicicletas sin candado.", duration: "5 min", rule: "Observa la confianza de la seguridad en Japón." },
    { type: "Exploración 🐾", instruction: "Encuentra un gato callejero o un perro en cochecito.", duration: "N/A", rule: "En Japón es muy común ver perros en carritos de bebé." },
    { type: "Exploración 🌸", instruction: "Busca naturaleza en el concreto.", duration: "2 min", rule: "Encuentra una maceta cuidada fuera de una casa o una flor en la acera." },
    { type: "Exploración 🏮", instruction: "Busca un farolillo rojo (Aka-chochin).", duration: "N/A", rule: "Suelen estar fuera de los Izakayas. Observa si brilla." }





];
