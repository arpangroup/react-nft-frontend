import React from 'react';
import { AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';

const BidCard = ({ image, title, price, likes, link = '/post/123' }) => (
  <div className="card-column">
    <div className="bids-card">
      <div className="bids-card-top">
        <img src={image} alt={title} />
        <Link to={link}>
          <p className="bids-title">{title}</p>
        </Link>
      </div>
      <div className="bids-card-bottom">
        <p>{price} <span>ETH</span></p>
        <p><AiFillHeart /> {likes}</p>
      </div>
    </div>
  </div>
);

export default BidCard;
