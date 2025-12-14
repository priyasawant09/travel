import { GoogleGenAI, Type } from "@google/genai";
import { ItineraryDay } from "../types";

// Initialize Gemini AI
// NOTE: In a real production app, key management should be server-side or secure.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateItinerary = async (
  destination: string,
  days: number,
  theme: string
): Promise<ItineraryDay[]> => {
  try {
    const prompt = `Create a ${days}-day travel itinerary for ${destination} focused on ${theme}. 
    Focus on hidden gems, cultural experiences, and local food.
    Return a JSON array of days, where each day has a list of items (activities).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.INTEGER },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    time: { type: Type.STRING },
                    activity: { type: Type.STRING },
                    location: { type: Type.STRING },
                    type: { type: Type.STRING, enum: ['food', 'culture', 'adventure', 'relax'] }
                  },
                  required: ['time', 'activity', 'type', 'location']
                }
              }
            },
            required: ['day', 'items']
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ItineraryDay[];
    }
    return [];
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return [];
  }
};

export const getDestinationInsights = async (destination: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide a short, engaging summary of "Hidden Gems" and "Cultural Etiquette" for ${destination}. Keep it under 150 words.`,
    });
    return response.text || "Could not load insights.";
  } catch (error) {
    console.error("Error fetching insights:", error);
    return "Insights currently unavailable.";
  }
};