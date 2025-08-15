import React from 'react';

const NoData = ({ currentTime, message = "No Data Available" }) => (
  <div className="no-data">
    <img
      className="no-data__img"
      src="https://image.treasurenft.xyz/icon/icon_noData_01.svg"
      alt="No Data"
      loading="lazy"
    />
    <p className="no-data__title">{message}</p>
    <p className="no-data__timestamp">{currentTime}</p>
  </div>
);

export default NoData;
