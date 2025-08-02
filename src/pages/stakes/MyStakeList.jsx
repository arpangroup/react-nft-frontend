import React, { useEffect, useState } from 'react';
import StatCard from '../../components/card/StatCard';
import StakeCard from './components/StakeCard';
import NFTStakeModal from '../../components/modal/NFTStakeModal';
import StakeWarningModal from '../../components/modal/StakeWarningModal';
import ExclusiveStakingModal from '../../components/modal/ExclusiveStakingModal';


function MyStakeList() {
    const [isModalOpen, setModalOpen] = useState(false);
    // Optional: Hold stake data if you want to pass it to modal
    const [selectedStake, setSelectedStake] = useState(null);

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
                <div className=''>
                    <StakeCard onDetailsClick={handleDetailsClick} />
                    <StakeCard onDetailsClick={handleDetailsClick} />
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
                        onClose={() => setModalOpen(false)}
                        onUpgrade={() => {setModalOpen(false)}}
                    />
                    
                )}
            </div>
        </>

    );
}

export default MyStakeList;
