import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const stakeItems = [
  { image: bids1, title: "Abstract Smoke Red", price: "1.25", likes: 92 },
  { image: bids2, title: "Mountain Landscape", price: "0.20", likes: 25 },
  { image: bids3, title: "Paint Color on Wall", price: "0.55", likes: 55 },
  { image: bids4, title: "Abstract Pattern", price: "0.87", likes: 82 },
  { image: bids5, title: "White Line Graffiti", price: "0.09", likes: 22 },
  { image: bids6, title: "Abstract Triangle", price: "0.90", likes: 71 },
  { image: bids7, title: "Lake Landscape", price: "0.52", likes: 63 },
  { image: bids8, title: "Blue Red Art", price: "0.85", likes: 66 }
];



function Stake() {
  return (
    <div>
      <TabContainer>
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
