// src/components/Wallet.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBalance } from '../features/balanceSlice';
import './Wallet.css';

const Wallet = () => {
  const walletBalance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    totalAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_vv1FCZvuDRF6lQ",
      key_secret: "P4JAUwn4VdE6xDLJ6p2Zy8RQ",
      amount: parseInt(formData.totalAmount) * 100,
      currency: "INR",
      name: "Web Mastery",
      description: "for testing purpose",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;
        console.log("Payment ID:", paymentId);

        // Dispatch the addBalance action to update the wallet balance
        dispatch(addBalance(parseInt(formData.totalAmount)));

        setFormData({
          totalAmount: "",
        });
      },
      theme: {
        color: "#f44336",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="wallet-container">
      <h3 className="wallet-title">Wallet Balance</h3>
      <p className="wallet-balance">₹{walletBalance.toFixed(2)}</p>
      <form onSubmit={handleSubmit} className="wallet-form">
        <input
          id="number"
          name="totalAmount"
          type="number"
          required
          value={formData.totalAmount}
          onChange={handleChange}
          className="wallet-input"
          placeholder="Enter amount"
        />
        <button type="submit" className="wallet-button">Add to Wallet</button>
      </form>
    </div>
  );
};

export default Wallet;
