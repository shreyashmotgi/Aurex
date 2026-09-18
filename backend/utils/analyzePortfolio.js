const analyzePortfolio = (holdings) => {
  if (!holdings || holdings.length === 0) {
    return null;
  }

  let totalInvestment = 0;
  let currentValue = 0;
  let totalPnL = 0;

  let bestPerformer = null;
  let worstPerformer = null;

  holdings.forEach((holding) => {
    const investment =
      holding.quantity * holding.averagePrice;

    totalInvestment += investment;
    currentValue += holding.currentValue;
    totalPnL += holding.pnl;

    if (
      !bestPerformer ||
      holding.netChangePercent > bestPerformer.netChangePercent
    ) {
      bestPerformer = holding;
    }

    if (
      !worstPerformer ||
      holding.netChangePercent < worstPerformer.netChangePercent
    ) {
      worstPerformer = holding;
    }
  });

  const pnlPercent =
    totalInvestment > 0
      ? (totalPnL / totalInvestment) * 100
      : 0;

  return {
    totalInvestment: Number(totalInvestment.toFixed(2)),

    currentValue: Number(currentValue.toFixed(2)),

    totalPnL: Number(totalPnL.toFixed(2)),

    pnlPercent: Number(pnlPercent.toFixed(2)),

    totalHoldings: holdings.length,

    bestPerformer: bestPerformer
      ? {
          stockName: bestPerformer.instrument,
          netChangePercent: Number(
            bestPerformer.netChangePercent.toFixed(2)
          ),
        }
      : null,

    worstPerformer: worstPerformer
      ? {
          stockName: worstPerformer.instrument,
          netChangePercent: Number(
            worstPerformer.netChangePercent.toFixed(2)
          ),
        }
      : null,
  };
};

module.exports = {
  analyzePortfolio,
};