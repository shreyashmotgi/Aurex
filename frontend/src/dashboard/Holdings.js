import React, { useEffect, useState } from "react";

import { getHoldings } from "../api/holdingsApi";

import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const data = await getHoldings();
        setHoldings(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHoldings();

    const interval = setInterval(fetchHoldings, 5000);

    return () => clearInterval(interval);
  }, []);

  const graphData = {
    labels: holdings.map((stock) => stock.instrument),

    datasets: [
      {
        label: "Current Value",

        data: holdings.map((stock) => stock.currentValue),

        backgroundColor: "rgba(54,162,235,0.5)",
      },
    ],
  };

  const totalInvestment = holdings.reduce(
    (sum, stock) => sum + stock.averagePrice * stock.quantity,
    0,
  );

  const totalCurrentValue = holdings.reduce(
    (sum, stock) => sum + stock.currentValue,
    0,
  );

  const totalPnL = totalCurrentValue - totalInvestment;

  const pnlPercent =
    totalInvestment === 0 ? 0 : (totalPnL / totalInvestment) * 100;

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. Cost</th>
              <th>Investment</th>
              <th>LTP</th>
              <th>Current Value</th>
              <th>P&amp;L / Share</th>
              <th>Total P&amp;L</th>
              <th>Net Chg.</th>
              <th>Day Chg.</th>
            </tr>
          </thead>

          <tbody>
            {holdings.map((stock) => {
              const investment = stock.averagePrice * stock.quantity;

              const pnlPerShare = stock.ltp - stock.averagePrice;

              const pnlClass = stock.pnl >= 0 ? "profit" : "loss";

              const dayClass = stock.dayChange >= 0 ? "profit" : "loss";

              return (
                <tr key={stock.stockId}>
                  <td>{stock.instrument}</td>

                  <td>{stock.quantity}</td>

                  <td>₹{stock.averagePrice.toFixed(2)}</td>

                  <td>₹{investment.toFixed(2)}</td>

                  <td>₹{stock.ltp.toFixed(2)}</td>

                  <td>₹{stock.currentValue.toFixed(2)}</td>

                  <td className={pnlClass}>
                    {pnlPerShare >= 0 ? "+" : ""}₹{pnlPerShare.toFixed(2)}
                  </td>

                  <td className={pnlClass}>
                    {stock.pnl >= 0 ? "+" : ""}₹{stock.pnl.toFixed(2)}
                  </td>

                  <td className={pnlClass}>
                    {stock.netChange >= 0 ? "+" : ""}
                    {stock.netChange.toFixed(2)}%
                  </td>

                  <td className={dayClass}>
                    {stock.dayChange >= 0 ? "+" : ""}
                    {stock.dayChange.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="dashboard-col">
          <h5>₹{totalInvestment.toFixed(2)}</h5>

          <p>Total investment</p>
        </div>

        <div className="dashboard-col">
          <h5>₹{totalCurrentValue.toFixed(2)}</h5>

          <p>Current value</p>
        </div>

        <div className="dashboard-col">
          <h5 className={totalPnL >= 0 ? "profit" : "loss"}>
            ₹{totalPnL.toFixed(2)}
            {" ("}
            {pnlPercent.toFixed(2)}%)
          </h5>

          <p>P&amp;L</p>
        </div>
      </div>

      <VerticalGraph data={graphData} />
    </>
  );
};

export default Holdings;
