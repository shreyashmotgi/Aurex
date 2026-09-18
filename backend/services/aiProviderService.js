const { generateGeminiResponse } = require("./geminiService");
const {
  generateAIResponse: generateOpenRouterResponse,
} = require("./openrouterService");

const isFallbackError = (error) => {
  const status =
    error?.status ||
    error?.code ||
    error?.response?.status;

  const message = (
    error?.message ||
    error?.response?.data?.error?.message ||
    ""
  ).toLowerCase();

  return (
    status === 429 ||
    status === 500 ||
    status === 503 ||
    status === "UNAVAILABLE" ||
    status === "RESOURCE_EXHAUSTED" ||
    message.includes("quota") ||
    message.includes("rate limit") ||
    message.includes("resource_exhausted") ||
    message.includes("unavailable") ||
    message.includes("high demand")
  );
};

const generateAIWithFallback = async (prompt) => {
  try {
    console.log("Trying Gemini...");

    const response = await generateGeminiResponse(prompt);

    console.log("Gemini response received successfully.");

    return {
      provider: "gemini",
      response,
    };
  } catch (geminiError) {
    console.error("Gemini failed:", geminiError.message);

    if (!isFallbackError(geminiError)) {
      throw geminiError;
    }

    console.log("Gemini unavailable. Switching to OpenRouter...");

    try {
      const response = await generateOpenRouterResponse(prompt);

      console.log("OpenRouter response received successfully.");

      return {
        provider: "openrouter",
        response,
      };
    } catch (openRouterError) {
      console.error(
        "OpenRouter also failed:",
        openRouterError.response?.data || openRouterError.message
      );

      throw openRouterError;
    }
  }
};

module.exports = {
  generateAIWithFallback,
};