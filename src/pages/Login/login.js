import classes from "./Login.module.scss";
import login from "../../assets/login.png";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { motion, useAnimate } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { Center, Flex, Text } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

function Login() {
  const [scope, animate] = useAnimate();
  //for authentication
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Email or Password cannot be empty!");
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
        setErrorMsg("Invalid Email or Password");
        console.log(err);
      });
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

              <div className={classes.inputEmail}>
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
          </div>

          <div className={classes.password}>
            <div className={classes.label}>
              <p className={classes.pass}>Password</p>
              <Center className={classes.forgot}>
                <Link to="/password-recovery">Forgot Password?</Link>
              </Center>
            </div>
            <div className={classes.input}>
              <div className={classes.icon}>
                <RiLockPasswordFill className={classes.passwordIcon} />
              </div>

              <div className={classes.inputPassword}>
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      pass: event.target.value,
                    }))
                  }
                />
              </div>
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
              onHoverStart={handleAnimation}
              onHoverEnd={handleAnimationClose}
              whileTap={{ scale: 0.9 }}
              className={classes.signin}
              onClick={handleSubmission}
              disabled={submitButtonDisabled}
            >
              <Flex
                w={["35%", "40%", "50%", "50%"]}
                m="auto"
                justifyContent="space-between"
                color="white"
              >
                <Text>Log In</Text>
                <Center id="arrow">
                  <FaArrowRightLong color="white" size={10} />
                </Center>
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
      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, x: [90, 0], scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className={classes.errorpopup}
        >
          <p>{errorMsg}</p>
          <div>
            <RxCross2
              color="white"
              onClick={() => {
                setErrorMsg(null);
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Login;
