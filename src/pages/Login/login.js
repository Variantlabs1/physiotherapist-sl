import React, { useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Box, Center, Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import classes from "./Login.module.scss";

function Login() {
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      toast({
        title: "Email or Password cannot be empty!",
        status: "error",
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(() => {
        setSubmitButtonDisabled(false);
        navigate("/Dashboard");
        setLoading(false);
      })
      .catch(() => {
        setSubmitButtonDisabled(false);
        toast({
          title: "Invalid Email or Password",
          status: "error",
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const handleAnimation = async () => {
    const arrowElement = document.getElementById("arrow");
    if (arrowElement) {
      await animate("#arrow", { x: 10, scale: 1.1 });
    }
  };

  const handleAnimationClose = async () => {
    const arrowElement = document.getElementById("arrow");
    if (arrowElement) {
      await animate("#arrow", { x: 0, scale: 1 });
    }
  };

  return (
    <div className={classes.rootLogin}>
      <div className={classes.overlay}></div>
      <div className={classes.bgImage}></div>
      <div className={classes.containerMain}>
        <div className={classes.header}>
          <p>Login</p>
        </div>

        <div className={classes.container}>
          <div className={classes.email}>
            <div className={classes.label}>
              <p>Email</p>
            </div>
            <div className={classes.input}>
              <Center className={classes.icon}>
                <MdEmail className={classes.emailIcon} />
              </Center>

              <input
                type="email"
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    email: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className={classes.password}>
            <div className={classes.label}>
              <p className={classes.pass}>Password</p>
              <Center className={classes.forgot}>
                <Link to="/password-recovery">Forgot Password?</Link>
              </Center>
            </div>
            <div className={classes.input}>
              <Center className={classes.icon}>
                <RiLockPasswordFill className={classes.passwordIcon} />
              </Center>

              <input
                type={showPassword ? "text" : "password"}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    pass: event.target.value,
                  }))
                }
              />
              <Center className={classes.passicon}>
                {showPassword ? (
                  <IoEyeOutline
                    className={classes.EyeIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IoEyeOffOutline
                    className={classes.EyeIcon}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </Center>
            </div>
          </div>

          <div className={classes.buttons} ref={scope}>
            <motion.div
              onHoverStart={!loading && handleAnimation}
              onHoverEnd={!loading && handleAnimationClose}
              whileTap={{ scale: 0.9 }}
              className={classes.signin}
              onClick={handleSubmission}
              disabled={submitButtonDisabled}
            >
              <Flex gap="10px" color="white">
                <Text>Log In</Text>
                {loading ? (
                  <Spinner color="white" />
                ) : (
                  <Center id="arrow">
                    <FaArrowRightLong color="white" />
                  </Center>
                )}
              </Flex>
            </motion.div>
            <div className={classes.signup}>
              <p>Don't have an account? </p>
              <Link to="/signup" className={classes.link}>
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
