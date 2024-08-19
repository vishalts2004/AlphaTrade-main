// src/components/StockDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { stocksData } from '../data/stocksData';
import StockChart from './StockChart';
import './StockDetail.css'; // Add custom styles for stock detail

const StockDetail = () => {
    const { symbol } = useParams();
    const [stock, setStock] = useState(null);

    useEffect(() => {
        const selectedStock = stocksData.find(stock => stock.symbol === symbol);
        setStock(selectedStock);
    }, [symbol]);

    return (
        <div className="stock-detail">
            {stock ? (
                <>
                    <h1>{stock.name} ({stock.symbol})</h1>
                    <p>Price: ${stock.price.toFixed(2)}</p>
                    <StockChart />
                    <button className="buy-button">Buy</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default StockDetail;
