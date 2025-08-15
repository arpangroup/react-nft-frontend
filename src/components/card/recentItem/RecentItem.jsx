import React, { useState } from 'react';
import "./RecentItem.css";
import { BsCurrencyDollar } from 'react-icons/bs';
import { TiTick } from 'react-icons/ti';

const item = {
    icon: <TiTick />,
    amount: '350',
    title: 'Paypal Transfer',
    desc: 'Money Added',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'green-600',
}

const defaultIconColor = '#03C9D7';

export default function RecentItem({
    title,
    description,
    amount

}) {
  return (
    <div className="recent-item">
        <div className="recent-icon-group">
            <button
                type="button"
                style={{
                    color: item.iconColor,
                    backgroundColor: item.iconBg,
                }}
                className="recent-icon"
            >
                {item.icon}
            </button>
            <div>
                <p className="recent-item-title">{title}</p>
                <p className="recent-item-desc">{description}</p>
            </div>
        </div>
        <p className={`recent-amount ${Number(item.amount) < 0 ? 'negative' : ''}`}>
            {Number(item.amount) < 0 ? '-' : '+'}${Math.abs(Number(amount))}
        </p>
    </div>
  );
}