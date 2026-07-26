import React, { useState, useEffect } from "react";
import { getWatchlist } from "../../api/watchlistApi";
import WatchListItem from "./WatchListItem";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [stocks, setStocks] = useState([]);

useEffect(() => {

  const fetchWatchlist = async () => {
    try {
      const data = await getWatchlist();
      setStocks(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchWatchlist();

  const interval = setInterval(() => {
    fetchWatchlist();
  }, 5000);

  return () => clearInterval(interval);

}, []);

  const data = {
    labels: stocks.map((stock) => stock.name),
    datasets: [
      {
        label: "Stock Price",
        data: stocks.map((stock) => stock.price),
         backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <ul className="list">
        {stocks.map((stock) => (
          <WatchListItem key={stock.name} stock={stock} />
        ))}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;



