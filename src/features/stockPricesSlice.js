import { createSlice } from '@reduxjs/toolkit';

const stockPricesSlice = createSlice({
    name: 'stockPrices',
    initialState: {},
    reducers: {
   
        updateStockPrice: (state, action) => {
            const { symbol, currentPrice } = action.payload;
            state[symbol] = currentPrice; 
        },
    
        initializeStockPrices: (state, action) => {
            const { initialPrices } = action.payload;
            return { ...state, ...initialPrices }; 
        },
    },
});


export const { updateStockPrice, initializeStockPrices } = stockPricesSlice.actions;
export default stockPricesSlice.reducer;
