import './newlogin.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
      email: "",
      pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
      if (!values.email || !values.pass) {
          setErrorMsg("Fill all fields");
          return;
      }
      setErrorMsg("");

      setSubmitButtonDisabled(true);
      signInWithEmailAndPassword(auth, values.email, values.pass)
          .then(async (res) => {
              setSubmitButtonDisabled(false);
              navigate("/Dashboard");
          })
          .catch((err) => {
              setSubmitButtonDisabled(false);
              setErrorMsg(err.message);
              console.log(err)
          });
  };
  console.log(errorMsg)
  return (
    <div className='child-container'>
      <div className='wrapper-container' >
        <div className='inner-container'>
          <p className='LogIn'>Log In</p>
          <div>
            <label className="currentEmail"></label>
            <input type="email" id="currentEmail" className='input' placeholder='Email'    
                                           onChange={(event) =>
                                            setValues((prev) => ({
                                                ...prev,
                                                email: event.target.value,
                                            }))
                                        } />
          </div>
          <div>
            <label className="currentPassword"></label>
            <input type="password" id="newPassword" className='input' placeholder='Password'
               onChange={(event) =>
                setValues((prev) => ({
                    ...prev,
                    pass: event.target.value,
                }))
            } />
          </div>
          <div className="checkbox-forgot-container">
            <div className='checkbox-label'>
              <input type="checkbox" id="rememberMe" className="checkbox-input" />
              <label htmlFor="rememberMe" className="checkbox-label" >Keep me logged in</label>
            </div>
            <a href="/password-recovery/email" className='forgotpassword'>Forgot Password?</a>
          </div>
          <button className='btn'
           onClick={handleSubmission}
          disabled={submitButtonDisabled}
          
          >Log In</button>
          <div className='noAccount'>Don't have an account?<a href='/home'>Register</a></div>
          <div class="footer-text">
            <p>Terms of Use</p>
            <div class="vertical-line"></div>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
);

}

export default ForgotPassword;