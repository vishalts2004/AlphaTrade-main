// store.js
import { configureStore } from '@reduxjs/toolkit';
import balanceReducer from './features/balanceSlice';
import portfolioReducer from './features/portfolioSlice';
import stockPricesReducer from './features/stockPricesSlice';

const store = configureStore({
  reducer: {
    balance: balanceReducer,
    portfolio: portfolioReducer,
    stockPrices: stockPricesReducer,
  },
});

export default store;
