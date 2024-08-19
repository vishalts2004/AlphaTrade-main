// utils/stockPriceSimulator.js
export const generateRandomStockPrice = (currentPrice) => {
  const volatility = 0.02; // 2% volatility
  const changePercent = 2 * volatility * Math.random() - volatility;
  return currentPrice * (1 + changePercent);
};