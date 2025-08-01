import React from "react";
import "./StakeCard.css";

export default function StakeCard({
  imgUrl = "https://prodimage-dan.treasurenft.xyz/Stake/Stake_14778.png",
  stakeName = "Stake_147555",
  stakeValue = "2000 USDT",
  apr = "1.5%",
  reciprocal = "25 days",
  income = "7500 TUFT",
  onDetailsClick = () => alert("Details clicked!"),
}) {
  return (
    <div className="stake-card">
      <div className="stake-card__top-row">
        <img
          src={imgUrl}
          alt="Stake"
          className="stake-card__image"
          loading="lazy"
        />
        <div className="stake-card__text-block">
          <div className="stake-card__stake-name">{stakeName}</div>
          <div>
            <span className="stake-card__label">Stake Value </span>
            <span className="stake-card__value">{stakeValue}</span>
          </div>
          <div className="stake-card__row_expire">
            <span className="stake-card__label">APR</span>
            <span className="stake-card__value stake-card__value--apr">{apr}</span>
           </div>
        </div>
      </div>

      <div className="stake-card__divider" />

      <div className="stake-card__bottom-row">
        <div>
          <span className="label">Reciprocal: </span>
          <span className="value value--reciprocal">{reciprocal}</span>
        </div>
        <div>
          <span className="label">Income: </span>
          <span className="value">{income}</span>
        </div>
      </div>

      <button className="stake-card__button" onClick={onDetailsClick}>
        Details
      </button>
    </div>
  );
}
