import api from "./axios";

export const getAIStockAnalysis = async (stockId) => {
  const response = await api.get(`/ai/stock-analysis/${stockId}`);
  return response.data;
};

export const getAIAssistant = async (message) => {
  const response = await api.post("/ai/assistant", { message });
  return response.data;
};
