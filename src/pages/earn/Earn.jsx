import React, { useState } from 'react';
import FinanceCard from '../../components/card/FinanceCard';

function Earn() {
  return (
    <div className='' style={{padding: '16px', marginBottom: '24px'}}>    
        <FinanceCard
            stakeId= '1'
        />
        <FinanceCard
            stakeId= '2'
        />
    </div>
  );
}

export default Earn;
