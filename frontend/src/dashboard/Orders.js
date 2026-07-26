import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { getOrders } from "../api/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>

          <Link to="/dashboard" className="dashboard-btn">
            Buy Stocks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">
        Orders ({orders.length})
      </h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Product</th>
              <th>Instrument</th>
              <th>Type</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {new Date(order.createdAt).toLocaleString()}
                </td>

                <td>{order.product}</td>

                <td>{order.stockName}</td>

                <td
                  className={
                    order.orderType === "BUY"
                      ? "profit"
                      : "loss"
                  }
                >
                  {order.orderType}
                </td>

                <td>{order.quantity}</td>

                <td>
                  ₹{order.price.toFixed(2)}
                </td>

                <td>
                  ₹{order.totalAmount.toFixed(2)}
                </td>

                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;