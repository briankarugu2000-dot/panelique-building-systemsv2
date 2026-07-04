import { GoogleGenAI } from '@google/genai';

const apiKey = (process.env.GEMINI_API_KEY || '').trim();

const ai = apiKey && apiKey !== "YOUR_GEMINI_API_KEY_HERE" ? new GoogleGenAI({ apiKey }) : null;

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export async function askGemini(prompt: string, history: ChatMessage[] = []): Promise<string> {
  if (!ai) {
    return "Error: Gemini API key is missing or not configured in `.env.local`. Please configure `GEMINI_API_KEY` to enable the C-MAX Technical Sales Advisor chatbot.";
  }

  const systemInstruction = `You are the Panelique Technical Sales AI, an expert structural advisor for genuine C-MAX EPS construction products manufactured under Emmedue (M2) technology in Kenya. Your main job is to answer building integrity questions (thermal insulation, soundproofing, 3.5cm concrete shotcrete layers) and request the user's phone number or email to finalize formal material delivery estimates.`;

  // Map history to the SDK format
  const contents = [
    ...history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    })),
    {
      role: 'user',
      parts: [{ text: prompt }]
    }
  ];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I apologize, I didn't receive a response. Please try again.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Error: Failed to connect to Gemini API. Details: ${error?.message || error}`;
  }
}
