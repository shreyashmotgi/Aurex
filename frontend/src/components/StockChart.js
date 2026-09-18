import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

import { getStockHistory } from "../api/historyApi";

const normalizeCandles = (history) => {
  const candleMap = new Map();

  history.forEach((candle) => {
    if (
      candle.time == null ||
      candle.open == null ||
      candle.high == null ||
      candle.low == null ||
      candle.close == null
    ) {
      return;
    }

    const normalizedCandle = {
      time: Number(candle.time),
      open: Number(candle.open),
      high: Number(candle.high),
      low: Number(candle.low),
      close: Number(candle.close),
    };

    candleMap.set(normalizedCandle.time, normalizedCandle);
  });

  return Array.from(candleMap.values()).sort(
    (a, b) => a.time - b.time
  );
};

function StockChart({ stockId, interval, onStatsChange }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);

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
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!stockId) return;

    let mounted = true;

    const loadHistory = async (initial = false) => {
      try {
        const rawHistory = await getStockHistory(stockId, interval);

        if (!mounted || !rawHistory.length) return;

        const history = normalizeCandles(rawHistory);

        if (!history.length) return;

        if (initial) {
          candleSeriesRef.current.setData(history);
          chartRef.current.timeScale().fitContent();
        } else {
          const latestCandle = history[history.length - 1];

          candleSeriesRef.current.update(latestCandle);
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