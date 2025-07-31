import React from 'react';
import './OrderCard.css';

const OrderCard = ({
  drawDate,
  orderNumber,
  reservationDate,
  estimatedAmount,
  itemName,
  itemPrice,
  itemImage,
  isWon
}) => (
    <>
     <div className="tab-pane active py-3">
    <div className="reservation-card">
  <div className="card compact-card p-3 text-light bg-dark">
    {/* 1. Draw date (top-left) */}
    <div className="draw-date text-info">{drawDate}</div>

    {/* 2. Order No title and badge on same line */}
    <div className="d-flex justify-content-between align-items-center mt-2">
      <span className="fw-semibold order-title">Order No.:</span>
      {isWon && <span className="badge bg-success badge-won">Won</span>}
    </div>

    {/* 3. Order number */}
    <div className="order-number text-muted small">{orderNumber}</div>

    {/* 4. Reservation date */}
    <div className="reservation-date text-muted small mb-3">{reservationDate}</div>

    {/* 5. Estimated Amount line */}
    <div className="d-flex justify-content-between align-items-center mb-3 est-amount">
      <span className="fw-semibold">Estimated Amount</span>
      <span className="text-light">{estimatedAmount}</span>
    </div>

    {/* 6. Thumbnail + Item details */}
    <div className="d-flex align-items-start">
      <img
        src={itemImage}
        alt={itemName}
        className="thumbnail-img me-3"
      />
      <div className="item-info">
        <div className="fw-semibold">{itemName}</div>
        <div className="text-muted small">Item Price: {itemPrice}</div>
      </div>
    </div>
  </div>
  </div>
  </div>
    </>
);

export default OrderCard;
