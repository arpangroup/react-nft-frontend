import React, { useEffect, useState } from 'react';
import StatCard from '../../components/card/StatCard';
import MyStakeList from './MyStakeList';


function MyStake() {
  return (
    <div>
      <div className='' style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', backgroundColor: 'transparent', marginBottom: '32px' }}>
        <StatCard title={"Total Stake Value"} value={"15,955.2 USDT"} color="blue" />
        <StatCard title={"Total Stake Value"} value={"15,955.2 USDT"} color="green" />
      </div>
      <div style={{marginBottom: '60px'}}>
        <MyStakeList />
      </div>
    </div>
  );
}

export default MyStake;
