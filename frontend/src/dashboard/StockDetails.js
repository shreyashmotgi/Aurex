import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { getStockById } from "../api/watchlistApi";
import { getAIStockAnalysis } from "../api/aiApi";

import StockChart from "../components/StockChart";

function StockDetails() {
  const { stockId } = useParams();

  const [interval, setInterval] = useState("1m");
  const [stock, setStock] = useState(null);
  const [stats, setStats] = useState(null);

  const [aiResponse, setAIResponse] = useState("");
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  // ---------------- Fetch Stock ----------------

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const data = await getStockById(stockId);
        setStock(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStock();
  }, [stockId]);

  // ---------------- Clear AI Analysis When Stock Changes ----------------

useEffect(() => {
  setAIResponse("");
  setAnalysisError("");
}, [stockId]);

  // ---------------- AI Analysis ----------------

  const handleAIAnalysis = async () => {
    try {
      setAnalysisLoading(true);
      setAnalysisError("");
      setAIResponse("");

      const data = await getAIStockAnalysis(stockId);

      setAIResponse(data.aiResponse);
    } catch (err) {
      console.log(err);

      setAnalysisError(
        err.response?.data?.message ||
          "Unable to generate stock analysis."
      );
    } finally {
      setAnalysisLoading(false);
    }
  };

  return (
    <div className="container p-4">

      {/* Stock Name */}

      <h2>{stock?.name}</h2>

      {/* Price Information */}

      <div className="d-flex flex-wrap gap-4 mb-3">

        <div>
          <small>Current</small>
          <h5>
            ₹{stats?.latest?.close?.toFixed(2) || "-"}
          </h5>
        </div>

        <div>
          <small>Open</small>
          <h5>
            ₹{stats?.latest?.open?.toFixed(2) || "-"}
          </h5>
        </div>

        <div>
          <small>High</small>
          <h5 style={{ color: "green" }}>
            ₹{stats?.highest?.toFixed(2) || "-"}
          </h5>
        </div>

        <div>
          <small>Low</small>
          <h5 style={{ color: "red" }}>
            ₹{stats?.lowest?.toFixed(2) || "-"}
          </h5>
        </div>

        <div>
          <small>Close</small>
          <h5>
            ₹{stats?.latest?.close?.toFixed(2) || "-"}
          </h5>
        </div>

      </div>

      {/* Chart */}

      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 15,
        }}
      >

        {/* Time Intervals */}

        <div className="mb-3">

          {[
            "1m",
            "5m",
            "10m",
            "15m",
            "30m",
            "1h",
            "3h",
            "6h",
            "1d",
          ].map((item) => (

            <button
              key={item}
              className={
                interval === item
                  ? "btn btn-primary btn-sm me-2"
                  : "btn btn-outline-secondary btn-sm me-2"
              }
              onClick={() => setInterval(item)}
            >
              {item}
            </button>

          ))}

        </div>

        <StockChart
          stockId={stockId}
          interval={interval}
          onStatsChange={setStats}
        />

      </div>

      {/* AI Analysis Button */}

      <div className="text-center mt-4">

        <button
          className="landing-btn px-4"
          onClick={handleAIAnalysis}
          disabled={analysisLoading}
        >
          {analysisLoading
            ? "Analyzing Stock..."
            : "✨ Analyze with Aurex AI"}
        </button>

      </div>

      {/* AI Error */}

      {analysisError && (
        <div className="alert alert-danger mt-3">
          {analysisError}
        </div>
      )}

      {/* AI Response */}

      {aiResponse && (
        <div className="card shadow-sm mt-4 p-4">

          <h4 className="mb-3">
            Aurex AI Analysis
          </h4>

          <div
            style={{
              whiteSpace: "pre-line",
              lineHeight: "1.7",
            }}
          >
            {aiResponse}
          </div>

          <hr />

          <small className="text-muted">
            This analysis is based on historical stock data
            and technical indicators. It does not predict
            future performance or constitute financial advice.
          </small>

        </div>
      )}

    </div>
  );
}

export default StockDetails;