import React from 'react';
import './forgot.css'
import {Link} from 'react-router-dom'

const Forgot = () => {
  return (
    <div className='forgot section__padding'>
      <div className="forgot-container">
        {/* <h1>Forgot</h1> */}
        
        <form className='forgot-writeForm' autoComplete='off'>
          <div className="forgot-formGroup">
            <label>Email <span className="required">*</span></label>
            <input type="text" placeholder='Enter your email'  />
          </div>

            <div className='forgot-formGroup'>    
              <div className='group'>             
                <input type="text" placeholder='Verification code' />
                <button >Get</button>
                </div>           
            </div>

            <div className="forgot-formGroup">
              <label>Password <span className="required">*</span></label>
              <input type="password" placeholder='Enter your password'  />
            </div>

            <div className="forgot-formGroup">
              <label>Confirm Password <span className="required">*</span></label>
              <input type="password" placeholder='Re-enter your password'  />
            </div>         



         <div className="login-formGroup">
            <button className='register-writeButton' type='submit'>Confirm</button>
          </div>

          <div className=''>
            <p className="title-black">Have an account? <Link to="/login"><span className='specialText'>Cancel</span></Link></p>  
          </div>


        </form>
      </div>
    </div>
   )
};

export default Forgot;
