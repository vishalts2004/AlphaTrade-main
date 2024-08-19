import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './features/portfolioSlice';

const store = configureStore({
    reducer: {
        portfolio: portfolioReducer,
    },
});

export default store;
