import React, { useState } from "react";
import classes from "./PasswordReset.module.scss";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { motion, useAnimate } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const PasswordReset = () => {
  const [scope, animate] = useAnimate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email == "") {
      setErrorMessage("Email cannot be empty");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setResetEmailSent(true);
    } catch (error) {
      console.error("Error sending reset email:", error.message);
      setLoading(false);
      setErrorMessage("Error! Inavlid Email");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  const handleAnimation = async () => {
    animate("#arrow", { x: 10, scale: 1.4 });
  };
  const handleAnimationClose = async () => {
    animate("#arrow", { x: 0, scale: 1 });
  };
  return (
    <div className={classes.rootLogin}>
      <div className={classes.overlay}></div>
      <div className={classes.bgImage}></div>
      <div className={classes.containerMain}>
        <div className={classes.icon}>
          <Center className={classes.closeicon} onClick={() => handleBack()}>
            <MdClose size={35} />
          </Center>
        </div>
        <div className={classes.header}>
          <p>Forgot Password</p>
        </div>
        {!resetEmailSent ? (
          <div className={classes.container}>
            <div className={classes.email}>
              {/* <div className={classes.text}>
              Please enter the registered email id
            </div> */}
              <div className={classes.label}>
                <p>Please enter the registered email id</p>
              </div>
              <div className={classes.input}>
                <MdEmail className={classes.emailIcon} />

                <input
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className={classes.buttons} ref={scope}>
              <motion.div
                onHoverStart={!loading && handleAnimation}
                onHoverEnd={!loading && handleAnimationClose}
                whileTap={{ scale: 0.9 }}
                className={classes.signin}
                onClick={handleResetPassword}
              >
                <Flex justifyContent="center" color="white" gap={3}>
                  <Text>Send Link</Text>
                  {loading ? (
                    <Spinner color="white" />
                  ) : (
                    <Center id="arrow">
                      <FaArrowRightLong color="white" />
                    </Center>
                  )}
                </Flex>
              </motion.div>
            </div>
          </div>
        ) : (
          <div>
            <div className={classes.confirmText}>
              An email has been sent to you registered email id
            </div>
            <div className={classes.buttons} ref={scope}>
              <motion.div
                onHoverStart={handleAnimation}
                onHoverEnd={handleAnimationClose}
                whileTap={{ scale: 0.9 }}
                className={classes.signin}
                onClick={() => handleBack()}
              >
                <Flex justifyContent="center" color="white" gap={3}>
                  <Text>Back to login</Text>
                  <Center id="arrow">
                    <FaArrowRightLong color="white" size={10} />
                  </Center>
                </Flex>
              </motion.div>
            </div>
          </div>
        )}
      </div>
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, x: [90, 0], scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className={classes.errorpopup}
        >
          <p>{errorMessage}</p>
          <div>
            <RxCross2
              color="white"
              onClick={() => {
                setErrorMessage(null);
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PasswordReset;
