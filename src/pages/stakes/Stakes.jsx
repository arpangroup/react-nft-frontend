import React, { useState } from 'react';
import './Stakes.css';
import { Bids } from '../../components';

import bids1 from '../../assets/bids1.png'
import bids2 from '../../assets/bids2.png'
import bids3 from '../../assets/bids3.png'
import bids4 from '../../assets/bids4.png'
import bids5 from '../../assets/bids5.png'
import bids6 from '../../assets/bids6.png'
import bids7 from '../../assets/bids7.png'
import bids8 from '../../assets/bids8.png'
import StakeCard from '../../components/card/StakeCard'

const stakeItems = [
  { image: bids1, title: "Abstract Smoke Red", price: "1.25", likes: 92 },
  { image: bids2, title: "Mountain Landscape", price: "0.20", likes: 25 },
  { image: bids3, title: "Paint Color on Wall", price: "0.55", likes: 55 },
  { image: bids4, title: "Abstract Pattern", price: "0.87", likes: 82 },
  { image: bids5, title: "White Line Graffiti", price: "0.09", likes: 22 },
  { image: bids6, title: "Abstract Triangle", price: "0.90", likes: 71 },
  { image: bids7, title: "Lake Landscape", price: "0.52", likes: 63 },
  { image: bids8, title: "Blue Red Art", price: "0.85", likes: 66 }
];


function Stakes() {

  return (
    <div>
      <div className="stake-list">
        <div className="search_container">
          <input type="text" placeholder="Search Item Here" autoFocus />
        </div>
        <div className="filter_container">
          <input type="number" placeholder="Lowest Price" min="0" />
          <input type="number" placeholder="Highest Price" min="0" />
        </div>
      </div>

      <div className='stakes'>
        <div className="bids-container">
          <div className="bids-container-card">
            {stakeItems.map((item, index) => (
              <StakeCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Stakes;
