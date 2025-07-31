import React from 'react';
import NoData from './NoData';
import ReserveDropdowns from './ReserveDropdowns';

const tabs = ['Today\'s', 'Reserve', 'Collection'];

const StakeTabContent = ({ activeTab }) => {
  const currentTime = 'GMT+05:30 2025-07-23 03:37:51';

  switch (activeTab) {
    case 0:
      return <NoData currentTime={currentTime} />;
    case 1:
      return <ReserveDropdowns />;
    case 2:
      return (
        <p style={{ color: '#ccc' }}>
          Content for: <strong>{tabs[activeTab]}</strong>
        </p>
      );
    default:
      return null;
  }
};

export default StakeTabContent;
