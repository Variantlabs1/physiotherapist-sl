import React, { useState } from 'react'
import classes from "./PasswordReset.module.css"
import {auth} from "../../firebase"
import {  sendPasswordResetEmail,  } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Text } from '@chakra-ui/react';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const navigate = useNavigate();

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

    const backToLogin = () => {
        navigate("/login");
    }
    const handleBack = () => {
        navigate(-1);
    }
  
    return (
      <div className={classes.Header} onSubmit={handleResetPassword}>
              {resetEmailSent ? (
        <>
          <p>Password reset email sent. Check your inbox for further instructions.</p>
          <Text cursor='pointer' onClick={backToLogin}>Back to Login Page</Text>
        </>
      ) : (
        <div className={classes.form}>
            <h1>Vigour-fit.com</h1>
          <p>Please enter the email you used for creating your account.</p>
            <Input
            backgroundColor="white"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <Button type="submit" colorScheme='blue' onClick={handleResetPassword}>Send Reset Link</Button>
          <Button type="submit" colorScheme='blue' variant='outline' onClick={handleBack}>Cancel</Button>
        </div>
      )
}
      </div>
    );
  };

export default PasswordReset