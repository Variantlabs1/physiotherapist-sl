import "./CreateClientID.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where,
  serverTimestamp, 
  onSnapshot 
} from "firebase/firestore";
import { 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut 
} from "firebase/auth";
import { db, auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Box, Flex, useToast } from "@chakra-ui/react";
import { IoCameraOutline } from "react-icons/io5";
import useDate from "../../components/useDate";

const CreateClientID = () => {
  const date = useDate();
  const navigate = useNavigate();
  const toast = useToast();
  
  // Form state
  const [userData, setUserData] = useState({
    userEmail: "",
    userGender: "",
    userHeightInCm: "",
    userName: "",
    userPassword: "",
    userPhoneNumber: "",
    userWeight: "",
    userProfilePhoto: "",
    userDOB: "",
    referralCode: "",
    accCreated: date,
    verified: false
  });
  
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [trainerData, setTrainerData] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  // Fetch trainer data to get referral codes
  useEffect(() => {
    const fetchTrainerData = async () => {
      try {
        const trainerRef = collection(db, "physiotherapist");
        const unsubscribe = onSnapshot(trainerRef, (querySnapshot) => {
          const trainers = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTrainerData(trainers);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching trainer data:", error);
        setError("Failed to load trainer information");
      }
    };
    
    fetchTrainerData();
  }, []);

  // Upload profile photo to Firebase Storage
  const uploadProfilePhoto = async (userId) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("");
        return;
      }
      
      const storageRef = ref(storage, `profilePhotos/${userId}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading file:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  // Check if email already exists
  const checkEmailExists = async (email) => {
    try {
      const q = query(collection(db, "Users"), where("userEmail", "==", email));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate form
      if (!userData.userEmail || !userData.userName || !userData.userPassword) {
        throw new Error("Email, name and password are required");
      }
      
      // Check if email already exists
      const emailExists = await checkEmailExists(userData.userEmail);
      if (emailExists) {
        throw new Error("Email already exists");
      }
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.userEmail,
        userData.userPassword
      );
      
      const user = userCredential.user;
      
      // Update profile
      await updateProfile(user, {
        displayName: userData.userName
      });
      
      // Upload profile photo if provided
      let photoURL = userData.userProfilePhoto;
      if (file) {
        photoURL = await uploadProfilePhoto(user.uid);
      }
      
      // Format DOB if not provided
      const formattedDOB = userData.userDOB || `${new Date().getDate()}/${new Date().toLocaleString('default', { month: 'long' })}/${new Date().getFullYear()}/${new Date().toLocaleString('default', { weekday: 'long' })}`;
      
      // Prepare user data for Firestore
      const newUserData = {
        ...userData,
        userId: user.uid,
        userProfilePhoto: photoURL,
        userDOB: formattedDOB,
        accCreated: date,
        verified: userData.verified ? true : false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // Remove password from Firestore document
      delete newUserData.userPassword;
      
      // Create user document in Firestore
      await setDoc(doc(db, "Users", user.uid), newUserData);
      
      // Sign out the newly created user to avoid session conflict
      await signOut(auth);
      
      toast({
        title: "Account created.",
        description: "User account has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Navigate to requests page
      navigate("/home");
      
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error.message);
      toast({
        title: "Error creating account.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-client-container">
      <Box className="main-wrapper">
        <div className="page-header">
          <h1>Create New User</h1>
          <p className="date-display">{date}</p>
        </div>
        
        <div className="form-wrapper">
          <div className="form-card">
            {/* Banner Section */}
            <div className="banner-section">
              <div className="profile-section">
                <div className="profile-image-wrapper">
                  <label htmlFor="profile-image" className="image-upload-label">
                    <div className="profile-image-container">
                      <img
                        className="profile-image"
                        src={file ? URL.createObjectURL(file) : userData.userProfilePhoto || "/default-avatar.png"}
                        alt="Profile"
                      />
                      <IoCameraOutline className="camera-icon" />
                    </div>
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    className="file-input"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </div>
                <div className="profile-text">
                  <h2 className="profile-title">New User Profile</h2>
                  <p className="profile-subtitle">Enter user details to create a new account</p>
                </div>
              </div>
              
              {userData.referralCode && (
                <div className="referral-section">
                  <div className="referral-code">{userData.referralCode}</div>
                  <span className="referral-label">Referral code</span>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && <div className="error-message">{error}</div>}
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-fields">
                {/* Full Name - Single Row */}
                <div className="form-row single">
                  <div className="form-field">
                    <label className="field-label">Full Name:</label>
                    <input
                      type="text"
                      name="userName"
                      value={userData.userName}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                {/* Email & Password - Double Row */}
                <div className="form-row double">
                  <div className="form-field">
                    <label className="field-label">Email:</label>
                    <input
                      type="email"
                      name="userEmail"
                      value={userData.userEmail}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Password:</label>
                    <input
                      type="password"
                      name="userPassword"
                      value={userData.userPassword}
                      onChange={handleChange}
                      placeholder="Enter password"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                {/* Phone & Gender - Double Row */}
                <div className="form-row double">
                  <div className="form-field">
                    <label className="field-label">Phone Number:</label>
                    <input
                      type="tel"
                      name="userPhoneNumber"
                      value={userData.userPhoneNumber}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Gender:</label>
                    <select
                      name="userGender"
                      value={userData.userGender}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                {/* Height & Weight - Double Row */}
                <div className="form-row double">
                  <div className="form-field">
                    <label className="field-label">Height (cm):</label>
                    <input
                      type="text"
                      name="userHeightInCm"
                      value={userData.userHeightInCm}
                      onChange={handleChange}
                      placeholder="Enter height in cm"
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">Weight (kg):</label>
                    <input
                      type="text"
                      name="userWeight"
                      value={userData.userWeight}
                      onChange={handleChange}
                      placeholder="Enter weight in kg"
                      className="form-input"
                    />
                  </div>
                </div>
                
                {/* DOB & Image URL - Double Row */}
                <div className="form-row double">
                  <div className="form-field">
                    <label className="field-label">Date of Birth:</label>
                    <input
                      type="text"
                      name="userDOB"
                      value={userData.userDOB}
                      onChange={handleChange}
                      placeholder="DD/Month/YYYY/Day"
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <label className="field-label">External Image URL:</label>
                    <input
                      type="url"
                      name="userProfilePhoto"
                      value={userData.userProfilePhoto}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="form-input"
                    />
                  </div>
                </div>
                
                {/* Trainer Code & Verified - Double Row */}
                <div className="form-row double">
                  <div className="form-field">
                    <label className="field-label">Trainer Code:</label>
                    <select
                      name="referralCode"
                      value={userData.referralCode}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Trainer Code</option>
                      {trainerData.map((trainer) => (
                        <option key={trainer.id} value={trainer.referralCode}>
                          {trainer.referralCode} - {trainer.name || trainer.username}
                        </option>
                      ))}
                      <option value="Eg0I00">Eg0I00 - Default Trainer</option>
                    </select>
                  </div>
                  <div className="form-field checkbox-field">
                    <label className="field-label">Verified:</label>
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        name="verified"
                        checked={userData.verified}
                        onChange={(e) => 
                          setUserData(prev => ({
                            ...prev,
                            verified: e.target.checked
                          }))
                        }
                        className="form-checkbox"
                      />
                      <span className="checkbox-label">Account verified</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-container">
                      <div className="loading-spinner"></div>
                      <span>Creating...</span>
                      {file && uploadProgress > 0 && <span>{uploadProgress}%</span>}
                    </div>
                  ) : (
                    "Create User"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CreateClientID;