import React, { useEffect, useState } from "react";
import './transaction.css';
import {
    recentTransactions,
}
from '../../data/dummy.js'

export default function Transaction() {
    return (
        <>
            {/* Recent Transactions Card */}
            <div className="recent-transactions-container">
                <div className="recent-transactions-card">
                    <div className="recent-header">
                        <p className="recent-title">Recent Transactions</p>
                    </div>
                    <div className="recent-list">
                        {recentTransactions.map((item) => (
                            <div key={item.title} className="recent-item">
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
                                        <p className="recent-item-title">{item.title}</p>
                                        <p className="recent-item-desc">{item.desc}</p>
                                    </div>
                                </div>
                                <p className={`recent-amount ${Number(item.amount) < 0 ? 'negative' : ''}`}>
                                    {Number(item.amount) < 0 ? '-' : '+'}${Math.abs(Number(item.amount))}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="recent-footer">
                        <button
                            style={{
                                backgroundColor: "#000",
                                color: "white",
                                borderRadius: "10px",
                                padding: "8px 16px",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Add
                        </button>
                        <p className="recent-count">36 Recent Transactions</p>
                    </div>
                </div>
            </div>
        </>
    );
}