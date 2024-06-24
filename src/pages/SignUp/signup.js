import { useState } from "react";
import React from "react";
import classes from "./Signup.module.scss";
import { SiSpringsecurity } from "react-icons/si";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { motion, useAnimate } from "framer-motion";
import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";

const Login = () => {
  const [scope, animate] = useAnimate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  //For authentication purpose
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showReenteredPassword, setShowReenteredPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // State variables for error messages
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleAnimation = async () => {
    animate("#arrow", { x: 10, scale: 1.1 });
  };
  const handleAnimationClose = async () => {
    animate("#arrow", { x: 0, scale: 1 });
  };

  // Validation functions
  const validateName = (name) => {
    if (name.trim() === "") {
      setErrorMsg("Error! Some fields are empty");
    } else {
      setErrorMsg("");
    }
  };

  const validateEmail = (email) => {
    if (email.trim() === "") {
      setErrorMsg("Error! Some fields are empty");
    } else {
      // You can add a more comprehensive email validation logic here
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        setErrorMsg("Error! Invalid Email");
      } else {
        setErrorMsg("Error! Some fields are empty");
      }
    }
  };

  const validatePassword = (password) => {
    if (password.trim() === "") {
      setErrorMsg("Error! Some fields are empty");
    } else if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
    } else {
      setErrorMsg("");
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword.trim() === "") {
      setErrorMsg("Error! Some fields are empty");
    } else if (confirmPassword !== currentPassword) {
      setErrorMsg("Passwords do not match");
    } else {
      setErrorMsg("");
    }
  };

  const validateContactNo = (contactNo) => {
    if (contactNo.trim() === "") {
      setErrorMsg("Error! Some fields are empty");
    } else if (!/^\d+$/.test(contactNo)) {
      setErrorMsg("Invalid phone number");
    } else {
      setErrorMsg("");
    }
  };

  const validateAge = (age) => {
    if (age.trim() == "") {
      setErrorMsg("Errror! Some fields are empty");
    } else if (age < 0) {
      setErrorMsg("Enter Correct age");
    } else {
      setErrorMsg("");
    }
  };

  // Event handlers for input change
  const handleNameChange = (e) => {
    setName(e.target.value);
    validateName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setCurrentPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setReenteredPassword(e.target.value);
    validateConfirmPassword(e.target.value);
  };

  const handleContactNoChange = (e) => {
    setContactNo(e.target.value);
    validateContactNo(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    validateAge(e.target.value);
  };

  // Submit handler

  const navigate = useNavigate();

  //ref for pushing data
  const userDataRef = collection(db, "physiotherapist");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !age ||
      !contactNo ||
      !username ||
      !experience ||
      !gender ||
      !currentPassword ||
      !reenteredPassword
    ) {
      setErrorMsg("Error!, some fiels are empty");
      return;
    }
    // Check error state variables to determine if the form is valid
    if (!errorMsg) {
      // Form is valid, proceed with submission
      setLoading(true);
      try {
        await createUserWithEmailAndPassword(auth, email, currentPassword);

        //Creating a referal code for the physiotherapist
        const userId = auth?.currentUser?.uid;
        let code = "";

        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * userId.length);
          code += userId.charAt(randomIndex);
        }

        // Format the current date
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString("en-US", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        });

        await addDoc(userDataRef, {
          name: name,
          username: username,
          contactNo: contactNo,
          gender: gender,
          age: age,
          bio: bio,
          email: email,
          experience: experience,
          physiotherapistId: auth?.currentUser?.uid,
          referralCode: code,
          profileImageURL:
            "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg?size=626&ext=jpg&ga=GA1.2.1991124506.1689017917&semt=sph",
          accCreated: formattedDate,
          accountStatus: true,
        });

        console.log(code);
        navigate("/");
        setLoading(false);
      } catch (err) {
        // Capture and display the Firebase error message
        setLoading(false);
        setErrorMsg(err.message);
        setShowErrorPopup(true);
      }
    }
  };

  // Close the error pop-up

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Center className={classes.rootSignup}>
      <div className={classes.overlay}></div>
      <div className={classes.bgImage}></div>
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.header}>
            <p>Sign Up</p>
          </div>
          <form className={classes.form} action="#" onSubmit={handleSubmit}>
            <div className={classes.column}>
              <div className={classes.inputBox}>
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  onChange={handleNameChange}
                />
              </div>
              <div className={classes.inputBox}>
                <label>User Name</label>
                <input
                  type="text"
                  placeholder="Dr. XYZ"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className={classes.column}>
              <div className={classes.inputBox}>
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={handleEmailChange}
                />
              </div>
              <div className={classes.inputBox}>
                <label>Phone</label>
                <input
                  type="numerical"
                  placeholder="Phone No."
                  onChange={handleContactNoChange}
                />
              </div>
            </div>

            <div className={classes.column}>
              <div className={classes.inputBox}>
                <label>Password</label>
                <div className={classes.box}>
                  <SiSpringsecurity className={classes.SecurityIcon} />
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={handlePasswordChange}
                  />
                  {showCurrentPassword ? (
                    <IoEyeOutline
                      className={classes.EyeIcon}
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    />
                  ) : (
                    <IoEyeOffOutline
                      className={classes.EyeIcon}
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    />
                  )}
                </div>
              </div>
              <div className={classes.inputBox}>
                <label>Confirm Password</label>
                <div className={classes.box}>
                  <SiSpringsecurity className={classes.SecurityIcon} />
                  <input
                    type={showReenteredPassword ? "text" : "password"}
                    value={reenteredPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  {showReenteredPassword ? (
                    <IoEyeOutline
                      className={classes.EyeIcon}
                      onClick={() =>
                        setShowReenteredPassword(!showReenteredPassword)
                      }
                    />
                  ) : (
                    <IoEyeOffOutline
                      className={classes.EyeIcon}
                      onClick={() =>
                        setShowReenteredPassword(!showReenteredPassword)
                      }
                    />
                  )}
                </div>
              </div>
            </div>

            <div className={classes.column}>
              <div className={classes.inputBox}>
                <label>Bio</label>
                <input
                  type="text"
                  placeholder="Bio!"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>

            <div className={classes.bio}>
              <label>Experience</label>
              <textarea
                type="text"
                placeholder="Experience!"
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className={classes.column}>
              <div className={classes.inputBox}>
                <label>Age</label>
                <input
                  type="number"
                  placeholder="age"
                  min="0"
                  onChange={handleAgeChange}
                />
              </div>
              <div className={classes.inputBox}>
                <label>Gender</label>
                <div>
                  <select
                    className={classes.gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={classes.footer} ref={scope}>
              <motion.div
                onHoverStart={!loading && handleAnimation}
                onHoverEnd={!loading && handleAnimationClose}
                whileTap={{ scale: 0.9 }}
                className={classes.signup}
                onClick={handleSubmit}
              >
                <Flex justifyContent="center" color="white" gap={3}>
                  <Text>Submit</Text>
                  {loading ? (
                    <Spinner color="white" />
                  ) : (
                    <Center id="arrow">
                      <FaArrowRightLong color="white" />
                    </Center>
                  )}
                </Flex>
              </motion.div>
              <p style={{ color: "#181818" }} onClick={handleLoginClick}>
                Already have an account? <span>Log In</span>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Error pop-up */}
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
    </Center>
  );
};

export default Login;
