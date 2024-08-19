// features/balanceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = 0; 

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    // Deduct amount when buying stocks
    buyStock(state, action) {
      return state - action.payload; // Subtract the purchase amount from the balance
    },
    // Add amount when selling stocks
    sellStock(state, action) {
      return state + action.payload; // Add the sale amount to the balance
    },
    // Increase balance by the amount added (e.g., from deposits)
    addBalance(state, action) {
      return state + action.payload;
    },
  },
});

export const { buyStock, sellStock, addBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
