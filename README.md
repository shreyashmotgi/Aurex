## Aurex 📈

A full-stack stock trading platform with a custom real-time market simulation engine and an AI trading assistant.

**Live demo:** [https://aurex111-nine.vercel.app/]

### Features

- **Trading Platform** — portfolio tracking, order management, watchlist, funds, and transaction history
- **Market Simulation Engine** — custom real-time OHLC candlestick generator using a mean-reverting price model, so simulated stocks trend realistically without drifting to unrealistic extremes
- **Charts** — dynamic candlestick charts supporting multiple timeframes
- **AI Trading Assistant** — LLM function-calling (OpenRouter) for natural-language portfolio queries and stock lookups, with Gemini-powered trend/volatility analysis across configurable time windows (same-day to 7-day)
- **Reliability** — multi-provider AI fallback and in-loop retry logic to handle free-tier rate limits, with strict prompt grounding to prevent hallucinated financial data
- **Auth** — Email/Password, Google OAuth, JWT, email verification, password recovery

### Tech Stack

**Frontend:** React.js, Bootstrap
**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT
**AI:** OpenRouter (function-calling), Gemini API
**Deployment:** Render, Vercel

### Setup

```
git clone <repo-url>
cd aurex/backend
npm install
```

Create a `.env` file with:
```
MONGO_URL=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
OPENROUTER_API_KEY=
GEMINI_API_KEY=
```

```
node server.js
```

Frontend:
```
cd aurex/frontend
npm install
npm start
```

### Notable design decisions

- AI responses are strictly grounded in tool/function results — the assistant never invents prices or portfolio figures.
- The market simulator uses a soft price band with mean reversion, so prices can trend freely within a realistic range but can't drift indefinitely.
- AI reliability is handled with multi-provider fallback rather than depending on a single LLM provider.
