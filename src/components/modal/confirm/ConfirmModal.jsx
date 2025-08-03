import React from 'react';
import './ConfirmModal.css';
import { useNavigate } from 'react-router-dom';

const ConfirmModal = ({ 
    isOpen, 
    onClose,
    title = 'Conditions not met',
    imageSrc = "https://image.treasurenft.xyz/PC/img/img-stake-warning_01.png",
    onPrimaryAction,     // Generic callback for main action (e.g., Deposit)
    primaryButtonLabel = 'Confirm'
  }) => {
  if (!isOpen) return null;

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal" onClick={e => e.stopPropagation()}>
        <div className="custom-modal-body">
          <img
            src={imageSrc}
            width="80"
            height="80"
            alt="modal-img"
            loading="lazy"
            className="custom-img"
          />
          <div className="custom-title">{title}</div>
        </div>
        <div className="custom-modal-footer">
          <div className="footer-button finish-button" onClick={onClose}>Finish</div>
          <button className="footer-button primary-button" onClick={onPrimaryAction}> 
            {primaryButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
