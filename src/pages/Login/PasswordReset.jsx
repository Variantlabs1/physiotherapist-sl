import React, { useState } from 'react'
import styled from 'styled-components';
import {auth} from "../../firebase"
import {  sendPasswordResetEmail,  } from 'firebase/auth';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [resetEmailSent, setResetEmailSent] = useState(false);

    const handleResetPassword = async (e) => {
      e.preventDefault();
      try {
        await sendPasswordResetEmail(auth,email);

        setResetEmailSent(true);
      } catch (error) {
        console.error('Error sending reset email:', error.message);
        alert('An error occured sending reset email.')
      }
    };


  
    return (
      <ForgetPasswordContainer onSubmit={handleResetPassword}>
              {resetEmailSent ? (
        <p>Password reset email sent. Check your inbox for further instructions.</p>
      ) : (
        <ForgetPasswordForm >
            <h1>Vigour-fit.com</h1>
          <p>Please enter the email you used for creating your account.</p>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton type="submit">Send Reset Link</SubmitButton>
        </ForgetPasswordForm>
      )
}
      </ForgetPasswordContainer>
    );
  };

export default PasswordReset

const ForgetPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ForgetPasswordForm = styled.form`
  width: 30vw;
  padding: 80px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  gap: 15px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* height: 40vh; */
  &>h1{
    align-self: center;
    margin-bottom: 30px;
    font-size: 50px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 17px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 17px;
  cursor: pointer;
`;
