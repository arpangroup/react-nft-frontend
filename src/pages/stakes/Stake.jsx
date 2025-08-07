import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TabContainer from '../../components/tab/TabContainer';
import Tab from '../../components/tab/Tab';
import StakeList from './stakeList/StakeList';
import NoData from '../../components/NoData';
import MyStake from './mystake/MyStake';

const tabTitleToIndex = {
  ExclusiveZone: 0,
  FreeZone: 1,
  MyStake: 2,
};

function Stake() {  
  const location = useLocation();
  const [activeTabIndex, setActiveTabIndex] = useState(() => {
    const index = tabTitleToIndex[location.state?.activeTab] ?? 0;
    return index;
  });

  useEffect(() => {
    if (location.state?.activeTab) {
      const index = tabTitleToIndex[location.state.activeTab];
      if (index !== undefined) {
        setActiveTabIndex(index);
      }
    }
  }, [location.state]);

  return (
    <div>
      <TabContainer activeIndex={activeTabIndex} onTabChange={setActiveTabIndex}>
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
