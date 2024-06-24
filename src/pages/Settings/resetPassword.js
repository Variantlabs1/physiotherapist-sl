import { useState } from "react";
import { SiSpringsecurity } from "react-icons/si";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { RxCross1, RxCross2 } from "react-icons/rx";
import "./ResetPassword.scss";

import {
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import { Center, Flex, Spinner, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const ResetPassword = ({ onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showReenteredPassword, setShowReenteredPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (
      currentPassword === "" ||
      newPassword === "" ||
      reenteredPassword === ""
    ) {
      setErrorMessage("Error!Some fields are empty.");
      return;
    }

    if (newPassword !== reenteredPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const credentials = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credentials); // Make sure to await this
      await updatePassword(user, newPassword);
      setSuccessMessage("Password updated successfully.");
      setErrorMessage("");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/wrong-password") {
        setErrorMessage("Current password is incorrect.");
      } else {
        setErrorMessage(
          "Error updating password. Make sure the current password is correct."
        );
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="container"
    >
      <Flex className="cancelIconDiv">
        <RxCross1 className="cancelIcon" onClick={onSubmit} />
      </Flex>
      <div>
        <h1>Reset Password</h1>
      </div>

      <div>
        <div>
          <h2>Enter current password</h2>
        </div>
        <div className="inputBox">
          <SiSpringsecurity className="SecurityIcon" />
          <input
            type={showCurrentPassword ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {showCurrentPassword ? (
            <IoEyeOutline
              className="EyeIcon"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            />
          ) : (
            <IoEyeOffOutline
              className="EyeIcon"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            />
          )}
        </div>
        <div>
          <h2>Enter new password</h2>
        </div>
        <div className="inputBox">
          <SiSpringsecurity className="SecurityIcon" />
          <input
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {showNewPassword ? (
            <IoEyeOutline
              className="EyeIcon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            />
          ) : (
            <IoEyeOffOutline
              className="EyeIcon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            />
          )}
        </div>
        <div>
          <h2>Re-enter new password</h2>
        </div>
        <div className="inputBox">
          <SiSpringsecurity className="SecurityIcon" />
          <input
            type={showReenteredPassword ? "text" : "password"}
            value={reenteredPassword}
            onChange={(e) => setReenteredPassword(e.target.value)}
          />
          {showReenteredPassword ? (
            <IoEyeOutline
              className="EyeIcon"
              onClick={() => setShowReenteredPassword(!showReenteredPassword)}
            />
          ) : (
            <IoEyeOffOutline
              className="EyeIcon"
              onClick={() => setShowReenteredPassword(!showReenteredPassword)}
            />
          )}
        </div>
      </div>
      <Center className="submitBtn">
        {loading ? (
          <Spinner color="white" />
        ) : (
          <button onClick={handleResetPassword}>SUBMIT</button>
        )}
      </Center>
      {/* <div className="submitBtn">
                <button onClick={handleSubmit}> Done</button>
            </div> */}
      <div className="fpLink">
        <a href="/password-recovery">Forgot Password</a>
      </div>

      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, x: [90, 0], scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="Popup Epopup"
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
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, x: [90, 0], scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="Popup Spopup"
        >
          <p>{successMessage}</p>
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
    </motion.div>
  );
};

export default ResetPassword;
