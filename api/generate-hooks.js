import { GoogleGenAI } from "@google/genai";

// 1. FIXED: The API key is passed as an object
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { bookAngles, selectedFormats } = req.body;
  if (!bookAngles || !selectedFormats || selectedFormats.length === 0) {
    return res.status(400).json({ error: 'Missing bookAngles or selectedFormats' });
  }

  try {
    const prompt = `
      You are a world-class book marketing expert, specializing in viral social media hooks for authors (like for TikTok, Reels, and Shorts).

      Here is the core data for a book, in JSON format:
      ${JSON.stringify(bookAngles, null, 2)}

      Here is the list of content formats the author wants to create, in JSON format:
      ${JSON.stringify(selectedFormats, null, 2)}

      Your task is to generate one compelling, short, and viral marketing hook for EACH format in the list.
      - Use the book's core data to make each hook specific and emotional.
      - Match the hook to the spirit of the format (e.g., "The scene that broke me" should be emotional; "Shock Factor" should be a gasp-worthy tease).
      - Keep the hooks short and punchy.

      Return your response as a single, valid JSON array. Each object in the array must have two keys:
      1. "formatId": The ID from the input format (e.g., 1, 5, 22)
      2. "hookContent": The new marketing hook you generated (as a string)

      Example response:
      [
        { "formatId": 5, "hookContent": "I'm still not over the mentor's sacrifice. That last reveal? Gutted. #booktok #emotionaldamage" },
        { "formatId": 13, "hookContent": "Everyone thinks they know the villain. You don't. The real twist in Chapter 30..." },
        { "formatId": 21, "hookContent": "Imagine waking up with elemental magic and finding out the 'villain' is just a failed chosen one. What would you do?" }
      ]
    `;

    // 2. FIXED: We call generateContent directly on the client
    const result = await genAI.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    
    const response = await result.response;
    const aiText = response.text();

    const cleanedText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
    const generatedHooks = JSON.parse(cleanedText);

    res.status(200).json(generatedHooks);

  } catch (error) {
    console.error('Error in generate-hooks API:', error);
    res.status(500).json({ error: 'Failed to generate hooks', details: error.message });
  }
}