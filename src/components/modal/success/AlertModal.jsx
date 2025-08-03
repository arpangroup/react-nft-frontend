import React, { useEffect } from 'react';
import './AlertModal.css';
import SuccessIcon from '../../../assets/icons/success.png'
import WarningIcon from '../../../assets/icons/warming.png'

export default function AlertModal({ 
  type = 'warning',
  onClose,
  icon = SuccessIcon,
  title = 'Try Again',
  children,
  footerButtons = [],
}) {

  return (    
    <div className="modal-overlay">
      <div className="modal-content">

        {/* Close Button */}
        { type !== 'success' && (
          <button className="close-button" onClick={onClose} aria-label="Close modal">
            &times;
          </button>
        )}

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
