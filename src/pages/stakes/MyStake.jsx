import React, { useEffect, useState } from 'react';
import StatCard from '../../components/card/StatCard';
import MyStakeList from './MyStakeList';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../api/apiRoutes';
import StakeCard from '../../components/card/StakeCard';
import { CURRENCY_UNIT } from '../../constants/config';
import NoData from '../../components/NoData';
import NFTStakeModal from '../../components/modal/NFTStakeModal';


const defaultStakeItems = [{
  "investmentId": 1,
  "schemaName": "RANK_1 60 days plan",
  "amountRange": "₹100 – ₹200",
  "imageUrl": "http://localhost:8080/api/v1/files/download/stake_2.png",
  "investedAmount": 100.0000,
  "roiType": "PERCENTAGE",
  "roiValue": 1.5000,
  "perPeriodProfit": 1.5000,
  "capitalBack": true,
  "capitalReturned": false,
  "currencyCode": "USDT",
  "totalPeriods": 60,
  "completedPeriods": 0,
  "remainingPeriods": 60,
  "expectedReturn": 190.0000,
  "receivedReturn": 0.0000,
  "profit": 0.0000,
  "totalEarningPotential": 290.0000,
  "earlyExitPenalty": 50.00,
  "nextReturnAmount": 1.5000,
  "subscribedAt": "2025-08-04T03:13:03.606651",
  "nextPayoutDate": "2025-08-05T03:13:03.606651",
  "maturityAt": "2025-10-03T03:13:03.606651",
  "payoutFrequencyLabel": "Daily",
  "investmentStatus": "ACTIVE",
  "canCancelNow": false,
  "daysRemaining": 59,
  "withdrawableNow": false
}];


function MyStake() {
  const [stakeItems, setStakeItems] = useState(defaultStakeItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStake, setSelectedStake] = useState(null);

  useEffect(() => {
    const fetchStakes = async () => {
      try {
        const response = await apiClient.get(API_ROUTES.STAKES_BY_USER_ID(1));
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

  const handleDetailsClick = () => {
    // You can also pass stake data if needed
    setSelectedStake({
      imgUrl: "https://prodimage-dan.treasurenft.xyz/Stake/Stake_14778.png",
      stakeName: "Stake_14757796",
      stakeValue: "2000 USDT",
      apr: "1.5%",
      reciprocal: "25 days",
      income: "7500 TUFT",
    });
    setModalOpen(true);
  };

  return (
    <>
    <div>
      <div className='' style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', backgroundColor: 'transparent', marginBottom: '32px' }}>
        <StatCard title={"Total Stake Value"} value={"0 USDT"} color="blue" />
        <StatCard title={"Total Stake Profit"} value={"0 USDT"} color="green" />
      </div>
      <div style={{ marginBottom: '60px' }}>
        {/* MyStakeList */}      
        {/* <MyStakeList /> */}
        {loading && <p>Loading stake items...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && stakeItems.length === 0 && (
            <NoData message="No stake found." />
        )}

        <div className=''>
            {!loading && !error && stakeItems.map((item, index) => (
            <StakeCard
                key={item.id || index}
                image={item.imageUrl}
                title={item.schemaName}
                price={item.investedAmount}
                currency={item.currencyCode || CURRENCY_UNIT}
                likes={item.totalReturnPeriods}
                onClick={() => setModalOpen(true)}
            />
            ))}
        </div>

      </div>
    </div>    
    {isModalOpen && (
      <NFTStakeModal
          onClose={() => setModalOpen(false)}
          {...selectedStake}
      />
    )}
    </>
  );
}

export default MyStake;
