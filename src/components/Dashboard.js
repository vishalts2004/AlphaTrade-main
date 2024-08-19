// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockChart from './StockChart';
import { stocksData } from '../data/stocksData';
import { addStock } from '../features/portfolioSlice';
import { updateStockPrice } from '../features/stockPricesSlice';
import { buyStock, addBalance } from '../features/balanceSlice'; // Import the actions
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
    const [selectedStock, setSelectedStock] = useState(stocksData[0] || {});
    const [quantity, setQuantity] = useState(0);
    const dispatch = useDispatch();
    const portfolio = useSelector(state => state.portfolio.holdings || []);
    const stockPrices = useSelector(state => state.stockPrices);
    const walletBalance = useSelector(state => state.balance); // Get the wallet balance from Redux

    useEffect(() => {
        const interval = setInterval(() => {
            stocksData.forEach(stock => {
                const updatedPrice = stock.currentPrice * (1 + (Math.random() - 0.5) * 0.01);
                dispatch(updateStockPrice({ symbol: stock.symbol, currentPrice: updatedPrice }));
            });
        }, 10000);

        return () => clearInterval(interval);
    }, [dispatch]);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const message = query.get('message');
        if (message) {
            alert(message);
        }
    }, []);

    const handleStockClick = (stock) => {
        setSelectedStock(stock);
    };

    const handleBuy = () => {
        if (quantity > 0) {
            const buyPrice = stockPrices[selectedStock.symbol] || selectedStock.currentPrice || 0;
            const totalCost = buyPrice * quantity;

            if (totalCost <= walletBalance) {
                const updatedStock = {
                    symbol: selectedStock.symbol,
                    quantity: parseInt(quantity, 10),
                    buyPrice: buyPrice
                };
                dispatch(addStock(updatedStock));
                dispatch(buyStock(totalCost)); // Deduct the total cost from the wallet balance
                alert(`Bought ${quantity} shares of ${selectedStock.symbol} at ₹${buyPrice.toFixed(2)}`);
                setQuantity(0); // Reset quantity after purchase
            } else {
                alert('Insufficient balance to complete the purchase');
            }
        } else {
            alert('Please enter a valid quantity');
        }
    };

    const currentHoldings = portfolio.find(stock => stock.symbol === selectedStock.symbol);

    return (
        <div className="dashboard">
            <div className="dashboard-content">
                <div className="stock-list">
                    <h2>Stocks Dashboard</h2>
                    <p className="black-text">Wallet Balance: ₹{walletBalance.toFixed(2)}</p>
                    <ul>
                        {stocksData.map(stock => (
                            <li
                                key={stock.symbol}
                                onClick={() => handleStockClick(stock)}
                                className={`stock-item ${selectedStock.symbol === stock.symbol ? 'selected' : ''}`}
                            >
                                <div className="stock-info">
                                    <span className="stock-symbol">{stock.symbol}</span>
                                    <span className={`stock-price ${selectedStock.symbol === stock.symbol ? 'selected' : ''}`}>
                                        ₹{(stockPrices[stock.symbol] || stock.currentPrice || 0).toFixed(2)}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="stock-chart">
                    {selectedStock ? (
                        <div>
                            <StockChart stock={selectedStock} />
                            <div className="buy-section">
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    placeholder="Quantity"
                                    className="quantity-input"
                                />
                                <button onClick={handleBuy} className="buy-button">Buy</button>
                            </div>
                            {currentHoldings && (
                                <div className="current-holdings">
                                    <h4>Current Holdings</h4>
                                    <p>Quantity: {currentHoldings.quantity || 0}</p>
                                    <p>Buy Price: ₹{currentHoldings.buyPrice ? currentHoldings.buyPrice.toFixed(2) : '0.00'}</p>
                                    <p>Current Price: ₹{(stockPrices[selectedStock.symbol] || selectedStock.currentPrice || 0).toFixed(2)}</p>
                                    <p>Profit/Loss: ₹{currentHoldings.buyPrice ? 
                                        (((stockPrices[selectedStock.symbol] || selectedStock.currentPrice || 0) - currentHoldings.buyPrice) * currentHoldings.quantity).toFixed(2) : '0.00'}</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>Select a stock to view its chart</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
