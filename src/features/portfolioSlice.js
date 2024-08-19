import { createSlice } from '@reduxjs/toolkit';

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState: {
        holdings: [],
    },
    reducers: {
        addStock: (state, action) => {
            const newStock = action.payload;
            const existingStock = state.holdings.find(stock => stock.symbol === newStock.symbol);
            if (existingStock) {
                existingStock.quantity += newStock.quantity;
                existingStock.totalInvested += newStock.buyPrice * newStock.quantity;
                existingStock.buyPrice = newStock.buyPrice; // Update buyPrice
            } else {
                state.holdings.push({
                    ...newStock,
                    totalInvested: newStock.buyPrice * newStock.quantity
                });
            }
        },
        removeStock: (state, action) => {
            const { symbol, quantity } = action.payload;
            const existingStock = state.holdings.find(stock => stock.symbol === symbol);
            if (existingStock) {
                existingStock.quantity -= quantity;
                if (existingStock.quantity <= 0) {
                    state.holdings = state.holdings.filter(stock => stock.symbol !== symbol);
                } else {
                    existingStock.totalInvested = existingStock.buyPrice * existingStock.quantity;
                }
            }
        },
        updateStockPrice: (state, action) => {
            const { symbol, currentPrice } = action.payload;
            const stock = state.holdings.find(stock => stock.symbol === symbol);
            if (stock) {
                stock.currentPrice = currentPrice;
            }
        },
        updateStockQuantity: (state, action) => {
            const { symbol, quantity } = action.payload;
            const stock = state.holdings.find(stock => stock.symbol === symbol);
            if (stock) {
                stock.quantity = quantity;
                stock.totalInvested = stock.buyPrice * stock.quantity;
            }
        },
        updateBuyPrice: (state, action) => {
            const { symbol, buyPrice } = action.payload;
            const stock = state.holdings.find(stock => stock.symbol === symbol);
            if (stock) {
                stock.buyPrice = buyPrice;
                stock.totalInvested = buyPrice * stock.quantity;
            }
        },
        sellStock: (state, action) => {
            const { symbol, quantity } = action.payload;
            const existingStock = state.holdings.find(stock => stock.symbol === symbol);
            if (existingStock) {
                existingStock.quantity -= quantity;
                if (existingStock.quantity <= 0) {
                    state.holdings = state.holdings.filter(stock => stock.symbol !== symbol);
                } else {
                    existingStock.totalInvested = existingStock.buyPrice * existingStock.quantity;
                }
            }
        },
        exitAllStocks: (state) => {
            state.holdings = [];
        }
    },
});

export const {
    addStock,
    removeStock,
    updateStockPrice,
    updateStockQuantity,
    updateBuyPrice,
    sellStock,
    exitAllStocks
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
