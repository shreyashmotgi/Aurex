import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStockById } from "../api/watchlistApi";

import StockChart from "../components/StockChart";

function StockDetails() {
  const { stockId } = useParams();

  const [interval, setInterval] = useState("1m");
  const [stock, setStock] = useState(null);
  const [stats, setStats] = useState(null);

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

  return (
    <div className="container p-4">

      <h2>{stock?.name}</h2>

      <div className="d-flex flex-wrap gap-4 mb-3">

        <div>
          <small>Current</small>
          <h5>₹{stats?.latest?.close?.toFixed(2)}</h5>
        </div>

        <div>
          <small>Open</small>
          <h5>₹{stats?.latest?.open?.toFixed(2)}</h5>
        </div>

        <div>
          <small>High</small>
          <h5 style={{ color: "green" }}>
            ₹{stats?.highest?.toFixed(2)}
          </h5>
        </div>

        <div>
          <small>Low</small>
          <h5 style={{ color: "red" }}>
            ₹{stats?.lowest?.toFixed(2)}
          </h5>
        </div>

        <div>
          <small>Close</small>
          <h5>
            ₹{stats?.latest?.close?.toFixed(2)}
          </h5>
        </div>

      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 15,
        }}
      >

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

    </div>
  );
}

export default StockDetails;