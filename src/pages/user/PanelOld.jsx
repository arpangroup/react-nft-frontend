import React from "react";
import "./Panel.css";

export default function Panel({ items }) {
  return (
    <div className="panel">
      {items.map((item, index) => (
        <div key={index} className="panel-item">
          <div className="panel-header">{item.header}</div>
          <div className="panel-subtext">{item.subtext}</div>
        </div>
      ))}
    </div>
  );
}
