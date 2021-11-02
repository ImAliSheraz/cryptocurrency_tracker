import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coins from './components/Coins';
import './App.css';


// Used https://api.coingecko.com/ for data fetching



function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res => {
        setCoins(res.data)
        console.log(res.data)
      }).catch(error => console.log(error))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coins =>
    coins.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>
      {filteredCoins.map(coins => {
        return (
          <Coins
            key={coins.id}
            name={coins.name}
            price={coins.current_price}
            symbol={coins.symbol}
            marketCap={coins.total_volume}
            volume={coins.market_cap}
            image={coins.image}
            priceChange={coins.price_change_percentage_24h} />
        );
      })}
    </div>
  );
}

export default App;
