import axios from 'axios';
import React, {useState, useEffect, } from 'react';
import './App.css';
import Coin from './Coin'
import { Headbar } from './Headbar';
 
function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  //const [data, setData] =useState([])
  const [sortType, setSortType] = useState('name')
  
  useEffect(()=>{
    axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=huf&order=market_cap_desc&per_page=20&page=1&sparkline=false')
    .then(res => {
      setCoins(res.data)
    })
    .catch(error => console.log(error))
  },[])

  useEffect(()=>{
      const sortArray=type=>{
        const types={
          name: "name",
          price: "current_price",
          priceChange: 'price_change_percentage_24h',
        }
        const sortProperty = types[type];
        const sorted = [...coins].sort((a, b)=>{
          if (sortProperty === 'name') {
            return a.name.localeCompare(b.name)
          } else {
            return b[sortProperty] - a[sortProperty]
          }
        })
        console.log(sorted);
        setCoins(sorted);
      }
      sortArray(sortType);
  }, [sortType]);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())  
  ); 

  return (
    <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">search a currency</h1>
          <form>
            <input className="coin-input"
            type="text" placeholder="search"
            onChange={handleChange}
            />
          </form>
          <select onChange={(e)=>setSortType(e.target.value)}>
            <option value="name">name</option>
            <option value="price">price</option>
            <option value="priceChange">price change</option>
          </select>
        </div>
        <Headbar />
        {filteredCoins.map(coin => {
          return (
            <Coin 
            key={coin.id} 
            name={coin.name} 
            image={coin.image} 
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
            />
          )
        })}
    </div>
  );
}

export default App;