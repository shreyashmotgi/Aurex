import React, { useEffect, useState } from "react";

import { getSummary } from "../api/summaryApi";

const Summary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getSummary();
        setSummary(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSummary();

    const interval = setInterval(fetchSummary, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!summary) {
    return <h5>Loading...</h5>;
  }

  const pnlClass =
    summary.totalPnL >= 0 ? "profit" : "loss";

  return (
    <>
      <div className="username">
        <h6>Hi, {summary.fullName}!</h6>

        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>
              ₹
              {summary.availableMargin.toFixed(2)}
            </h3>

            <p>Margin available</p>
          </div>

          <hr />

          <div className="second">

            <p>
              Opening balance

              <span>
                ₹
                {summary.openingBalance.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>
            Holdings ({summary.holdingsCount})
          </p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnlClass}>
              ₹
              {summary.totalPnL.toFixed(2)}

              <small>
                {" "}
                ({summary.pnlPercent.toFixed(2)}%)
              </small>
            </h3>

            <p>P&amp;L</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Current Value

              <span>
                ₹
                {summary.currentValue.toFixed(2)}
              </span>
            </p>

            <p>
              Investment

              <span>
                ₹
                {summary.investment.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;