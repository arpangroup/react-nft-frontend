import React, { useState } from 'react';
import './UserStatCard.css';

function UserStatCard({ title, value, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

export default UserStatCard;
