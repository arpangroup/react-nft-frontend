import React, { useEffect, useState } from "react";
import './branding.css';
import { IoIosMore } from "react-icons/io"; // or wherever you get this icon
// import Button from "./Button"; // your Button component

import {
    medicalproBranding,
}
    from '../../data/dummy.js'

export default function Branding() {
    return (
        <>
            <div className="branding-container">
                <div className="branding-card">

                   <div className="branding-header">
                        <p className="recent-title">My Team</p>
                    </div>

                    <p className="date-label">16 APR, 2021</p>

                    <div className="data-section flex gap-4 border-b border-color mt-6">
                        {medicalproBranding.data.map((item) => (
                            <div key={item.title} className="data-item border-r border-color pr-4 pb-2">
                                <p className="data-title">{item.title}</p>
                                <p className="data-desc">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="teams-section border-b border-color pb-4 mt-2">
                        <p className="section-title">Teams</p>
                        <div className="teams-list flex flex-row gap-4 overflow-x-auto whitespace-nowrap">
                            {medicalproBranding.teams.map((item) => (
                                <span
                                    key={item.name}
                                    style={{ background: item.color }}
                                    className="team-pill text-white py-1 px-3 rounded-lg text-xs"
                                >
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </div>



                    <div className="leaders-section mt-2">
                        <p className="section-title">Referrals</p>
                        <div className="leaders-list flex flex-row items-center gap-4 overflow-x-auto">
                            {medicalproBranding.leaders.map((item, index) => (
                                <img
                                    key={index}
                                    src={item.image}
                                    alt={`${item.name || "leader"} avatar`}
                                    className="leader-avatar w-8 h-8 rounded-full object-cover"
                                />
                            ))}
                        </div>
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
                            Upgrade
                        </button>
                        <p className="recent-count">36 Recent Transactions</p>
                    </div>
                </div>
            </div>
        </>
    );
}