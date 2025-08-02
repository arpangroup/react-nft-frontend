import React from 'react';
import './NFTStakeModal.css';

export default function NFTStakeModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">NFT Stake</h3>
          <img
            src="https://image.treasurenft.xyz/PC/img/icon-close_01.svg"
            alt="Close"
            width="24"
            height="24"
            onClick={onClose}
            className="close-icon"
          />
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="nft-preview">
            <img
              src="https://prodimage-dan.treasurenft.xyz/Stake/Stake_14778.png"
              alt="NFT"
              className="nft-image"
            />
            <h4 className="nft-title">Stake_14757796</h4>
            <div className="value-section">
              <p className="label">Value</p>
              <p className="value">2,000 USDT</p>
            </div>
          </div>

          <div className="pledge-details">
            <p className="section-title">Pledge Details</p>

            <div className="detail-row">
              <span className="label">APR:</span>
              <span className="value">1.5%</span>
            </div>

            <div className="detail-row">
              <span className="label">Total Stake Value:</span>
              <span className="value green">2000 USDT</span>
            </div>

            <div className="detail-row">
              <span className="label">End Time:</span>
              <span className="value green">2025-08-26 12:00:17</span>
            </div>

            <div className="detail-row">
              <span className="label">Rewards Available:</span>
              <span className="value green">7500 TUFT</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="primary-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
