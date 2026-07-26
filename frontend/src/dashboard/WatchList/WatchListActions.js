import React, { useContext } from "react";

import GeneralContext from "../../contexts/GeneralContext";

import { Tooltip, Grow } from "@mui/material";

const WatchListActions = ({ stock }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  return (
    <span className="actions" onClick={(e) => e.stopPropagation()}>
      {/* BUY */}

      <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
        <button
          className="buy"
          onClick={(e) => {
            e.stopPropagation();
            openBuyWindow(stock);
          }}
        >
          Buy
        </button>
      </Tooltip>

      {/* SELL */}

      <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
        <button
          className="sell"
          onClick={(e) => {
            e.stopPropagation();
            openSellWindow(stock);
          }}
        >
          Sell
        </button>
      </Tooltip>
    </span>
  );
};

export default WatchListActions;
