import React from 'react';
import './ReservationCard.css';

const ReservationCard = ({
  drawDate,
  status,
  orderNo,
  reservationDate,
  estimatedAmount,
  itemName,
  itemPrice,
  itemImg
}) => (
  <div className="tab-pane active py-3">
    <div className="reservation-card position-relative">
      {/* Draw date */}
      <p className="text-info fw-bold mb-1">Draw date: {drawDate}</p>

      {/* Order No. title */}
      <p className="fw-bold mb-1 text-light">Order No.:</p>

      {/* Order No. */}
      <p className="text-light mb-2">{orderNo}</p>

      {/* Reservation date */}
      <p className="reservation-date">{`Reservation date: ${reservationDate}`}</p>

      {/* Estimated amount */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="fw-semibold text-muted">Estimated Amount:</span>
        <span className="text-light">{estimatedAmount}</span>
      </div>

      {/* Item image and info */}  
    <div className="item-info-container mt-4 d-flex align-items-center">
    <img src={itemImg} alt="Item" className="item-img me-3" />
    <div className="item-text-container">
        <p className="fw-bold mb-1 text-light text-truncate">{itemName}</p>
        <div className="d-flex align-items-center">
        <p className="text-muted fw-semibold mb-0 me-2">Item Price:</p>
        <span className="text-light">{itemPrice}</span>
        </div>
    </div>
    </div>

      {/* Won badge on right side */}
      {status && (
        <span
          className={`badge position-absolute ${
            status === 'Won' ? 'bg-success' : 'bg-secondary'
          } status-badge`}
        >
          {status}
        </span>
      )}
    </div>
  </div>
);

export default ReservationCard;
