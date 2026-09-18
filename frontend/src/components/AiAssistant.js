import React, { useState } from "react";
import { getAIAssistant } from "../api/aiApi";
import "./AiAssistant.css";
import ReactMarkdown from "react-markdown";

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const data = await getAIAssistant(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (error) {
      const status = error.response?.status;
      const errorCode = error.response?.data?.code;
      const backendMessage = error.response?.data?.message;

      let errorMessage;

      if (errorCode === "AI_DAILY_LIMIT") {
        errorMessage =
          backendMessage ||
          "Aurex AI has reached today's free usage limit. Please try again tomorrow.";
      } else if (
        errorCode === "AI_RATE_LIMIT" ||
        status === 429
      ) {
        errorMessage =
          backendMessage ||
          "Aurex AI is temporarily busy. Please try again in a few moments.";
      } else if (
        errorCode === "AI_SERVER_ERROR" ||
        status >= 500
      ) {
        errorMessage =
          backendMessage ||
          "Aurex AI is temporarily unavailable. Please try again in a few moments.";
      } else {
        errorMessage =
          backendMessage ||
          "Something went wrong while processing your request.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className="ai-floating-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Aurex AI"
        >
          🤖
        </button>
      )}

      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div>
              <strong>Aurex AI</strong>
              <small>Your personal trading assistant</small>
            </div>

            <button
              className="ai-clear-button"
              onClick={() => setMessages([])}
            >
              Clear
            </button>

            <button
              className="ai-close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Aurex AI"
            >
              ×
            </button>
          </div>

          <div className="ai-chat-body">
            {messages.length === 0 && (
              <div className="ai-welcome-message">
                Hello! 👋
                <br />
                How can I help you with your stocks today?
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`ai-message ${
                  msg.role === "user"
                    ? "ai-user-message"
                    : "ai-bot-message"
                } ${msg.isError ? "ai-error-message" : ""}`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            ))}

            {loading && (
              <div className="ai-message ai-bot-message">
                Aurex AI is thinking...
              </div>
            )}
          </div>

          <div className="ai-chat-input-area">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Ask Aurex AI..."
              disabled={loading}
            />

            <button onClick={handleSend} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;