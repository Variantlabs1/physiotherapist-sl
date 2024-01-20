import { useState } from "react";
import {
    getAuth,
    reauthenticateWithCredential,
    updatePassword,
    EmailAuthProvider,
} from "firebase/auth";

const ResetPassword = () => {
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

        const credentials = reauthenticateWithCredential(
            user,
            EmailAuthProvider.credential(user.email, currentPassword)
        );
        try {
            await updatePassword(user, newPassword);
            setSuccessMessage("Password updated successfully.");
            setErrorMessage("");
        } catch (error) {
            setErrorMessage(
                "Error updating password. Make sure the current password is correct."
            );
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <div>
                <label>Current Password</label>
                <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                    {showCurrentPassword ? "Hide" : "Show"}
                </button>
            </div>
            <div>
                <label>New Password</label>
                <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? "Hide" : "Show"}
                </button>
            </div>
            <div>
                <label>Re-enter New Password</label>
                <input
                    type={showReenteredPassword ? "text" : "password"}
                    value={reenteredPassword}
                    onChange={(e) => setReenteredPassword(e.target.value)}
                />
                <button
                    onClick={() =>
                        setShowReenteredPassword(!showReenteredPassword)
                    }
                >
                    {showReenteredPassword ? "Hide" : "Show"}
                </button>
            </div>
            <button onClick={handleResetPassword}>Reset Password</button>
            {successMessage && <p>{successMessage}</p>}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default ResetPassword;
