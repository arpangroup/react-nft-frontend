import React, { useState } from 'react';
import './DarkTabs.css';
import TabContent from './TabContent';

const tabs = ['Today\'s', 'Reserve', 'Collection'];

const DarkTabs = () => {
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
      <div className="dark-tab-content" style={{marginBottom: '50px'}}>
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default DarkTabs;
