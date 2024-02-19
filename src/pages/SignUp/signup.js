import { useState } from "react";
import React from "react";
import classes from "./Signup.module.scss";

import { useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { motion } from "framer-motion";

const Login = () => {
    //for authentication
    //Data we are taking from user
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [bio, setBio] = useState("");
    const [experience, setExperience] = useState("");

    //For authentication purpose
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // State variables for error messages
    const [nameError, setNameError] = useState("Name is required");
    const [emailError, setEmailError] = useState("Email is required");
    const [passwordError, setPasswordError] = useState("Password is required");
    const [confirmPasswordError, setConfirmPasswordError] = useState(
        "Please confirm your password"
    );
    const [contactNoError, setContactNoError] = useState(
        "Phone number is required"
    );
    const [ageError, setAgeError] = useState("Age is required");
    const [firebaseError, setFirebaseError] = useState("");
    const [showErrorPopup, setShowErrorPopup] = useState(false);

    // Validation functions
    const validateName = (name) => {
        if (name.trim() === "") {
            setNameError("Name is required");
        } else {
            setNameError("");
        }
    };

    const validateEmail = (email) => {
        if (email.trim() === "") {
            setEmailError("Email is required");
        } else {
            // You can add a more comprehensive email validation logic here
            const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailPattern.test(email)) {
                setEmailError("Invalid email address");
            } else {
                setEmailError("");
            }
        }
    };

    const validatePassword = (password) => {
        if (password.trim() === "") {
            setPasswordError("Password is required");
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
        } else {
            setPasswordError("");
        }
    };

    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword.trim() === "") {
            setConfirmPasswordError("Please confirm your password");
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    };

    const validateContactNo = (contactNo) => {
        if (contactNo.trim() === "") {
            setContactNoError("Phone number is required");
        } else if (!/^\d+$/.test(contactNo)) {
            setContactNoError("Invalid phone number");
        } else {
            setContactNoError("");
        }
    };

    const validateAge = (age) => {
        if (age < 0) {
            setAgeError("Enter Correct age");
        } else {
            setAgeError("");
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
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
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
        // Check error state variables to determine if the form is valid
        if (
            !nameError &&
            !emailError &&
            !passwordError &&
            !confirmPasswordError &&
            !contactNoError &&
            !ageError
        ) {
            // Form is valid, proceed with submission

            try {
                await createUserWithEmailAndPassword(auth, email, password);

                //Creating a referal code for the physiotherapist
                const userId = auth?.currentUser?.uid;
                let code = "";

                for (let i = 0; i < 6; i++) {
                    const randomIndex = Math.floor(
                        Math.random() * userId.length
                    );
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
                    accountStatus: true
                });

                console.log(code);
                navigate("/home");
            } catch (err) {
                // Capture and display the Firebase error message
                setFirebaseError(err.message);
                setShowErrorPopup(true);
            }
        } else {
            // Show the error pop-up
            setShowErrorPopup(true);
        }
    };

    // Close the error pop-up
    const handleCloseErrorPopup = () => {
        setShowErrorPopup(false);
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <div className={classes.rootSignup}>
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.header}>
                        <div className={classes.heading}>
                            <p className={classes.l1}>Sign Up</p>
                            <p className={classes.l2}>Create an Account</p>
                        </div>
                    </div>
                    <form
                        className={classes.form}
                        action="#"
                        onSubmit={handleSubmit}
                    >
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
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className={classes.inputBoxNormal}>
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="Email"
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className={classes.column}>
                            <div className={classes.inputBox}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    placeholder="XXXXXXXXXXX"
                                    onChange={handlePasswordChange}
                                />
                            </div>
                            <div className={classes.inputBox}>
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="XXXXXXXXXXX"
                                    onChange={handleConfirmPasswordChange}
                                />
                            </div>
                        </div>

                        <div
                            className={`${classes.column} ${classes.columnph}`}
                        >
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

                        <div className={classes.column2}>
                            <div className={classes.inputBox}>
                                <label>Age</label>
                                <input
                                    type="number"
                                    min="0"
                                    placeholder="XX"
                                    onChange={handleAgeChange}
                                />
                            </div>
                            <div className={classes.inputBox}>
                                <label>Gender</label>
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
                        <div className={classes.footer}>
                            <motion.button type="submit" whileTap={{ scale: 0.9 }}>Submit</motion.button>
                            <span onClick={handleLoginClick}>
                                Already have an account? Log In
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            {/* Error pop-up */}
            {showErrorPopup && (
                <div className={classes.errorPopup}>
                    <div className={classes.errorPopupContent}>
                        <h2>Error!</h2>

                        <ul>
                            {nameError && <li>{nameError}</li>}
                            {emailError && <li>{emailError}</li>}
                            {passwordError && <li>{passwordError}</li>}
                            {confirmPasswordError && (
                                <li>{confirmPasswordError}</li>
                            )}
                            {contactNoError && <li>{contactNoError}</li>}
                            {ageError && <li>{ageError}</li>}
                            {firebaseError && <li>{firebaseError}</li>}
                        </ul>

                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            className={classes.closeErrorPopup}
                            onClick={handleCloseErrorPopup}
                        >
                            <span>Close</span>
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
