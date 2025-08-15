import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaCopy, FaShareAlt } from "react-icons/fa";
import "./ReferralScreen.css";
import Toast from "./toast/Toast";

export default function ReferralScreen() {
  const referralCode = "REF12345"; // You can fetch this from API
  const referralLink = `https://example.com/register?ref=${referralCode}`;
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    showToast("Copied to clipboard!", "success");
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join me on Example App!",
          text: `Use my referral code: ${referralCode}`,
          url: referralLink,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <div className="referral-container">
      <h2 className="referral-title">Invite & Earn</h2>

      {/* QR Code */}
      <div className="qr-wrapper">
        <QRCodeCanvas value={referralLink} size={180} bgColor="#1e1e1e" fgColor="#ffffff" />
      </div>

      {/* Referral Code */}
      <div className="referral-code-box">
        <span className="referral-code">{referralCode}</span>
        <FaCopy className="copy-icon" onClick={copyToClipboard} />
      </div>

      {/* Share Button */}
      <button className="share-button" onClick={shareReferral}>
        <FaShareAlt className="share-icon" /> Share Invite
      </button>

      {/* Toast */}
      {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

    </div>
  );
}
