import React, { useEffect, useState } from 'react';
import StakeCard from '../../components/card/StakeCard'
// import NFTStakeModal from '../../components/modal/NFTStakeModal';
// import WarningModal from '../../components/modal/warning/WarningModal';
import ExclusiveStakingModal from '../../components/modal/ExclusiveStakingModal';
import { CURRENCY_UNIT } from '../../constants/config';
import NoData from '../../components/NoData';
import { API_ROUTES } from '../../api/apiRoutes';
import apiClient from '../../api/apiClient';

const defaultStakeItems = [{
    "id": 9,
    "linkedRank": "RANK_1",
    "title": "RANK_1 60 days plan",
    "schemaBadge": "STAKE_RANK_1_60",
    "imageUrl": "http://localhost:8080/api/v1/files/download/stake_2.png",
    "investmentSubType": "STAKE",
    "schemaType": "RANGE",
    "minimumInvestmentAmount": 100.0000,
    "maximumInvestmentAmount": 200.0000,
    "handlingFee": 0.0000,
    "minimumWithdrawalAmount": 0.0000,
    "returnRate": 1.5000,
    "interestCalculationMethod": "PERCENTAGE",
    "returnType": "PERIOD",
    "totalReturnPeriods": 60,
    "cancellationGracePeriodMinutes": 1440,
    "description": null,
    "currency": "USDT",
    "earlyExitPenalty": 50.00,
    "termsAndConditionsUrl": "https://example.com/tc/fixed1yr",
    "payoutMode": "DAILY",
    "payoutDays": [],
    "payoutDates": [],
    "participationLevels": [],
    "createdAt": "2025-08-04T01:57:39.613778",
    "updatedAt": "2025-08-04T01:57:39.613778",
    "createdBy": "admin",
    "updatedBy": "admin",
    "capitalReturned": true,
    "tradeable": true,
    "featured": true,
    "cancellable": false,
    "active": true
}];


function MyStakeList() {
    const [stakeItems, setStakeItems] = useState(defaultStakeItems);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedStake, setSelectedStake] = useState(null);

    
    useEffect(() => {
      const fetchStakes = async () => {
        try {
          const response = await apiClient.get(API_ROUTES.MY_STAKES);
          //setStakeItems(response.content || []);
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
                        title={item.title}
                        price={item.minimumInvestmentAmount}
                        currency={CURRENCY_UNIT}
                        likes={item.totalReturnPeriods}
                    />
                    ))}
                </div>

                {isModalOpen && (
                    // <NFTStakeModal
                    //     onClose={() => setModalOpen(false)}
                    //     {...selectedStake} // pass stake data to modal (optional)
                    // />

                    // <StakeWarningModal
                    //     onClose={() => setModalOpen(false)}
                    //     onUpgrade={() => {
                    //         setModalOpen(false);
                    //         // Handle upgrade logic
                    //     }}
                    // />

                    <ExclusiveStakingModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                    />
                    
                )}
            </div>
        </>

    );
}

export default MyStakeList;
