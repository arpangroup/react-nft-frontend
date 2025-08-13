import React, { useEffect, useState } from 'react';
import './MyStake.css';
import StatCard from '../../../components/card/StatCard';
import apiClient from '../../../api/apiClient';
import { API_ROUTES } from '../../../api/apiRoutes';
import MyStakeCard from '../../../components/card/stake/MyStakeCard';
import { CURRENCY_UNIT, USER_ID } from '../../../constants/config';
import NoData from '../../../components/NoData';
import NFTStakeModal from '../../../components/modal/NFTStakeModal';


function MyStake() {
  const [stakeItems, setStakeItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStake, setSelectedStake] = useState(null);

  useEffect(() => {
    fetchStakes(setStakeItems, setLoading, setError);
  }, []);

  const fetchStakes = async () => {
    try {
      const res = await apiClient.get(API_ROUTES.STAKES.MY_STAKE);
      setStakeItems(res.data?.content || []);
    } catch (err) {
      console.error('Failed to fetch stake items:', err);
      setError('Failed to load stake items.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleDetailsClick = (stake) => {    
    setSelectedStake(stake);
    setModalOpen(true);
  };
  

  if (loading) return <p>Loading stake items...</p>;
  if (error) return <p>{error}</p>;
  if (stakeItems.length === 0) return <NoData message="No stake found." />;

  return (
    <div>
      <div className='stake-stat-container'>
        <StatCard title={"Total Stake Value"} value={"0 USDT"} color="blue" />
        <StatCard title={"Total Stake Profit"} value={"0 USDT"} color="green" />
      </div>

      
        {loading && <p>Loading stake items...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && stakeItems.length === 0 && (
            <NoData message="No stake found." />
        )}

      <div className='mystake-list'>
        {!loading && !error && stakeItems.map((item, index) => (
          <MyStakeCard
            key={item.investmentId || index}
            {...item}
            currency={item.currencyCode || CURRENCY_UNIT}
            onDetailsClick={() => handleDetailsClick(item)}
          />
        ))}
      </div>
      {isModalOpen && (
        <NFTStakeModal
            onClose={() => setModalOpen(false)}
            {...selectedStake}
        />
      )}
    </div>
  );
}

export default MyStake;
