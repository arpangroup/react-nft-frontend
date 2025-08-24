import React, { useContext, useState } from 'react';
import './login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import { API_ROUTES } from '../../api/apiRoutes.js';
import apiClient from '../../api/apiClient.jsx';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Where to redirect after login (default /dashboard)
  const from = location.state?.from?.pathname || '/';


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      //console.log('Calling ACCESS_TOKEN...');
      const res = await apiClient.post(API_ROUTES.AUTH_API.ACCESS_TOKEN, {
        username,
        password,
        flow: 'password',
      });

      const {
      accessToken,
      refreshToken,
      accessTokenExpiry,
      refreshTokenExpiry
    } = res.data;
      // Store tokens in AuthContext
      login(accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry);

      // Navigate to previous or default route
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className='login section__padding'>
      <div className="login-container">
        <h1>Login</h1>
        <form className='login-writeForm' onSubmit={handleLogin} autoComplete="off">
          <div className="login-formGroup">
            <label>Username <span className="required">*</span></label>
            <input 
              type="text" 
              placeholder='Username'
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-formGroup">
            <label>Password <span className="required">*</span></label>
            <input 
              type="password" 
              placeholder='Password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          
         {/* <div className="login-button">
          <button className='login-writeButton' type='submit'>Login</button>
          <Link to="/register">
            <button className='login-reg-writeButton' type='submit'>Register</button>
          </Link>
         </div> */}

         <div className="login-formGroup">
            <button className='register-writeButton' type='submit'>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>

          <div className=''>
            <p className="title-black">Don't have an account? <Link to="/register"><span className='specialText'>Register</span></Link></p>  
          </div>


        </form>
      </div>
    </div>
   )
};
