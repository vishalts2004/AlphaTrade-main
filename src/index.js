import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import balanceReducer from './features/balanceSlice';
import portfolioReducer from './features/portfolioSlice';
import stockPricesReducer from './features/stockPricesSlice';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

const store = configureStore({
    reducer: {
        balance: balanceReducer,
        portfolio: portfolioReducer,
        stockPrices: stockPricesReducer,
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);
