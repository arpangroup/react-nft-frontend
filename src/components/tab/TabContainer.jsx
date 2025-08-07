import React, { useState, Children, cloneElement, useEffect } from 'react';
import './TabContainer.css';

/*
const TabContainer = ({ children, initialIndex = 0, onTabChange }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

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
};*/

const TabContainer = ({ children, activeIndex, onTabChange }) => {
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
              onClick={() => onTabChange(index)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onTabChange(index);
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
