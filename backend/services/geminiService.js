// services/geminiService.js

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateGeminiResponse = async (input) => {
  try {
    let contents;
    let systemInstruction = "";

    if (typeof input === "string") {
      contents = input;
    } else if (Array.isArray(input)) {
      const systemMessage = input.find(
        (message) => message.role === "system"
      );

      systemInstruction = systemMessage?.content || "";

      contents = input
        .filter((message) => message.role !== "system")
        .map((message) => ({
          role: message.role === "assistant" ? "model" : "user",
          parts: [
            {
              text: message.content || "",
            },
          ],
        }));
    } else {
      throw new Error("Invalid input format for Gemini");
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      systemInstruction,
      contents,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error.message);
    throw error;
  }
};

module.exports = {
  generateGeminiResponse,
};