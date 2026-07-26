import api from "./axios";

export const getStockHistory = async (
  stockId,
  interval = "1m"
) => {
  const response = await api.get(
    `/history/${stockId}?interval=${interval}`
  );

  return response.data.history;
};