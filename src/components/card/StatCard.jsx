import React from 'react';
import './StatCard.css'; // contains the CSS styles from `.stat-card`, `.stat-title`, `.stat-value`, etc.

const StatCard = ({ title, value, color = 'gray' }) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

export default StatCard;
