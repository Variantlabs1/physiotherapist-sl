import "./Settings.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { signOut } from "firebase/auth";
import ResetPassword from "./resetPassword";
import { handleUpload } from "./upload";
import "../../styles/loading.css";
import useDate from "../../components/useDate";
import { Box, Flex } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const Settings = () => {
  const date = useDate();
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [file, setFile] = useState(null);
  const [userDocId, setUserDocId] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedAuthState = localStorage.getItem("authState");
      const user = JSON.parse(storedAuthState);
      console.log(user.uid);
      if (!storedAuthState) return; // Exit if user is not authenticated
      const userId = user.uid;
      const userDataRef = collection(db, "physiotherapist");
      const userQuery = query(
        userDataRef,
        where("physiotherapistId", "==", userId)
      );

      const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const userDocData = data[0];
        setUserData(userDocData);
        setEditedUserData(userDocData);
        setUserDocId(querySnapshot.docs[0].id);
      });

      return () => unsubscribe();
    };

    fetchUserData();
  }, []);

  const handleCancel = () => {
    console.log("Cancel");
    setEditedUserData(userData);
  };

  useEffect(() => {
    const updateUserDoc = async (data) => {
      try {
        const userDocRef = doc(db, "physiotherapist", userDocId);

        await updateDoc(userDocRef, data);
        console.log("Profile updated successfully!");
        setClicked(false);
      } catch (e) {
        console.log(e);
      }
    };
    const handleSave = () => {
      if (!userDocId) return; // No user doc id available

      if (file) {
        handleUpload(file, updateUserDoc, editedUserData, setUploaded);
      } else {
        updateUserDoc(editedUserData);
      }
    };

    clicked && handleSave();
  }, [clicked, file, editedUserData, userDocId]);

  const handleFieldChange = (fieldName, value) => {
    setEditedUserData({
      ...editedUserData,
      [fieldName]: value,
    });
  };
  //Reset Password
  const handleResetPasswordClick = () => {
    setShowResetPassword(!showResetPassword);
  };
  const handleEdit = () => {
    setDisabled((prev) => !prev);
  };

  return (
    <div className="cont">
      <Box p="2% 4%">
        <div className="date">
          <h1>Manage Account</h1>
          <p>{date}</p>
        </div>
        <div className="Main">
          <div className="Header">
            <div className="box">
              <div className="banner">
                <div className="profile">
                  <div>
                    <label htmlFor="image">
                      <div>
                        <IoCameraOutline
                          color="#4371cb"
                          className="cameraIcon"
                        />
                        <img
                          style={{ cursor: "pointer" }}
                          className="profileimage"
                          src={
                            file
                              ? URL.createObjectURL(file)
                              : editedUserData.profileImageURL
                          }
                          alt=""
                        />
                      </div>
                    </label>
                    <input
                      type="file"
                      name=""
                      style={{ display: "none" }}
                      id="image"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>

                  <div className="profiletxt">
                    <h1 className="profilename">Profile</h1>
                    <h2 className="profilesubtext">
                      Update your photo and personal details
                    </h2>
                  </div>
                </div>
                <div className="referral">
                  <Flex>
                    <p>{editedUserData.referralCode}</p>
                    <Flex alignItems="flex-end" color="#4371cb">
                      Trainer code
                    </Flex>
                  </Flex>
                </div>
              </div>

              <div className="details">
                <div className="double row22">
                  <Flex className="doublecontent">
                    <div className="label1">User ID:</div>
                    <div className="input1">
                      <input
                        disabled={disabled}
                        value={editedUserData.username || "Loading..."}
                        onChange={(e) => console.log("Dont Touch")}
                      />
                    </div>
                  </Flex>
                  <Flex className="doublecontent">
                    <div className="label1">User Name:</div>
                    <div className="input1">
                      <input
                        value={editedUserData.username || ""}
                        disabled={disabled}
                        onChange={(e) =>
                          handleFieldChange("username", e.target.value)
                        }
                      />
                    </div>
                  </Flex>
                </div>

                <div className="single">
                  <div className="label1">Name:</div>
                  <div className="inputfield">
                    <input
                      disabled={disabled}
                      value={editedUserData.name || ""}
                      onChange={(e) =>
                        handleFieldChange("name", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="double row22">
                  <Flex className="doublecontent">
                    <div className="label1">Email:</div>
                    <div className="input1">
                      <input
                        value={editedUserData.email || ""}
                        disabled
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
                      />
                    </div>
                  </Flex>
                  <Flex className="doublecontent">
                    <div className="label1">Contact.No:</div>
                    <div className="input1">
                      <input
                        disabled={disabled}
                        value={editedUserData.contactNo || ""}
                        onChange={(e) =>
                          handleFieldChange("contactNo", e.target.value)
                        }
                      />
                    </div>
                  </Flex>
                </div>
                <div className="double row23">
                  <Flex className="doublecontent">
                    <div className="label1">Gender:</div>
                    <div className="input1">
                      <input
                        disabled={disabled}
                        value={editedUserData.gender || ""}
                        onChange={(e) =>
                          handleFieldChange("gender", e.target.value)
                        }
                      />
                    </div>
                  </Flex>
                  <Flex className="doublecontent">
                    <div className="label1">Age:</div>
                    <div className="input1">
                      <input
                        disabled={disabled}
                        value={editedUserData.age || ""}
                        onChange={(e) =>
                          handleFieldChange("age", e.target.value)
                        }
                      />
                    </div>
                  </Flex>
                </div>
                <div className="single">
                  <div className="label1">Experience:</div>
                  <div className="inputfield">
                    <input
                      disabled={disabled}
                      value={editedUserData.experience || ""}
                      onChange={(e) =>
                        handleFieldChange("experience", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="rowlarge">
                  <div className="label1">Your bio:</div>
                  <div className="inputlarge">
                    <textarea
                      disabled={disabled}
                      style={{ cursor: disabled ? "not-allowed" : "auto" }}
                      value={editedUserData.bio || ""}
                      onChange={(e) => handleFieldChange("bio", e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="profilebtns">
                <div className="cnclbtn">
                  <button onClick={handleEdit}>
                    {disabled ? "Edit" : "Cancel"}{" "}
                  </button>
                </div>
                <div className="sbmtbtn">
                  <button disabled={disabled} onClick={() => setClicked(true)}>
                    {clicked ? (
                      <div class="loading-container">
                        <div class="loading-spinner"></div>
                        {file && <p>{uploaded}</p>}
                      </div>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
              <div className="Reset">
                <button onClick={handleResetPasswordClick}>
                  RESET PASSWORD
                </button>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {showResetPassword && (
        <div className="resetPass">
          <ResetPassword onSubmit={handleResetPasswordClick} />
        </div>
      )}
    </div>
  );
};

export default Settings;
