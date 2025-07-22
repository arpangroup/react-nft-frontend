import React from 'react';
import './ProfileCard.css';
import { FaWallet } from 'react-icons/fa';

const ProfileCard = ({ username, uuid, level, points, profileImage }) => {
  return (
    <div className="profile-card">
      <div className="top-row">
        <img src={profileImage} alt="Profile" className="profile-img" />
        <div className="user-info">
          <div className="user-header">
            <h2 className="username">{username}</h2>
            <FaWallet className="wallet-icon" />
          </div>
          <div className="user-id">UID: {uuid}</div>
        </div>
      </div>

      <div className="bottom-row">
        <div className="info-box">Level {level}</div>
        <div className="info-box">{points} Points</div>
      </div>
    </div>
  );
};

export default ProfileCard;
