import React, { useState, useEffect } from "react";
import "./register.css";
import { Link, useSearchParams } from "react-router-dom";
import apiClient from "../../api/apiClient"; // <-- your axios instance
import Toast from "../referral/toast/Toast";

const TIMER_DELAY_SECONDS = 60;

const Register = () => {
  const [searchParams] = useSearchParams();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);  
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    email: "john@doe.com",
    referralCode: "",
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  // Send OTP API call
  const handleSendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email first.");
      return;
    }
    try {
      setLoading(true);
      await apiClient.post("/send-otp", { email: formData.email });
      setOtpSent(true);
      showToast("OTP sent to your email.", "success");
      setTimer(TIMER_DELAY_SECONDS);
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP API call
  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      alert("Enter the OTP to verify.");
      return;
    }
    try {
      setLoading(true);
      const res = await apiClient.post("/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      if (res.data.success) {
        setOtpVerified(true);
        alert("OTP verified successfully.");
      } else {
        alert("Invalid OTP.");
      }
    } catch (error) {
      console.error(error);
      alert("OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Submit handler for register
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
    if (!otpVerified) {
      alert("Please verify your email OTP first.");
      return;
    }

    try {
      setLoading(true);
      setAttempts((prev) => prev + 1);
      await apiClient.post("/register", formData);
      alert("Registration successful.");
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register section__padding">
      <div className="register-container">
        <h1>Register</h1>
        <form
          className="register-writeForm"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
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


          {/* OTP + Verify */}
          <div className="form-group">
            <div className="otp-wrapper">
              <input
                type="text"
                name="otp"
                placeholder="Verification Code"
                value={formData.otp}                
                onChange={handleChange} 
                className="otp-input"
              />
              {timer > 0 ? (
                <span className="otp-timer">
                  {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
                </span>
              ) : (
                <button
                  type="button"
                  className="btn-send-otp"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  Send OTP
                </button>
              )}
            </div>
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
    </div>
  );
};

export default Register;
