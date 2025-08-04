import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabContainer from '../../components/tab/TabContainer';
import Tab from '../../components/tab/Tab';
import StakeList from './stakeList/StakeList';
import NoData from '../../components/NoData';
import MyStake from './mystake/MyStake';

// Map tab titles to indexes — must match your TabContainer tab order
const tabTitleToIndex = {
  ExclusiveZone: 0,
  FreeZone: 1,
  MyStake: 2,
};

function Stake() {  
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
