import React, { useState } from 'react';
import UserStatistics from '../statistics/UserStatistics';
import DarkTabs from './DarkTabs';

function Reservation() {
  return (
    <div className=''>
      <UserStatistics/>

      <DarkTabs/>
    </div>
  );
}

export default Reservation;
