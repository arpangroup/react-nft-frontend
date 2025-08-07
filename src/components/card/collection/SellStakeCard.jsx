import React from 'react';
import { AiFillHeart } from "react-icons/ai";
import { FiTrendingUp  } from "react-icons/fi";
import { Link } from 'react-router-dom';
import './SellStakeCard.css';

const SellStakeCard = ({
  itemName,
  imageUrl, 
  price,
  currey,
  valuationDelta,
  link = '/post/123', 
  onSellClick 
}) => (
  <div className="tab-pane active py-3">
  <div className="sell-stake-card card-column">
    <div className="bids-card" style={{ cursor: 'pointer' }}>
      <div className="bids-card-top">
        <img src={imageUrl} alt={itemName} style={{height: '120px'}}/>
        <Link to={link}>
          <p className="bids-title text-truncate">{itemName}</p>
        </Link>
      </div>
      <div className="stake-sell-card-bottom">
        <p>{price} <span>{currey}</span></p>
        <p className="valuation-delta">
            <FiTrendingUp className="trending-icon" />
            <span className="valuation-delta-text">{valuationDelta}</span>
        </p>
      </div>
      <div className=''>
        <button type="button" className="btn-sell-stake" onClick={onSellClick}>
          <span>Sell</span>
        </button>
      </div>
    </div>
  </div>
  </div>
);

export default SellStakeCard;
