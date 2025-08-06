import React from 'react';
import { AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './CollectionCard.css';

const CollectionCard = ({ imageUrl, title, price, likes, link = '/post/123', onSellClick }) => (
  <div className="card-column">
    <div className="bids-card" style={{ cursor: 'pointer' }}>
      <div className="bids-card-top">
        <img src={imageUrl} alt={title} style={{height: '80px'}}/>
        <Link to={link}>
          <p className="bids-title">{title}</p>
        </Link>
      </div>
      <div className="bids-card-bottom">
        <p>{price} <span>ETH</span></p>
        <p><AiFillHeart /> {likes}</p>
      </div>
      <div className=''>
        <button type="button" className="btn-sell-stake" onClick={onSellClick}>
          <span>Sell</span>
        </button>
      </div>
    </div>
  </div>
);

export default CollectionCard;
