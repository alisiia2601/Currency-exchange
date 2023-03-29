import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [usdRate, setUsdRate] = useState(0);
  const [eurRate, setEurRate] = useState(0);
  const [uahRate, setUahRate] = useState(1);
  const [currency1, setCurrency1] = useState('UAH');
  const [currency2, setCurrency2] = useState('USD');
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);

  useEffect(() => {
    fetch('https://api.exchangerate.host/latest?base=UAH&symbols=USD,EUR')
      .then(response => response.json())
      .then(data => {
        setUsdRate(data.rates.USD);
        setEurRate(data.rates.EUR);
      })
      .catch(error => console.error(error));
  }, []);

  const handleCurrency1Change = (event) => {
    setCurrency1(event.target.value);
    updateAmount2(amount1, event.target.value, currency2);
  };

  const handleCurrency2Change = (event) => {
    setCurrency2(event.target.value);
    updateAmount2(amount1, currency1, event.target.value);
  };

  const handleAmount1Change = (event) => {
    const value = event.target.value;
    setAmount1(value);
    updateAmount2(value, currency1, currency2);
  };

  const handleAmount2Change = (event) => {
    const value = event.target.value;
    setAmount2(value);
    updateAmount1(value, currency2, currency1);
  };

  const updateAmount2 = (value, currency1, currency2) => {
    const rate1 = getExchangeRate(currency1);
    const rate2 = getExchangeRate(currency2);
    const converted = (value / rate1) * rate2;
    setAmount2(converted);
  };

  const updateAmount1 = (value, currency1, currency2) => {
    const rate1 = getExchangeRate(currency1);
    const rate2 = getExchangeRate(currency2);
    const converted = (value / rate2) * rate1;
    setAmount1(converted);
  };

  const getExchangeRate = (currency) => {
    switch (currency) {
      case 'USD':
        return usdRate;
      case 'EUR':
        return eurRate;
      case 'UAH':
        return uahRate;
      default:
        return 1;
    }
  };

  return (
    <div>
      <h1>Currency Exchange Rate Converter</h1>
      <div className="conversion-container">
        <div className="conversion-row">
          <input type="number" value={amount1} onChange={handleAmount1Change} />
          <select value={currency1} onChange={handleCurrency1Change}>
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="conversion-row">
          <input type="number" value={amount2} onChange={handleAmount2Change} />
          <select value={currency2} onChange={handleCurrency2Change}>
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="rate-row">
        <p>1 {currency1} = {getExchangeRate(currency2).toFixed(4)} {currency2}</p>
      <p>1 {currency2} = {getExchangeRate(currency1).toFixed(4)} {currency1}</p>
    </div>
  </div>
</div>
);
}

export default App;