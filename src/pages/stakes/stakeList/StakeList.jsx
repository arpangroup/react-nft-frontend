import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StakeList.css';
import apiClient from '../../../api/apiClient'

import StakeCard from '../../../components/card/StakeCard'
import { API_ROUTES } from '../../../api/apiRoutes';
import NoData from '../../../components/NoData';
import { CURRENCY_UNIT } from '../../../constants/config';

function Stakes() {
  const [stakeItems, setStakeItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStakes();
  }, []);

  const fetchStakes = async () => {
    try {
      const response = await apiClient.get(API_ROUTES.STAKES);
      // const response = stakes;
      //console.log("RESPONSE: ", response);
      setStakeItems(response.content || []);
    } catch (err) {
      console.error('Failed to fetch stake items:', err);
      setError('Failed to load stake items.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="search_container">
        <input type="text" placeholder="Search Item Here" autoFocus />
        <div className="filter_container">
          <input type="number" placeholder="Lowest Price" min="0" />
          <input type="number" placeholder="Highest Price" min="0" />
        </div>
      </div>

      <div className='stakes' style={{ marginBottom: '80px' }}>
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
                price={item.price}
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
