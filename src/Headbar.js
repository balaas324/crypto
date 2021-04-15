import React from 'react'
import './Coin.css'


export const Headbar = () => {
    return (
        <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <h1>name</h1>
                    <p className="coin-symbol">symbol</p>
                </div>
                <div className="coin-data">
                    <p className="coin-price">price</p>
                    <p className="price-change">priceChange</p> 
                    <p className="coin-volume">volume</p>  
                    <p className="coin-marketcap">market cap</p>
                </div>
            </div>
        </div>
    )
}
