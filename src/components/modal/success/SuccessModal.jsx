import React from 'react';
import './SuccessModal.css';
import SuccessIcon from '../../../assets/icons/success.png'

export default function SuccessModal({ 
  onClose, 
  icon = SuccessIcon,
  title = 'Payment Success',
  children,
  footerButtons = [],
  onSuccess, 
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">

        {/* Close Button */}
        <button className="close-button" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {/* Modal Body */}
        <div className="modal-body">
          {icon && (
            <img
              src={icon}
              width="80"
              height="80"
              alt="modal-icon"
              className="modal-image"
            />
          )}

          <div className="modal-title">{title }</div>

          <div className="modal-description">
            {/* <p><strong>Subscription AMount:</strong> 100USDT</p>
            <p><strong>ROI:</strong> 2.5%</p>
            <p><strong>Mature At: </strong> 21 AUG 2025</p> */}
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {footerButtons.map(({ label, onClick, className = '', key }) => (
            <button key={key || label} className={className} onClick={onClick}>
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
