const { StockHistorymodel } = require("../models/StockHistorymodel");
const Conversation = require("../models/ConversationModel");
const { analyzeStockHistory } = require("../utils/analyzeStockHistory");
const {
  generateAIResponse,
  generateAssistantResponse,
} = require("../services/openrouterService");
const { generateAIWithFallback } = require("../services/aiProviderService");
const { getUserHoldings } = require("../services/holdingsService");
const { analyzePortfolio } = require("../utils/analyzePortfolio");
const {
  getPortfolioSummary,
  getStockPrice,
  getStockAnalysis,
} = require("../services/aiTools");

const getAIStockAnalysis = async (req, res) => {
  try {
    const { stockId } = req.params;

    if (!stockId) {
      return res.status(400).json({
        success: false,
        message: "Stock ID is required",
      });
    }

    // Get stock history
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);

    const history = await StockHistorymodel.find({
      stockId,
      candleTime: { $gte: startDate },
    }).sort({ candleTime: 1 });

    if (!history || history.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No stock history found",
      });
    }

    // Analyze stock history
    const analysis = analyzeStockHistory(history);

    // Create AI prompt
    const prompt = `
You are Aurex AI, a simple and helpful stock analysis assistant.

Analyze the provided stock analysis and give the user a very short,
easy-to-understand summary.

Rules:
- Respond with ONLY ONE paragraph.
- Keep it to 3-4 sentences.
- Mention the current price.
- Mention the overall price movement.
- Mention the recent trend.
- Mention volatility only when relevant.
- Do NOT mention exact SMA20 or SMA50 values.
- Do NOT mention technical indicator names unless necessary.
- Do NOT list metrics or statistics.
- Do NOT explain how the calculations were performed.
- Do NOT make predictions.
- Do NOT recommend buying, selling, or holding.
- Do NOT assume reasons for price movements.
- Do NOT mention news or external factors.
- Do not invent information.
- Write naturally for a normal user, not a technical trader.
- All currency values are in Indian Rupees. Always use the ₹ symbol, never $.
- If trend and recentMomentum point in different directions, explain the nuance clearly (e.g., "up X% overall, but recent trading has turned downward") rather than presenting them as a plain contradiction.
- Always state which timeframe the analysis covers.

Stock Analysis:
Timeframe: Today
Current Price: ${analysis.currentPrice}
Starting Price: ${analysis.startingPrice}
Price Change: ${analysis.priceChange}
Price Change Percent: ${analysis.priceChangePercent}%
Trend: ${analysis.trend}
Volatility: ${analysis.volatility}
SMA20: ${analysis.sma20}
SMA50: ${analysis.sma50}
SMA Signal: ${analysis.smaSignal}

Write only the final 3-4 sentence summary.
`;
    const aiResult = await generateAIWithFallback(prompt);

    console.log(aiResult);

    return res.status(200).json({
      success: true,
      analysis,
      aiResponse: aiResult.response,
      provider: aiResult.provider,
    });
  } catch (error) {
    console.error("AI Stock Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI stock analysis",
      error: error.message,
    });
  }
};

const getAIPortfolioAnalysis = async (req, res) => {
  try {
    // Get logged-in user's ID from JWT
    const userId = req.user.id;

    // Get user's holdings with current market data
    const holdings = await getUserHoldings(userId);

    if (!holdings || holdings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No holdings found",
      });
    }

    // Analyze portfolio
    const analysis = analyzePortfolio(holdings);

    // Create AI prompt
    const prompt = `
You are Aurex AI, a simple and helpful portfolio analysis assistant.

Analyze the provided portfolio analysis and give the user a very short,
easy-to-understand summary.

Rules:
- Respond with ONLY ONE paragraph.
- Keep it to 3-4 sentences.
- Mention the total investment.
- Mention the current portfolio value.
- Mention the overall profit or loss.
- Mention the best performer when relevant.
- Mention the worst performer when relevant.
- Do NOT make predictions.
- Do NOT recommend buying, selling, or holding.
- Do NOT provide financial advice.
- Do NOT assume reasons for gains or losses.
- Do NOT mention news or external factors.
- Do not invent information.
- Write naturally for a normal user.
- All currency values are in Indian Rupees. Always use the ₹ symbol, never $.

Portfolio Analysis:
Total Investment: ${analysis.totalInvestment}
Current Value: ${analysis.currentValue}
Total P&L: ${analysis.totalPnL}
P&L Percentage: ${analysis.pnlPercent}%
Total Holdings: ${analysis.totalHoldings}

Best Performer:
${
  analysis.bestPerformer
    ? `${analysis.bestPerformer.stockName} (${analysis.bestPerformer.netChange}%)`
    : "None"
}

Worst Performer:
${
  analysis.worstPerformer
    ? `${analysis.worstPerformer.stockName} (${analysis.worstPerformer.netChange}%)`
    : "None"
}

Write only the final 3-4 sentence summary.
`;

    // Send to Ollama
    const aiResult = await generateAIWithFallback(prompt);
    console.log(aiResult);

    return res.status(200).json({
      success: true,
      analysis,
      aiResponse: aiResult.response,
      provider: aiResult.provider,
    });
  } catch (error) {
    console.error("AI Portfolio Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI portfolio analysis",
      error: error.message,
    });
  }
};

const toolFunctions = {
  getPortfolioSummary: async (args, req) => {
    return await getPortfolioSummary(req.user.id);
  },
  getStockPrice: async (args, req) => {
    return await getStockPrice(args.stockSymbol);
  },
  getStockAnalysis: async (args, req) => {
    return await getStockAnalysis(args.stockSymbol, args.timeframe);
  },
};

const getAIAssistant = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const tools = [
      {
        type: "function",
        function: {
          name: "getPortfolioSummary",
          description:
            "Get the logged-in user's portfolio summary including investment, current value, profit or loss, and best and worst performers.",
          parameters: {
            type: "object",
            properties: {},
            required: [],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "getStockPrice",
          description:
            "Get the current price of a stock using its stock symbol.",
          parameters: {
            type: "object",
            properties: {
              stockSymbol: {
                type: "string",
                description: "The stock symbol, for example TCS or INFY.",
              },
            },
            required: ["stockSymbol"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "getStockAnalysis",
          description:
            "Analyze a stock's price movement, trend, and volatility over a specific time window. Always pass a timeframe based on what the user asked for (e.g. 'show me today's TCS movement' -> today, 'last 2 days' -> 2d). If the user doesn't specify a timeframe, default to 'today'.",
          parameters: {
            type: "object",
            properties: {
              stockSymbol: {
                type: "string",
                description: "The stock symbol, for example TCS or INFY.",
              },
              timeframe: {
                type: "string",
                enum: ["30m", "1h", "3h", "today", "2d", "3d", "7d"],
                description:
                  "The time window to analyze. Defaults to 'today' if not specified.",
              },
            },
            required: ["stockSymbol"],
          },
        },
      },
    ];

    const conversation = await Conversation.findOne({
      userId: req.user.id,
    });

    const previousMessages = conversation
      ? conversation.messages.slice(-20).map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))
      : [];

    let messages = [
      {
        role: "system",
        content: `
You are Aurex AI, a helpful assistant for the user's stock trading portfolio.

Rules:
- Use tools whenever the user asks for current Aurex data.
- Only use information returned by tools.
- Never invent or infer facts that are not returned by tools.
- Currency values must use ₹.
- Percentage changes must use %.
- Keep responses concise and factual.
- Do not give financial advice.
- Do not give buy, sell, hold, or rebalancing recommendations.
- Do not make predictions.
- Do not invent reasons for stock movements.
- Do not mention information that is not provided by the tool result.
- When multiple tools are used, combine their results naturally.
- Do not add conclusions or commentary unless directly supported by the tool results.
- When reporting a stock's trend, volatility, or price change, always explicitly state which time window it covers (e.g., "today," "over the last 2 days") using the timeframe returned by the tool. Never describe a change without saying what period it's measured over.
`,
      },
      ...previousMessages,
      {
        role: "user",
        content: message,
      },
    ];

    const MAX_ITERATIONS = 5;

    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const assistantMessage = await generateAssistantResponse(messages, tools);

      // No tool required → final answer
      if (!assistantMessage.tool_calls?.length) {
        const finalResponse =
          assistantMessage.content || "Unable to generate a response.";

        if (!conversation) {
          await Conversation.create({
            userId: req.user.id,
            messages: [
              {
                role: "user",
                content: message,
              },
              {
                role: "assistant",
                content: finalResponse,
              },
            ],
          });
        } else {
          conversation.messages.push(
            {
              role: "user",
              content: message,
            },
            {
              role: "assistant",
              content: finalResponse,
            },
          );

          await conversation.save();
        }

        return res.status(200).json({
          success: true,
          response: finalResponse,
        });
      }

      // Add the assistant's tool-call message to conversation
      messages.push(assistantMessage);

      // Execute every requested tool
      for (const toolCall of assistantMessage.tool_calls) {
        const toolName = toolCall.function.name;
        const toolFunction = toolFunctions[toolName];

        if (!toolFunction) {
          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify({
              success: false,
              message: "Unknown tool",
            }),
          });
          continue;
        }

        let args = {};
        try {
          args = JSON.parse(toolCall.function.arguments || "{}");
        } catch (error) {
          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify({
              success: false,
              message: "Invalid tool arguments",
            }),
          });
          continue;
        }

        const toolResult = await toolFunction(args, req);

        // Send tool result back to the LLM
        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult),
        });
      }
    }

    // Agent exceeded maximum iterations
    return res.status(500).json({
      success: false,
      message: "Assistant reached the maximum tool-call limit",
    });
  } catch (error) {
    if (error.code === "AI_DAILY_LIMIT") {
      return res.status(429).json({
        success: false,
        message:
          "Aurex AI has reached today's free usage limit. Please try again tomorrow.",
      });
    }

    if (error.code === "AI_RATE_LIMIT" || error.code === "AI_SERVER_ERROR") {
      return res.status(error.statusCode || 503).json({
        success: false,
        message:
          "Aurex AI is temporarily unavailable. Please try again in a few moments.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while processing your request.",
    });
  }
};

module.exports = {
  getAIStockAnalysis,
  getAIPortfolioAnalysis,
  getAIAssistant,
};
