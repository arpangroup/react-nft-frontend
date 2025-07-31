import React from "react";
// Import Bootstrap CSS and Icons
import "bootstrap-icons/font/bootstrap-icons.css";

const items = [
  { title: "Deposit", icon: "bi-piggy-bank-fill", align: "start" },
  { title: "Withdraw", icon: "bi-cash-stack", align: "center" },
  { title: "Settings", icon: "bi-gear-fill", align: "end" },
];

export default function DarkButtonGroup() {
  return (
    <div
      style={{
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "center",
        marginBottom: "16px"
      }}
    >
      <div
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          padding: "2rem",
          width: "600px",
          display: "flex",
        }}
      >
        {items.map(({ title, icon, align }, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: align,
              padding: "0 1rem",
            }}
          >
            <i
              className={icon + " bi"}
              style={{ fontSize: "2.5rem", color: "#f8f9fa", marginBottom: "0.5rem" }}
            />
            <span style={{ color: "#f8f9fa", fontWeight: "600" }}>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
