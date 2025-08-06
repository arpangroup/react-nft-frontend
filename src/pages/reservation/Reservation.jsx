import React, { useEffect, useState } from 'react';
import UserStatistics from '../statistics/UserStatistics';
import TabContainer from '../../components/tab/TabContainer';
import Tab from '../../components/tab/Tab';
import { useLocation } from 'react-router';
import TodaysReservationTab from './tabs/TodaysReservationTab';
import ReservationTab from './tabs/ReservationTab';
import CollectionTab from './tabs/CollectionTab';
import { USER_ID } from '../../constants/config';
import apiClient from '../../api/apiClient';
import { API_ROUTES } from '../../api/apiRoutes';

const tabTitleToIndex = {
  Todays: 0,
  Reserve: 1,
  Collection: 2,
};

function Reservation() {
  const [reservedStakes, setReservedStakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  
  useEffect(() => {
    fetchReservedStakes(setReservedStakes, setLoading, setError);
  }, []);

  const fetchReservedStakes = async () => {
    try {
      const response = await apiClient.get(API_ROUTES.RESERVATION_API.ACTIVE_RESERVATIONS(USER_ID));
      console.log("RESPONSE: ", response);
      setReservedStakes(response || []);
    } catch (err) {
      console.error('Failed to fetch stake items:', err);
      setError('Failed to load stake items.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{marginBottom: '120px'}}>
      <UserStatistics/>

      <TabContainer initialIndex={initialIndex}>
        <Tab title={`Today\'s`}> 
          <TodaysReservationTab
            reservedStakes={reservedStakes}
            loading={loading}
            error={error}
          />
        </Tab>
        <Tab title="Buy Stake"> 
          <ReservationTab
            reservedStakes={reservedStakes}
          />
        </Tab>
        <Tab title="Sell Stake"> 
          <CollectionTab          
            reservedStakes={reservedStakes}
            loading={loading}
            error={error}
          />
        </Tab>
      </TabContainer>
    </div>
  );
}

export default Reservation;
