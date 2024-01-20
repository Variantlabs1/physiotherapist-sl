import { useState } from "react";
import { SiSpringsecurity } from "react-icons/si";
import { BsFillEyeSlashFill } from "react-icons/bs";
import "./ResetPassword.scss";

import {
    getAuth,
    reauthenticateWithCredential,
    updatePassword,
    EmailAuthProvider,
} from "firebase/auth";

const ResetPassword = ({ onSubmit }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reenteredPassword, setReenteredPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showReenteredPassword, setShowReenteredPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleResetPassword = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (newPassword !== reenteredPassword) {
            setErrorMessage("New passwords do not match.");
            return;
        }

        try {
            const credentials = EmailAuthProvider.credential(
                user.email,
                currentPassword
            );
            await reauthenticateWithCredential(user, credentials); // Make sure to await this
            await updatePassword(user, newPassword);
            setSuccessMessage("Password updated successfully.");
            setErrorMessage("");
        } catch (error) {
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
        <div className="container">
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
                    <BsFillEyeSlashFill
                        className="EyeIcon"
                        onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                        }
                    />
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
                    <BsFillEyeSlashFill
                        className="EyeIcon"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                    />
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
                    <BsFillEyeSlashFill
                        className="EyeIcon"
                        onClick={() =>
                            setShowReenteredPassword(!showReenteredPassword)
                        }
                    />
                </div>
            </div>
            <div className="submitBtn">
                <button onClick={handleResetPassword}> SUBMIT</button>
            </div>
            {/* <div className="submitBtn">
                <button onClick={handleSubmit}> Done</button>
            </div> */}
            <div className="fpLink">
                <a href="#">Forgot Password</a>
            </div>

            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default ResetPassword;
