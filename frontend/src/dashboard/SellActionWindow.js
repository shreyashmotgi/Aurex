import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { placeOrder } from "../api/orderApi";
import GeneralContext from "../contexts/GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ stock }) => {
  const { closeSellWindow } = useContext(GeneralContext);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSellClick = async () => {
    try {
      setLoading(true);

      await placeOrder({
        stockId: stock._id,
        quantity: Number(quantity),
        orderType: "SELL",
        product: "CNC",
      });

      toast.success("Sell Order Placed Successfully");

      closeSellWindow();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to place sell order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="buy-container"
      id="buy-window"
    >
      <div className="regular-order">

        <h5>{stock.name}</h5>

        <p>
          Current Price :
          <strong> ₹{stock.price.toFixed(2)}</strong>
        </p>

        <div className="inputs">

          <fieldset>
            <legend>Qty</legend>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
            />
          </fieldset>

          <fieldset>
            <legend>Total</legend>

            <input
              disabled
              value={(stock.price * quantity).toFixed(2)}
            />
          </fieldset>

        </div>

      </div>

      <div className="buttons">

        <span>
          Amount You'll Receive ₹
          {(stock.price * quantity).toFixed(2)}
        </span>

        <div>

          <button
            className="sell"
            onClick={handleSellClick}
            disabled={loading}
          >
            {loading ? "Selling..." : "Sell"}
          </button>

          <button
            className="buy-btn btn-grey"
            onClick={closeSellWindow}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
};

export default SellActionWindow;