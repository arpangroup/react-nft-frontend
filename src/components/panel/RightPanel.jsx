import React, { useEffect, useState } from "react";
import "./RightPanel.css";

const RightPanel = ({ isOpen, onClose, children, width = "480px" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Delay unmounting for animation
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div className="right-panel-overlay" onClick={onClose}>
      <div
        className={`right-panel-container ${isOpen ? "slide-in" : "slide-out"}`}
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="right-panel-header">
          <button className="right-panel-close" onClick={onClose}>
            &#x276E;
          </button>
        </div>
        <div className="right-panel-content">{children}</div>
      </div>
    </div>
  );
};

export default RightPanel;
