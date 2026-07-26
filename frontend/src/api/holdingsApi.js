import axiosInstance from "./axios";

export const getHoldings = async () => {
  const response = await axiosInstance.get("/holdings");
  return response.data.holdings;
};