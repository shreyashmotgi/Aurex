import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

import WatchListActions from "./WatchListActions";

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  const change = stock.price - stock.previousPrice;

  const percent = ((change / stock.previousPrice) * 100).toFixed(2);

  const isDown = change < 0;

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className="item"
        onClick={() => {
          console.log("Clicked", stock._id);
          navigate(`/dashboard/stocks/${stock._id}`);
        }}
      >
        <p className={isDown ? "down" : "up"}>{stock.name}</p>

        <div className="itemInfo">
          <span className={isDown ? "down" : "up"}>
            {isDown ? "" : "+"}
            {percent}%
          </span>

          {isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          <span className="price">₹{stock.price.toFixed(2)}</span>
        </div>
      </div>

      {showActions && <WatchListActions stock={stock} />}
    </li>
  );
};

export default WatchListItem;
