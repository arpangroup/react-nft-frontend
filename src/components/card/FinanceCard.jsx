import React from "react";
import "./FinanceCard.css";
import { NavLink } from "react-router-dom";

const FinanceCard = ({
  stakeId = 1,
  imageUrl = 'https://image.treasurenft.xyz/PC/img/stake_card_img_spec_01.png',
  status = "Active",
  price = "$320",
  income = "1.7%",
  handlingFee = "1%",
  onPurchase,
}) => {
  return (
    <div className="finance-card">
      {/* Header */}
      <div className="finance-card-header">
        <h2 className="card-title">Exclusive Stake</h2>
        <span className="card-rank">Rank1</span>
      </div>

      {/* Image */}
      {imageUrl && (
        <div className="finance-card__img-box">
          <img src={imageUrl} alt="Card Visual" className="card-image" style={{width: '614', height: 'auto', maxWidth: '100%'}}/>
        </div>
      )}

      {/* Info Grid */}
      <div className="card-info">
        <div className="info-label">Status</div>
        <div className="info-value">{status}</div>

        <div className="info-label">Price</div>
        <div className="info-value">{price}</div>

        <div className="info-label">Income</div>
        <div className="info-value">{income}</div>

        <div className="info-label">Handling Fee</div>
        <div className="info-value">{handlingFee}</div>
      </div>

      {/* Button */}
      <div className="card-actions">
        <button className="purchase-button">
          <NavLink className="purchase-button" to={"/items/1"}>Details</NavLink>
        </button>
      </div>
    </div>
  );
};

export default FinanceCard;
