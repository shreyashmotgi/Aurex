import axiosInstance from "./axios";

export const getFunds = async () => {
  const response = await axiosInstance.get("/funds");
  return response.data.funds;
};