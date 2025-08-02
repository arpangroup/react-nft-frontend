import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StakeList.css';
import { Bids } from '../../components';
import apiClient from '../../api/apiClient'

import bids1 from '../../assets/bids1.png'
import bids2 from '../../assets/bids2.png'
import bids3 from '../../assets/bids3.png'
import bids4 from '../../assets/bids4.png'
import bids5 from '../../assets/bids5.png'
import bids6 from '../../assets/bids6.png'
import bids7 from '../../assets/bids7.png'
import bids8 from '../../assets/bids8.png'
import StakeCard from '../../components/card/StakeCard'
import { API_ROUTES } from '../../api/apiRoutes';
import { stakes } from '../../mocks/mockResponses';
import NoData from '../../components/NoData';
import { CURRENCY_UNIT } from '../../constants/config';

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
  const [stakeItems, setStakeItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

   useEffect(() => {
      const fetchStakes = async () => {
        try {
          const response = await apiClient.get(API_ROUTES.STAKES);
          // const response = stakes;
          console.log("RESPONSE: ", response);
          setStakeItems(response.content || []);
        } catch (err) {
          console.error('Failed to fetch stake items:', err);
          setError('Failed to load stake items.');
        } finally {
          setLoading(false);
        }
      };

      fetchStakes();
    }, []);

  return (
    <div>
       <div className="search_container">
          <input type="text" placeholder="Search Item Here" autoFocus />
          <div className="filter_container">
            <input type="number" placeholder="Lowest Price" min="0" />
            <input type="number" placeholder="Highest Price" min="0" />
            </div>
        </div>

      <div className='stakes' style={{marginBottom: '80px'}}>
        <div className="bids-container">
          <div className="bids-container-card">
            {loading && <p>Loading stake items...</p>}
            {error && <p>{error}</p>}

             {!loading && !error && stakeItems.length === 0 && (
              <NoData message="No stake items found." />
            )}

            {!loading && !error && stakeItems.map((item, index) => (
              <StakeCard 
                key={item.id || index}
                image={item.imageUrl}
                title={item.title}
                price={item.minimumInvestmentAmount}
                currency={CURRENCY_UNIT}
                likes={item.totalReturnPeriods} // or any other available metric
                onClick={() => navigate(`/stakes/${item.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Stakes;
