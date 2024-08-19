import React from 'react';
import { useDispatch } from 'react-redux';

const StockItem = ({ stock }) => {
  const dispatch = useDispatch();

  const handleBuy = () => {
    dispatch({ type: 'BUY_STOCK', payload: stock });
  };

  const handleSell = () => {
    dispatch({ type: 'SELL_STOCK', payload: stock });
  };

  return (
    <div>
      <span>{stock.symbol}</span>
      <span>${stock.price}</span>
      <button onClick={handleBuy}>Buy</button>
      <button onClick={handleSell}>Sell</button>
    </div>
  );
};

export default StockItem;
