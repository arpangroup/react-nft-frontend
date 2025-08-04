import React from 'react';
import Countdown from '../../../components/countdown/Countdown';
import './ReserveDropdowns.css'

const ReserveDropdowns = () => (
  <>
    <div className="reserve-content">
      <div className="select-wrapper">
        <select id="option1" className="reserve-dropdown">
          <option value="val1">Value 1</option>
          <option value="val2">Value 2</option>
          <option value="val3">Value 3</option>
        </select>
      </div>

      <div className="select-wrapper">
        <select id="option2" className="reserve-dropdown">
          <option value="valA">Value A</option>
          <option value="valB">Value B</option>
          <option value="valC">Value C</option>
        </select>
      </div>
    </div>
    <button className="dark-btn">Reserve Now</button>
    <Countdown initialTimeInSeconds={4907} />
  </>
);

export default ReserveDropdowns;
