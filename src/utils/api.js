export const fetchStockPrices = () => {
  // Simulate an API call to fetch stock prices
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { symbol: 'AAPL', price: Math.random() * 200 + 100 },
        { symbol: 'MSFT', price: Math.random() * 200 + 100 },
        { symbol: 'GOOGL', price: Math.random() * 2000 + 1000 },
      ]);
    }, 1000);
  });
};