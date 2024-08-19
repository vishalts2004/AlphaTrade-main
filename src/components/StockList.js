import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './StockList.css';
import { stocksData } from '../data/stocksData'; // Import the updated stock data

const StockList = ({ onStockSelect }) => {
  const dispatch = useDispatch();
  const balance = useSelector(state => state.balance);

  const handleBuy = (stock) => {
    if (balance >= stock.price) {
      dispatch({ type: 'BUY_STOCK', payload: stock });
      alert(`Bought ${stock.name}`);
    } else {
      alert('Insufficient balance');
    }
  };

  return (
    <div className="stock-list">
      <h3>Stock List</h3>
      <ul>
        {stocksData.map(stock => (
          <li key={stock.symbol} onClick={() => onStockSelect(stock)}>
            <div className="stock-info">
              <h4>{stock.symbol}</h4>
              <p>Price: ${stock.price}</p>
              <button onClick={() => handleBuy(stock)}>Buy</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
