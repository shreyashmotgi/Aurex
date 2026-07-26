import api from "./axios";

export const getWatchlist = async () => {
  const response = await api.get("/market");
  return response.data.stocks;
};

export const getStockById = async (stockId) => {
  const response = await api.get(`/market/id/${stockId}`);
  return response.data.stock;
};