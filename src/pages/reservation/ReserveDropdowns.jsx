import React from 'react';
import Countdown from './Countdown';

const ReserveDropdowns = () => (
  <>
  <div className="reserve-content">
    <select id="option1" className="reserve-dropdown">
      <option value="val1">Value 1</option>
      <option value="val2">Value 2</option>
      <option value="val3">Value 3</option>
    </select>

    <select id="option2" className="reserve-dropdown">
      <option value="valA">Value A</option>
      <option value="valB">Value B</option>
      <option value="valC">Value C</option>
    </select>
  </div>
  <Countdown initialTimeInSeconds={4907} />
  </>
);

export default ReserveDropdowns;
