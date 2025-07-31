import React from 'react';
import NoData from './NoData';
import ReserveDropdowns from './ReserveDropdowns';
import ReservationCard from './ReservationCard ';
import OrderCard from './OrderCard ';
import StakeCard from '../../components/card/StakeCard'

const tabs = ['Today\'s', 'Reserve', 'Collection'];

const TabContent = ({ activeTab }) => {
  const currentTime = 'GMT+05:30 2025-07-23 03:37:51';

  switch (activeTab) {
    case 0:
      // return <NoData currentTime={currentTime} />;
      return (
       <>
        <ReservationCard />
         <ReservationCard />
       </>
      );
      
    case 1:
      return <ReserveDropdowns />;
    case 2:
      return (
        <>
        {/* <p style={{ color: '#ccc' }}>
          Content for: <strong>{tabs[activeTab]}</strong>
        </p> */}
        <div className="bids-container-card">
              <StakeCard
                key={1}
                image={`http://localhost:8080/api/v1/files/download/stake_2.png`}
                title={`GiffgaffApeClub_0021549`}
                price={177.26}
                // onClick={() => navigate(`/stakes/${item.id}`)}
              />
               <StakeCard
                key={2}
                image={`http://localhost:8080/api/v1/files/download/stake_3.png`}
                title={`GiffgaffApeClub_0021549`}
                price={177.26}
                // onClick={() => navigate(`/stakes/${item.id}`)}
              />
          </div>
        </>
      );
    default:
      return null;
  }
};

export default TabContent;
