const axios = require("axios");

const generateAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "inclusionai/ling-3.0-flash-fin:free",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);

    throw new Error("AI service unavailable");
  }
};

const generateAssistantResponse = async (
  messages,
  tools,
  model = "inclusionai/ling-3.0-flash-sante:free",
) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model,
        messages,
        tools,
        tool_choice: "auto",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      },
    );

    const assistantMessage = response.data.choices[0].message;

    // Treat a completely empty response as an error.
    if (
      !assistantMessage.content &&
      !assistantMessage.tool_calls?.length
    ) {
      const err = new Error("Empty response from model");
      err.isEmptyResponse = true;
      throw err;
    }

    return assistantMessage;
  } catch (error) {
    const status = error.response?.status;
    const apiError = error.response?.data?.error;

    console.error(
      "OpenRouter Assistant Error:",
      JSON.stringify(error.response?.data, null, 2) ||
        error.message,
    );

    console.error("Status:", status);
    console.error(
      "Retry-After:",
      error.response?.headers?.["retry-after"],
    );

    // Daily free-model quota exceeded
    if (
      status === 429 &&
      apiError?.metadata?.limit_source ===
        "openrouter_free_tier_daily"
    ) {
      const err = new Error(
        "Aurex AI has reached its daily free-model limit.",
      );

      err.code = "AI_DAILY_LIMIT";
      err.statusCode = 429;
      throw err;
    }

    // Other rate-limit errors
    if (status === 429) {
      const err = new Error(
        "Aurex AI is temporarily busy.",
      );

      err.code = "AI_RATE_LIMIT";
      err.statusCode = 429;
      throw err;
    }

    // OpenRouter/server/provider error
    if (status >= 500 || !status) {
      const err = new Error(
        "Aurex AI is temporarily unavailable.",
      );

      err.code = "AI_SERVER_ERROR";
      err.statusCode = 503;
      throw err;
    }

    // Preserve the original error for all other cases
    throw error;
  }
};

module.exports = {
  generateAIResponse,
  generateAssistantResponse,
};
