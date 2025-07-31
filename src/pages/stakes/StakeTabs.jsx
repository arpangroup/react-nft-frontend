import React, { useState } from 'react';
import './StakeTabs.css';
// import StakeTabContent from './StakeTabContent';

const tabs = ['Exclusive', 'FreeZOne', 'My Stake'];

const StakeTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="dark-tabs-container">
      <div className="dark-tabs-nav-scroll">
        <div className="dark-tabs-nav">
          <div
            className="dark-tabs-ink-bar"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${(100 / tabs.length) * activeTab}%`,
            }}
          />
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`dark-tab ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveTab(index);
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <div className="dark-tab-content">
        {/* <StakeTabContent activeTab={activeTab} /> */}
      </div>
    </div>
  );
};

export default StakeTabs;
