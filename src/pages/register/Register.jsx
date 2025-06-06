import React from 'react';
import './register.css'
import {Link} from 'react-router-dom'
import Image from '../../assets/Image.png'

const Register = () => {

  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>register</h1>
        {/* <p className='upload-file'>Upload Profile pic</p>
        <div className="upload-img-show">
          <img src={Image} alt="banner" />
          <p>browse media on your device</p>
        </div> */}
        <form className='register-writeForm' autoComplete='off' >
          {/* <div className="register-formGroup">
            <label>Upload</label>
            <input type="file" className='custom-file-input'/>
          </div> */}
          {/* <div className="register-formGroup">
            <label>Full Name</label>
            <input type="text" placeholder='Name' />
          </div> */}
          <div className="register-formGroup">
            <label>Username <span className="required">*</span></label>
            <input type="text" placeholder='Please enter user name'  />
          </div>
          <div className="register-formGroup">
            <label>Password <span className="required">*</span></label>
            <input type="text" placeholder='Please enter your password'   />
          </div>
          <div className="register-formGroup">
            <label>Confirm password <span className="required">*</span></label>
            <input type="text" placeholder='Please re-enter your password'   />
          </div>
          <div className="register-formGroup">
            <label>Mobile No.</label>
            <input type="text" placeholder='Enter Mobile No.'/>
          </div>

          <div className="register-formGroup">
            <label>Email <span className="required">*</span></label>
            <input type="email" placeholder='Please enter your email' />
          </div>

          <div className="register-formGroup">
            <label>Referral code <span className="required">*</span></label>
            <input type="email" placeholder='Enter your Referral Code' />
          </div>

          <div className="register-formGroup">
            <button className='register-writeButton'>register</button>
          </div>

          <div className=''>
            <p className="title-black">Have an account? <Link to="/login"><span className='specialText'>Login</span></Link></p>  
          </div>

         {/* <div className="register-button">
          <button className='register-writeButton'>register</button>
          <Link to="/login">
            <button className='reg-login-writeButton' >Login</button>
          </Link>
         </div> */}
        </form>
      </div>
    </div>
   )
};

export default Register;
