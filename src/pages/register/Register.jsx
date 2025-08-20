import React, { useState, useEffect } from "react";
import "./register.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../../api/apiClient";
import Toast from "../referral/toast/Toast";
import OTPVerification from "../otp/OTPVerification";
import RightPanel from "../../components/panel/RightPanel"; // Path to your RightPanel component

const TIMER_DELAY_SECONDS = 60;

const Register = () => {
  const [searchParams] = useSearchParams();
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [toast, setToast] = useState(null);
  const [showOtpPanel, setShowOtpPanel] = useState(false);

  const [formData, setFormData] = useState({
    username: "johndoe",
    password: "12345",
    confirmPassword: "12345",
    mobile: "",
    email: "john@doe.com",
    referralCode: "123",
    otp: "",
  });

  // Populate referralCode from URL
  useEffect(() => {
    const referral = searchParams.get("referral");
    if (referral) {
      setFormData((prev) => ({ ...prev, referralCode: referral }));
    }
  }, [searchParams]);

  // Timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.email || !formData.referralCode) {
      alert("Please fill all mandatory fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Instead of registering immediately, show OTP panel
    setShowOtpPanel(true);
  };

  return (
    <div className="register section__padding">
      <div className="register-container">
        <h1>Register</h1>
        <form className="register-writeForm" autoComplete="off" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="register-formGroup">
            <label>
              Username <span className="required">*</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="Please enter user name"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="register-formGroup">
            <label>
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Please enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password */}
          <div className="register-formGroup">
            <label>
              Confirm password <span className="required">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Please re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Mobile */}
          <div className="register-formGroup">
            <label>Mobile No.</label>
            <input
              type="number"
              name="mobile"
              placeholder="Enter Mobile No."
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className="register-formGroup">
            <label>
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Referral Code */}
          <div className="register-formGroup">
            <label>
              Referral code <span className="required">*</span>
            </label>
            <input
              type="text"
              name="referralCode"
              placeholder="Enter your Referral Code"
              value={formData.referralCode}
              onChange={handleChange}
            />
          </div>

          {/* Register Button */}
          <div className="register-formGroup">
            <button
              type="submit"
              className="register-writeButton"
              disabled={loading || attempts >= maxAttempts}
            >
              Register
            </button>
          </div>

          {/* Link to Login */}
          <div>
            <p className="title-black">
              Have an account?{" "}
              <Link to="/login">
                <span className="specialText">Login</span>
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* RightPanel with OTPVerification */}
      <RightPanel isOpen={showOtpPanel} onClose={() => setShowOtpPanel(false)}>
        <OTPVerification
          username={formData.username}
          email={formData.email}
          sessionId={"dummy-session-id"}
          onClose={() => setShowOtpPanel(false)}
        />
      </RightPanel>
    </div>
  );
};

export default Register;
