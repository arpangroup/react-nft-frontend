import React from 'react';
import './StakeWarningModal.css';

export default function StakeWarningModal({ onClose, onUpgrade }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        {/* Modal Body */}
        <div className="modal-body">
          <img
            src="https://image.treasurenft.xyz/PC/img/img-stake-warning_01.png"
            width="80"
            height="80"
            alt="stake-img"
            className="modal-image"
          />

          <div className="modal-title">Conditions not met</div>

          <div className="modal-description">
            <p>Level: LV1 ~ LV6</p>
            <p>Invite the number of subordinates to reach</p>
            <p>Class A: 5 People</p>
            <p>Class B + C: 10 People</p>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="upgrade-button" onClick={onUpgrade}>
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
