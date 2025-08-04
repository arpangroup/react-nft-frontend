import React, { useEffect, useState } from 'react';
import UserStatistics from '../statistics/UserStatistics';
import TabContainer from '../../components/tab/TabContainer';
import Tab from '../../components/tab/Tab';
import { useLocation } from 'react-router';
import TodaysReservationTab from './tabs/TodaysReservationTab';
import ReservationTab from './tabs/ReservationTab';
import CollectionTab from './tabs/CollectionTab';

const tabTitleToIndex = {
  Todays: 0,
  Reserve: 1,
  Collection: 2,
};

function Reservation() {
  const location = useLocation();
  //const [initialIndex, setInitialIndex] = useState(0);
  const [initialIndex, setInitialIndex] = useState(() => {
    if (location.state?.activeTab) {
      const index = tabTitleToIndex[location.state.activeTab];
      return index !== undefined ? index : 0;
    }
    return 0;
  });


  
  useEffect(() => {
    if (location.state?.activeTab) {
      const index = tabTitleToIndex[location.state.activeTab];
      if (index !== undefined) {
        setInitialIndex(index);
      }
    }
  }, [location.state]);

  return (
    <div style={{marginBottom: '120px'}}>
      <UserStatistics/>

      <TabContainer initialIndex={initialIndex}>
        <Tab title={`Today\'s`}> 
          <TodaysReservationTab/>
        </Tab>
        <Tab title="Reserve"> 
          <ReservationTab/>
        </Tab>
        <Tab title="Collection"> 
          <CollectionTab/>
        </Tab>
      </TabContainer>
      {/* {isSelling && sellData && (
        <SellNFT item={sellData} onClose={handleClose} />
      )} */}
    </div>
  );
}

export default Reservation;
