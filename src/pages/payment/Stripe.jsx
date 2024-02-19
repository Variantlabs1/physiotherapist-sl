import React, { useContext } from 'react';
import styled from 'styled-components';
import {AuthContext} from "../../components/data_fetch/authProvider"
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import classes from "./Billing.module.css";

const StripeCheckoutForm = () => {
  const {user} = useContext(AuthContext)

  const handlePayment = async () => {
    try{
    const q = query(collection(db,"physiotherapist"),where('physiotherapistId',"==",user?.uid))
    const res = await getDocs(q)
    const userDocId = res.docs[0].ref.id
    console.log(userDocId)
    if(userDocId){

    const response =  await fetch('https://us-central1-physiotherapistadmin.cloudfunctions.net/checkout', {
      method: 'POST',
      body:JSON.stringify({userDocId}),
      headers:{
        'Content-Type':'application/json'
      }
    });

    const session = await response.json();
  window.location.replace(session.url)
  }
  }catch(e){
    console.log(e)
  }
  };

  return (
    <div className={classes.button}>
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default StripeCheckoutForm;
