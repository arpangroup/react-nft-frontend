import React, { useState } from 'react';
import './ExclusiveStakingModal.css';

export default function ExclusiveStakingModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('illustrate');

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        {/* Header */}
        <div className="modal-header">
          <div className="header-flex">
            <div className="spacer" />
            <div className="close-container">
              <img
                src="https://image.treasurenft.xyz/PC/img/icon-close_01.svg"
                alt="Close"
                width={24}
                height={24}
                className="close-icon cursor-pointer"
                onClick={onClose}
                aria-label="Close Help Modal"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="modal-tabs-container">
          <div
            className={`modal-tab ${activeTab === 'illustrate' ? 'active' : ''}`}
            onClick={() => setActiveTab('illustrate')}
          >
            Illustrate
          </div>
          <div
            className={`modal-tab ${activeTab === 'rule' ? 'active' : ''}`}
            onClick={() => setActiveTab('rule')}
          >
            Rule
          </div>
        </div>

        {/* Body */}
        <div className="modal-body">
          {activeTab === 'illustrate' && (
            <>
              <p className="modal-paragraph">
                Introduction to the Exclusive Staking Zone
              </p>
              <p className="modal-paragraph">
                Exclusive Staked NFTs are a vital part of Treasure Fun's future collectibles and auction market. The yields from exclusive staking differ from those in the free zone. The exclusive zone primarily aims to provide better services and collectible yield sources for those who contribute to community development.
              </p>
              <p className="modal-paragraph">Details About Each Zone</p>
              <p className="modal-paragraph">
                NFT Exclusive Zone 2:
                <br />- Earnings: 1.8% / day
                <br />- Participation Funds: 499-2000
                <br />- Duration: 7/30 days
                <br />- Minimum Withdrawal: $50
                <br />- Transaction Fee: 1%
                <br />- Participation Requirements: Level A participants 10, Level B/C participants 20
                <br />- Participation Level: Level 2 ~ Level 6
              </p>
            </>
          )}

          {activeTab === 'rule' && (
            <p className="modal-paragraph">
              {/* Add rule content here when ready */}
              Rule content will go here...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
