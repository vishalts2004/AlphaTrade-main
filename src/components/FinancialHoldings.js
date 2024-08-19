// src/components/FinancialHoldings.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sellStock, exitAllStocks } from '../features/portfolioSlice';
import { buyStock, sellStock as updateBalance } from '../features/balanceSlice';
import { updateStockPrice } from '../features/stockPricesSlice';
import './FinancialHoldings.css';

const FinancialHoldings = () => {
    const dispatch = useDispatch();
    const portfolio = useSelector(state => state.portfolio.holdings || []);
    const stockPrices = useSelector(state => state.stockPrices);
    const walletBalance = useSelector(state => state.balance);

    useEffect(() => {
        const interval = setInterval(() => {
            portfolio.forEach(stock => {
                const newPrice = Math.random() * 100 + 100; // Simulate price update
                dispatch(updateStockPrice({ symbol: stock.symbol, currentPrice: newPrice }));
            });
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, [portfolio, dispatch]);

    const formatCurrency = (value) => {
        return `₹${value.toFixed(2)}`;
    };

    const handleSell = (symbol) => {
        const quantity = parseInt(prompt(`Enter quantity of ${symbol} to sell:`), 10);

        if (isNaN(quantity) || quantity <= 0) {
            alert('Invalid quantity entered');
            return;
        }

        const stock = portfolio.find(stock => stock.symbol === symbol);
        if (!stock) {
            alert('Stock not found in portfolio');
            return;
        }

        if (quantity > stock.quantity) {
            alert('Insufficient quantity to sell');
            return;
        }

        const sellPrice = stockPrices[symbol] || stock.buyPrice || 0;
        const totalSaleAmount = quantity * sellPrice;

        dispatch(sellStock({ symbol, quantity }));
        dispatch(updateBalance(totalSaleAmount));  // Add the total sale amount to the wallet balance

        alert(`Sold ${quantity} shares of ${symbol} at ₹${sellPrice.toFixed(2)} each. Total Sale Amount: ₹${totalSaleAmount.toFixed(2)}`);
    };

    const handleBuy = (symbol) => {
        const quantity = parseInt(prompt(`Enter quantity of ${symbol} to buy:`), 10);
        const buyPrice = stockPrices[symbol] || 100; // Default buy price if not found

        if (isNaN(quantity) || quantity <= 0) {
            alert('Invalid quantity entered');
            return;
        }

        const totalPurchaseAmount = quantity * buyPrice;

        if (totalPurchaseAmount > walletBalance) {
            alert('Insufficient balance to buy the stock');
            return;
        }

        dispatch(sellStock({ symbol, quantity, buyPrice }));
        dispatch(buyStock(totalPurchaseAmount));  // Deduct the total purchase amount from the wallet balance

        alert(`Bought ${quantity} shares of ${symbol} at ₹${buyPrice.toFixed(2)} each. Total Purchase Amount: ₹${totalPurchaseAmount.toFixed(2)}`);
    };

    const handleExitAll = () => {
        portfolio.forEach(stock => {
            const totalSaleAmount = stock.quantity * (stockPrices[stock.symbol] || stock.buyPrice || 0);
            dispatch(updateBalance(totalSaleAmount));  // Add the total sale amount of each stock to the wallet balance
        });
        dispatch(exitAllStocks());
    };

    return (
        <div className="financial-holdings">
            <h2>Financial Holdings Overview</h2>
            {portfolio.length > 0 ? (
                <table className="holdings-table">
                    <thead>
                        <tr>
                            <th>Stock Symbol</th>
                            <th>Stock Name</th>
                            <th>Quantity</th>
                            <th>Buy Price</th>
                            <th>Current Price</th>
                            <th>Total Value</th>
                            <th>Profit/Loss</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {portfolio.map(stock => {
                            const currentPrice = stockPrices[stock.symbol] || stock.buyPrice;
                            const totalValue = stock.quantity * currentPrice;
                            const profitLoss = (currentPrice - stock.buyPrice) * stock.quantity;

                            return (
                                <tr key={stock.symbol}>
                                    <td>{stock.symbol}</td>
                                    <td>{getStockName(stock.symbol)}</td>
                                    <td>{stock.quantity}</td>
                                    <td>{formatCurrency(stock.buyPrice)}</td>
                                    <td>{formatCurrency(currentPrice)}</td>
                                    <td>{formatCurrency(totalValue)}</td>
                                    <td className={profitLoss >= 0 ? 'profit' : 'loss'}>
                                        {formatCurrency(profitLoss)}
                                    </td>
                                    <td>
                                        <button
                                            className="sell-button"
                                            onClick={() => handleSell(stock.symbol)}
                                        >
                                            Sell
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No stocks in your portfolio.</p>
            )}
            <button
                className="exit-all-button"
                onClick={handleExitAll}
            >
                Exit All
            </button>
        </div>
    );
};

// Utility function to get stock name by symbol
const getStockName = (symbol) => {
    const stockNames = {
        'AAPL': 'Apple Inc.',
        'GOOGL': 'Alphabet Inc.',
        'MSFT': 'Microsoft Corp.',
        'AMZN': 'Amazon.com Inc.',
        'TSLA': 'Tesla Inc.'
    };
    return stockNames[symbol] || 'Unknown';
};

export default FinancialHoldings;
