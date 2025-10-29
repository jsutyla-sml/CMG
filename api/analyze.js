import { GoogleGenAI } from "@google/genai";

// 1. Initialize the client with the API key
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { bookText } = req.body;
  if (!bookText || bookText.trim() === '') {
    return res.status(400).json({ error: 'bookText is required' });
  }

  try {
    const prompt = `
      Analyze this book and extract the following marketing angles.
      Be SPECIFIC and compelling.
      Return your analysis in a single, valid JSON object.
      The keys must be: bookTitle, readerFantasy, emotionalWreckage, identityMirror, 
      cultureHook, personalWound, cinematicMoment, whatIfSetup, tropeTwist, shockFactor.

      EXAMPLE RESPONSE:
      {
        "bookTitle": "The Ashen Crown",
        "readerFantasy": "Escaping a mundane life to discover you are the chosen one with secret, powerful magic.",
        "emotionalWreckage": "The moment the main character's mentor sacrifices themselves, using their final breath to reveal the secret to defeating the villain.",
        "identityMirror": "Anyone who has ever felt like an outsider or underestimated, only to find their unique strength.",
        "cultureHook": "It's 'Game of Thrones' political intrigue meets 'Avatar: The Last Airbender' elemental magic.",
        "personalWound": "The feeling of impostor syndrome and the crushing weight of expectations from family.",
        "cinematicMoment": "The first time the protagonist unleashes their full power, erupting in a column of light that shatters the castle's obsidian gates.",
        "whatIfSetup": "What if the 'villain' was actually the previous chosen one who failed and is now trying to stop you from making the same mistakes?",
        "tropeTwist": "The 'love triangle' is resolved when the two love interests realize they are better friends and team up to support the protagonist.",
        "shockFactor": "The seemingly loyal sidekick has been the main antagonist's child all along, reporting on the protagonist's every move."
      }

      BOOK TEXT TO ANALYZE:
      ---
      ${bookText}
      ---
    `;

    // 2. FIXED: The method is on genAI.models
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    const response = await result.response;
    const aiText = response.text();

    const cleanedText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    const angles = JSON.parse(cleanedText);

    res.status(200).json(angles);

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Failed to analyze book', details: error.message });
  }
}