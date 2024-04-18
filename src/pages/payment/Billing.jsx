import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import StripeCheckoutForm from "./Stripe";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../components/data_fetch/authProvider";
import classes from "./Billing.module.css";

const Billing = () => {
  const { user } = useContext(AuthContext);

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const getPayments = async () => {
      try {
        const userQuery = query(
          collection(db, "physiotherapist"),
          where("physiotherapistId", "==", user.uid)
        );
        const getUser = await getDocs(userQuery);
        const userDocRef = getUser.docs[0].ref;
        const res = await getDocs(
          query(collection(userDocRef, "payments"), orderBy("paid_on", "asc"))
        );
        setPayments(res.docs.map((doc) => doc.data()).reverse());
      } catch (e) {
        console.log(e);
      }
    };
    user && getPayments();
  }, [user]);

  return (
    <div className={classes.container}>
      <h1>Billing</h1>

      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.top}>
            <h2>Order History</h2>
            <p style={{ color: "#747399" }}>
              Manage billing information and view reciepts
            </p>
          </div>
          <div className={classes.payments}>
            {payments.length > 0 && (
              <div className={classes.payment}>
                <p>Date</p>
                <p>Amount</p>
                <p style={{ paddingLeft: "5%" }}>Status</p>
                {/* <p>Reciept</p> */}
              </div>
            )}

            {payments.length > 0 ? (
              payments.map((item, i) => (
                <div className={classes.payment} key={i}>
                  <h3>{new Date(item.paid_on.toDate()).toDateString()}</h3>
                  <h3>${item.amount_total_in_cents / 100}</h3>
                  <h3 style={{ color: "#088f14", paddingLeft: "5%" }}>
                    {item.status}
                  </h3>
                  {/* <Button>Download</Button> */}
                </div>
              ))
            ) : (
              <h1>No transactions.</h1>
            )}
          </div>
        </div>
      </div>
      <StripeCheckoutForm />
    </div>
  );
};

export default Billing;
