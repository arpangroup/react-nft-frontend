import React from 'react';
import './UserStatistics.css';

const stats = [
  { title: 'Today Earnings', value: '0.16', color: 'blue' },
  { title: 'Cumulative Income', value: '105.37', color: 'green' },
  { title: 'Team Benefits', value: '9.03', color: 'gray' },
  { title: 'Reservation Range', value: '1 ~ 5,000', color: 'orange' },
  { title: 'Wallet Balance', value: '0.77', color: 'cyan' },
  { title: 'Balance for Reservation', value: '0.77', color: 'darkblue' },
];

const UserStatistics = () => {
  return (
    <div className="user-statistics">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.color}`}>
          <div className="stat-title">{stat.title}</div>
          <div className="stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default UserStatistics;
