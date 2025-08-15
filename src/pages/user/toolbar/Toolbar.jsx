import React from "react";
import "./Toolbar.css";

export default function Toolbar({
  title,
  showBack = true,
  onBack,
  rightContent = <span></span>,
}) {
  return (
    <div className="toolbar">
      {showBack && (
        <button className="toolbar-back-btn" onClick={onBack}>
          &#x276E;
        </button>
      )}
      {title && <h3 className="toolbar-title">{title}</h3>}
      {rightContent && <div className="toolbar-right">{rightContent}</div>}
    </div>
  );
}
