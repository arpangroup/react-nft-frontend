import React, { useState, Children, cloneElement } from 'react';
import './TabContainer.css';

const TabContainer = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = Children.toArray(children);

  return (
    <div className="dark-tabs-container">
      <div className="dark-tabs-nav-scroll">
        <div className="dark-tabs-nav">
          <div
            className="dark-tabs-ink-bar"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${(100 / tabs.length) * activeIndex}%`,
            }}
          />
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`dark-tab ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveIndex(index);
              }}
            >
              {tab.props.title}
            </div>
          ))}
        </div>
      </div>

      <div className="dark-tab-content">
        {tabs[activeIndex]}
      </div>
    </div>
  );
};

export default TabContainer;
