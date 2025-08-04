import React from 'react';
import './ReservationTab.css';
import Countdown from '../../../components/countdown/Countdown';

const dropdownOptions = [
  {
    id: 'option1',
    options: [
      { value: 'val1', label: 'Value 1' },
      { value: 'val2', label: 'Value 2' },
      { value: 'val3', label: 'Value 3' },
    ],
  },
  {
    id: 'option2',
    options: [
      { value: 'valA', label: 'Value A' },
      { value: 'valB', label: 'Value B' },
      { value: 'valC', label: 'Value C' },
    ],
  },
];

function ReservationTab() {
  const isReservedFound = false;

  if (isReservedFound) {
    return <Countdown initialTimeInSeconds={4907} />;
  }

  return (
    <div className="reserve-now">
      <div className="reserve-content">
        {dropdownOptions.map(({ id, options }) => (
          <div key={id} className="select-wrapper">
            <select id={id} className="reserve-dropdown">
              {options.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button className="dark-btn">Reserve Now</button>
    </div>
  );
}

export default ReservationTab;
