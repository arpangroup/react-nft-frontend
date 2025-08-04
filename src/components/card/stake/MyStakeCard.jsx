import React from "react";
import "./MyStakeCard.css";
import { CURRENCY_SYMBOL, CURRENCY_UNIT } from "../../../constants/config";
import { formatDateShort } from "../../../constants/dateFormatter";
const defaultImage = "http://localhost:8080/api/v1/files/download/stake_1.png";

  const Detail = ({ label, value }) => (
    <div className="stake-card__col2">
      <span className="label">{label}: </span>
      <span className="value">{value}</span>
    </div>
  );

export default function MyStakeCard({
  image = defaultImage,
  title = "Untitled Stake",
  investedAmount = 0,
  currency = CURRENCY_UNIT,
  roiValue = 0,
  roiType = "PERCENTAGE",
  remainingPeriods = 0,
  payoutFrequencyLabel = "Daily",
  perPeriodProfit = 0,
  receivedReturn = 0,
  expectedReturn = 0,
  totalEarningPotential = 0,
  nextReturnAmount = 0,
  nextPayoutDate = "-",
  onDetailsClick = () => {},
}) {
  const formatCurrency = (value) => `${value} ${currency}`;

  return (
    <div className="stake-card">
      <div className="stake-card__top-row">
        <img
          src={image}
          alt={title}
          className="stake-card__image"
          loading="lazy"
          onError={(e) => (e.target.src = defaultImage)}
        />
        <div className="stake-card__text-block">
          <div className="stake-card__stake-name">{title}</div>
          <div className="stake-card__col2">
            <span className="stake-card__label">Stake Value </span>
            <span className="stake-card__value">{formatCurrency(investedAmount)}</span>
          </div>
          <div className="stake-card__col2">
            <span className="stake-card__label">ROI</span>
            <span className="stake-card__value">
              {roiValue}
              {roiType === 'PERCENTAGE' ? '%' : CURRENCY_SYMBOL}
            </span>
           </div>
        </div>
      </div>

      <div className="stake-card__divider" />

      <div className="stake-card__bottom-row">        
        <Detail label="Remaining" value={`${remainingPeriods} ${payoutFrequencyLabel === "Daily" ? "days" : payoutFrequencyLabel}`} />
        <Detail label="Per Period Profit" value={formatCurrency(perPeriodProfit)} />
        <Detail label="Expected Return" value={formatCurrency(expectedReturn)} />
        <Detail label="Received Return" value={formatCurrency(receivedReturn)} />
        <Detail label="Total Earning Potential" value={formatCurrency(totalEarningPotential)} />
        <Detail label="Next Return Amount" value={formatCurrency(nextReturnAmount)} />
        <Detail label="Next Payout Date" value={formatDateShort(nextPayoutDate)} />
      </div>

      <button className="stake-card__button" onClick={onDetailsClick}>
        Details
      </button>
    </div>
  );


}
