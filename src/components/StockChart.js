import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import './StockChart.css';
import { updateStockPrice } from '../features/stockPricesSlice';

// Register chart components
ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const StockChart = ({ stock }) => {
    const dispatch = useDispatch();
    const stockPrices = useSelector(state => state.stockPrices);

    const [currentPrice, setCurrentPrice] = useState(stockPrices[stock.symbol] || stock.price || 0);

    const getBorderColor = (symbol) => {
        switch (symbol) {
            case 'AAPL': return 'blue';
            case 'GOOGL': return 'green';
            case 'MSFT': return 'red';
            case 'AMZN': return 'orange';
            case 'TSLA': return 'purple';
            default: return 'gray';
        }
    };

    const getBorderDash = (symbol) => {
        switch (symbol) {
            case 'AAPL': return [5, 5];
            case 'GOOGL': return [];
            case 'MSFT': return [10, 4];
            case 'AMZN': return [5, 10];
            case 'TSLA': return [15, 5];
            default: return [];
        }
    };

    // Generate time labels from 0:30 AM to 3:30 PM
    const timeLabels = Array.from({ length: 30 }, (_, i) => {
        const hour = Math.floor(i / 2);
        const minute = i % 2 === 0 ? '30' : '00';
        return `${hour < 10 ? '0' : ''}${hour}:${minute} ${hour < 12 ? 'AM' : 'PM'}`;
    });

    const [data, setData] = useState({
        labels: timeLabels,
        datasets: [
            {
                label: `${stock.symbol} Price`, // Ensure this label updates based on the selected stock
                data: Array.from({ length: 30 }, () => Math.random() * 100 + 100),
                borderColor: getBorderColor(stock.symbol),
                backgroundColor: 'rgba(0, 0, 0, 0)',
                fill: false,
                borderDash: getBorderDash(stock.symbol),
                tension: 0.1,
            }
        ],
    });

    useEffect(() => {
        if (stock) {
            setCurrentPrice(stockPrices[stock.symbol] || stock.price || 0);
            setData(prevData => ({
                ...prevData,
                datasets: [{
                    ...prevData.datasets[0],
                    label: `${stock.symbol} Price`,
                    borderColor: getBorderColor(stock.symbol),
                    borderDash: getBorderDash(stock.symbol),
                }]
            }));
        }
    }, [stock, stockPrices]);

    useEffect(() => {
        const interval = setInterval(() => {
            const newPrice = Math.random() * 100 + 100;
            setCurrentPrice(newPrice);
            dispatch(updateStockPrice({ symbol: stock.symbol, currentPrice: newPrice }));
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, [stock.symbol, dispatch]);

    useEffect(() => {
        setData(prevData => {
            const newData = [...prevData.datasets[0].data];
            newData.shift();
            newData.push(currentPrice);

            return {
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: newData,
                        borderColor: getBorderColor(stock.symbol),
                        borderDash: getBorderDash(stock.symbol),
                    }
                ],
            };
        });
    }, [currentPrice, stock.symbol]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.dataset.label}: ₹${tooltipItem.raw.toFixed(2)}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time'
                },
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                }
            },
            y: {
                position: 'right',
                title: {
                    display: true,
                    text: 'Price (INR)'
                },
                beginAtZero: false,
                ticks: {
                    callback: function(value) {
                        return `₹${value.toFixed(2)}`;
                    }
                }
            }
        }
    };

    return (
        <div className="stock-chart-container">
            <h3 className="chart-title">{stock.symbol} Stock Price</h3> {/* Display current stock symbol */}
            <p className="price-display">Current Price: ₹{currentPrice.toFixed(2)}</p>
            <div className="chart-wrapper">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default StockChart;
