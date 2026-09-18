import api from "./axios";

export const getHoldings = async () => {
  const response = await api.get("/holdings");
  return response.data.holdings;
};

export const getAIPortfolioAnalysis = async () => {
  const response = await api.get("/ai/portfolio-analysis");

  return response.data;
};