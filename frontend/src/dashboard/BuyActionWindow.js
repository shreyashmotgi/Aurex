import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import GeneralContext from "../contexts/GeneralContext";

import { placeOrder } from "../api/orderApi";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ stock }) => {

  const { closeBuyWindow } = useContext(GeneralContext);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  const handleBuyClick = async () => {

    try {

      setLoading(true);

      await placeOrder({

        stockId: stock._id,

        quantity: Number(quantity),

        orderType: "BUY",

        product: "CNC",

      });

      toast.success("Order placed successfully");

      closeBuyWindow();

    } catch (err) {

      toast.error(err.response?.data?.message || "Unable to place order");

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
          <strong> ₹ {stock.price}</strong>
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
          Margin Required ₹
          {(stock.price * quantity).toFixed(2)}
        </span>

        <div>

          <button
            className="buy"
            onClick={handleBuyClick}
            disabled={loading}
          >
            {loading ? "Buying..." : "Buy"}
          </button>

          <button
            className="buy-btn btn-grey"
            onClick={closeBuyWindow}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default BuyActionWindow;