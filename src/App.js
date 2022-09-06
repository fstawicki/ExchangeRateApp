import { useEffect, useState } from 'react';
import axios from "axios";

import './app.scss';
import logo from './assets/exchange.png';
import Options from './Options';

function App() {

  const [curr1, setCurr1] = useState('EUR');
  const [curr2, setCurr2] = useState('PLN');
  const [rate, setRate] = useState(1);
  const [ammount1, setAmmount1] = useState(1);
  const [result, setResult] = useState(1);

  const changeFirstCurr = (e) => {
    setCurr1(e.target.value);
  }

  const changeSecondCurr = (e) => {
    setCurr2(e.target.value);
  }

  const changeFirstAmmount = (e) => {
    setAmmount1(e.target.value);
  }


  useEffect(() => {

    axios(`https://v6.exchangerate-api.com/v6/89a1c3edb699e2ebb0bfcd6d/pair/${curr1}/${curr2}`)
      .then(response => {
        const data = response.data.conversion_rate;
        setRate(data);
        setResult(ammount1*data);
      })

  },[curr1, curr2, ammount1])

  return (
    <div className="App">
      <div className="container">
        <img src={logo} alt="app logo" className="logo" />
        <h1 className="appName">Exchange Rate App</h1>
        <p className="info">Choose the currency and amount to get the exchange rate.</p>
        <div className="formContainer">
          <div className="currencyContainer">
            <select onChange={changeFirstCurr} defaultValue="EUR">
              <Options />
            </select>
            <input type="number" defaultValue={ammount1} onChange={changeFirstAmmount}/>
          </div>
          <div className="rateContainer">
            <p className="result">exchange rate: {rate}</p>
          </div>
          <div className="currencyContainer">
            <select onChange={changeSecondCurr} defaultValue="PLN">
              <Options />
            </select>
            <input type="number" readOnly value={result}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
