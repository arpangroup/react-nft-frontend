import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import './Stake.css';
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
import StakeTabs from './StakeTabs';
import TabContainer from '../../components/tab/TabContainer';
import Tab from '../../components/tab/Tab';
import  StakeList from './StakeList';
import NoData from '../../components/NoData';
import MyStake from './MyStake';

// Map tab titles to indexes — must match your TabContainer tab order
const tabTitleToIndex = {
  ExclusiveZone: 0,
  FreeZone: 1,
  MyStake: 2,
};

function Stake() {  
  const location = useLocation();
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    if (location.state?.activeTab) {
      const index = tabTitleToIndex[location.state.activeTab];
      if (index !== undefined) {
        setInitialIndex(index);
      }
    }
  }, [location.state]);

  return (
    <div>
      <TabContainer initialIndex={initialIndex}>
        <Tab title="ExclusiveZone"> 
          <StakeList/>
        </Tab>
        <Tab title="FreeZone"> 
          <NoData/>
        </Tab>
        <Tab title="MyStake"> 
          <MyStake />
        </Tab>
      </TabContainer>
    </div>
  );
}

export default Stake;
