import React, { useRef, useState } from 'react';
import './OTPVerification.css';
import apiClient from '../../api/apiClient';

const inputLength = 6;

function OTPVerification({ sessionId, username, email='@trustai.com', onClose }) {
  const [otp, setOtp] = useState(Array(inputLength).fill(''));
  const inputs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
    

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val) {
      const newOtp = [...otp];
      newOtp[idx] = val;
      setOtp(newOtp);
      
      // Move to next input
      if (idx < inputLength - 1) {
        inputs.current[idx + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace') {
      e.preventDefault(); // Prevent default browser behavior
      const newOtp = [...otp];

      if (otp[idx]) {
        // Clear current value if not empty
        newOtp[idx] = '';
        setOtp(newOtp);
      } else if (idx > 0) {
        // Move to previous input if current is empty
        inputs.current[idx - 1]?.focus();
        newOtp[idx - 1] = '';
        setOtp(newOtp);
      }
    } else if (e.key >= '0' && e.key <= '9') {
      setOtp(prev => {
        const next = [...prev];
        next[idx] = '';
        return next;
      });
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputs.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < inputLength - 1) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    const otpCode = otp.join('');
    if (otpCode.length !== inputLength) {
      setError('Please enter the full OTP.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiClient.post('/api/verify-otp', {
        otp: otpCode,
        sessionId,
        username,
      });

      setSuccess('OTP verified successfully!');
      console.log('✅ Verified:', response.data);
    } catch (err) {
      console.error('❌ Verification failed:', err);
      setError(err.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{background: '#fff'}}>
    {/* <div style={{background: '#fff', padding: '16px'}}>
        <button 
            onClick={() => onClose()}
            style={{background: 'transparent'}}>
            &#x276E;
        </button>
    </div> */}

    <div className="otp-outer-container">
      <div className="otp-container">
        <h2>OTP Verification</h2>
        <p>Enter the 6-digit code sent to <br/> your email <span style={{color: '#1046c7'}}>{email}</span></p>
        <form autoComplete="off">
          <div className="otp-inputs">
            {Array(inputLength).fill().map((_, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                value={otp[idx]}
                ref={el => inputs.current[idx] = el}
                onChange={e => handleChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
                onFocus={handleFocus}
                className="otp-input"
              />
            ))}
          </div>
            <button type="submit" className="otp-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify'}
            </button>

            {error && <p className="otp-error">{error}</p>}
            {success && <p className="otp-success">{success}</p>}
        </form>
        <a href="#" className="resend">Resend Code?</a>
      </div>
    </div>
    </div>
  );
}

export default OTPVerification;
