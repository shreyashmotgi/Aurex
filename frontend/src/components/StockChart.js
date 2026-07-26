import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

import { getStockHistory } from "../api/historyApi";

function StockChart({ stockId, interval, onStatsChange }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);

  // -------------------------
  // Create Chart
  // -------------------------

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,

      layout: {
        background: {
          color: "#ffffff",
        },
        textColor: "#333",
      },

      grid: {
        vertLines: {
          color: "#f0f3fa",
        },
        horzLines: {
          color: "#f0f3fa",
        },
      },

      crosshair: {
        mode: 1,
      },

      rightPriceScale: {
        borderVisible: false,
      },

      timeScale: {
        borderVisible: false,
      },
      watermark: {
        visible: true,
        text: "TradeX",
        color: "rgba(0, 0, 0, 0.08)",
        fontSize: 56,
        fontFamily: "Arial",
        fontStyle: "bold",
        horzAlign: "center",
        vertAlign: "center",
      },
    });

    chartRef.current = chart;

    candleSeriesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",

      borderVisible: false,

      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    const resize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
    };
  }, []);

  // -------------------------
  // Load + Live Update
  // -------------------------

  useEffect(() => {
    if (!stockId) return;

    let mounted = true;

    const loadHistory = async (initial = false) => {
      try {
        const history = await getStockHistory(stockId, interval);

        if (!mounted || !history.length) return;

        if (initial) {
          candleSeriesRef.current.setData(history);

          chartRef.current.timeScale().fitContent();
        } else {
          candleSeriesRef.current.update(history[history.length - 1]);
        }

        const highest = Math.max(...history.map((c) => c.high));

        const lowest = Math.min(...history.map((c) => c.low));

        const latest = history[history.length - 1];

        onStatsChange({
          highest,
          lowest,
          latest,
        });
      } catch (err) {
        console.log(err);
      }
    };

    loadHistory(true);

    const timer = setInterval(() => {
      loadHistory(false);
    }, 5000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [stockId, interval, onStatsChange]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: "100%",
        height: 500,
      }}
    />
  );
}

export default StockChart;
