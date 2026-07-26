import axiosInstance from "./axios";

export const getSummary = async () => {
  const response = await axiosInstance.get("/summary");
  return response.data.summary;
};