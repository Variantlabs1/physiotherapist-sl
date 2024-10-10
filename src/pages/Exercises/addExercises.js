import React, { useState, useCallback, useContext, useEffect } from "react";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  doc,
  setDoc
} from "firebase/firestore";
import { db } from "../../firebase";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { motion } from "framer-motion";
import classes from "./AddExercises.module.scss";
import { AuthContext } from "../../components/data_fetch/authProvider";
import { RxCross2 } from "react-icons/rx";
import { database } from "../../firebase";
import { set, ref as dbRef } from "firebase/database";
import { Spinner } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AddExercises = ({ selectedExercise, onBackClick, clientId }) => {
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(null);
  const [Exercise_Name, setTitle] = useState("");
  const [Preparation, setDescription] = useState("");
  const [Target, setMusclesInvolved] = useState("");
  const [duration, setDuration] = useState("");
  const [reps, setReps] = useState("");
  const [video, setVideo] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Monday");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const client = urlParams.get("client");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedExercise) {
      setTitle(selectedExercise.Exercise_Name || "");
      setDescription(selectedExercise.Preparation || "");
      setMusclesInvolved(selectedExercise.Target || "");
      setDuration(selectedExercise.duration || "");
      setReps(selectedExercise.reps || "");
      setSelectedPeriod(selectedExercise.assignedDay || "Monday");
    }
  }, [selectedExercise]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    try {
      // Step 1: Validation
      const exerciseName = Exercise_Name || selectedExercise?.Exercise_Name;
      const preparationText = Preparation || selectedExercise?.Preparation;
      const targetText = Target || selectedExercise?.Target;
  
      if (!video || !thumbnail || !exerciseName || !preparationText || !targetText) {
        setError("All fields, including video, image, name, preparation, and target, must be filled.");
        setSubmitting(false);
        return;
      }
  
      // Step 2: Upload video and thumbnail to Firebase Storage in parallel
      const storage = getStorage();
      const videoRef = ref(storage, `exercise/${video.name}`);
      const thumbnailRef = ref(storage, `exercise/thumbnails/${thumbnail.name}`);
  
      const [videoUploadTask, thumbnailUploadTask] = await Promise.all([
        uploadBytes(videoRef, video),
        uploadBytes(thumbnailRef, thumbnail),
      ]);
  
      const videoURL = await getDownloadURL(videoRef);
      const thumbnailURL = await getDownloadURL(thumbnailRef);
  
      // Step 3: Create the new exercise data
      const exerciseData = {
        videoURL,
        thumbnailURL,
        Exercise_Name: exerciseName,
        Preparation: preparationText,
        Target: targetText,
        duration,
        reps,
        assignedDay: selectedPeriod,
        assignedOn: Timestamp.now(),
        physioId: user?.uid,
      };
  
      // Step 4: Check for existing exercise for the client and create a new document
      if (clientId) {
        const res = await getDocs(
          query(collection(db, "Users"), where("userId", "==", clientId))
        );
        const clientRef = res.docs[0].ref;
  
        // Create a new exercise document
        const docRef = await addDoc(collection(clientRef, "exercises"), exerciseData);
  
        // Step 5: Upload exercise summary to Realtime Database
        const exerciseSummary = {
          Exercise_Name: exerciseData.Exercise_Name,
          assignedDay: selectedPeriod,
          id: docRef.id, // Use the newly created exerciseId here
        };
  
        const exercisesRef = dbRef(database, `Users/${clientId}/exercises/${docRef.id}`);
        await set(exercisesRef, exerciseSummary);
      }
  
      // Step 6: Add exercise to the physiotherapist's collection
      const physioId = user?.uid;
      const physioExercisesRef = doc(db, `physiotherapist/${physioId}/exercises/${exerciseData.Exercise_Name}`); // Using exercise name as ID; change as needed
      await setDoc(physioExercisesRef, exerciseData);
  
      // Reset form fields
      setVideo(null);
      setThumbnail(null);
      setTitle("");
      setDescription("");
      setMusclesInvolved("");
      setDuration("");
      setReps("");
  
      setSuccess(true);
    } catch (error) {
      setError(`Error adding exercise: ${error.message}`);
    } finally {
      setSubmitting(false);
      queryClient.invalidateQueries(["exercises"]);
    }
  };
  
  

  // Handle Back Click
  const handleBackClick = () => {
    onBackClick();
  };

  const handleSuccess = () => {
    setSuccess(false);
    Navigate(`/Clients/${clientId}/assignedExercise`);
  };

  return (
    <>
      <div className={classes.addExercises}>
        <div className={classes.header}>
          <p>Add Exercise</p>
        </div>

        <div className={classes.form}>
          <div className={classes.formElements}>
            <div className={classes.fieldName}>
              <p>Exercise Name</p>
            </div>
            <div className={classes.inputField}>
  <input
    value={Exercise_Name} // Use Exercise_Name directly
    type="text"
    onChange={(e) => setTitle(e.target.value)}
  />
</div>

          </div>

          <div className={classes.formElements}>
            <div className={classes.fieldName}>
              <p>Duration</p>
            </div>
            <div className={classes.inputFieldSmall}>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div className={classes.formElementsBig}>
            <div className={classes.fieldName}>
              <p>Exercise Description</p>
            </div>
            <div className={classes.inputFieldBig}>
              <textarea
                type="text"
                value={
                  selectedExercise
                    ? `Preparation: ${selectedExercise.Preparation} \n \nExecution: ${selectedExercise.Execution}`
                    : Preparation
                }
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className={classes.formElements}>
            <div className={classes.fieldName}>
              <p>Muscles Involved</p>
            </div>
            <div className={classes.inputField}>
              <input
                type="text"
                value={selectedExercise ? selectedExercise.Target : Target}
                onChange={(e) => setMusclesInvolved(e.target.value)}
              />
            </div>
          </div>

          <div className={classes.bottom}>
            <div className={classes.left}>
              {client && (
                <div className={classes.selectContainer}>
                  <div className={classes.fieldName}>
                    <p>Select a day</p>
                  </div>
                  <div className={classes.headerSelector}>
                    <select
                      className={classes.selector}
                      id="daySelector"
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                </div>
              )}
              <div className={classes.formElementsBottom}>
                <div className={classes.fieldName}>
                  <p>Repetitions</p>
                </div>
                <div className={classes.inputFieldSmall}>
                  <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                  />
                </div>
              </div>
              <div className={classes.footer}>
                <div className={classes.button} onClick={handleSubmit}>
                  <span>Submit</span>
                </div>

                <div className={classes.button} onClick={handleBackClick}>
                  <span>Back</span>
                </div>
              </div>
            </div>

            <div className={classes.right}>
              <div className={classes.video}>
                <div className={classes.field}>
                  <p>Add Video</p>
                </div>
                <div className={classes.videoContainer}>
                  {video ? (
                    <video
                      width={120}
                      height={100}
                      autoPlay
                      controls
                      src={URL.createObjectURL(video)}
                      alt={video.name}
                    />
                  ) : (
                    <label style={{ cursor: "pointer" }} htmlFor="video">
                      <AddCircleIcon fontSize="large" htmlColor="#497ef0" />
                    </label>
                  )}
                  <input
                    id="video"
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleVideoChange}
                  />
                </div>
              </div>

              <div className={classes.image}>
                <div className={classes.field}>
                  <p>Add Image</p>
                </div>
                <div className={classes.imageContainer}>
                  {thumbnail ? (
                    <img
                      alt="#"
                      src={URL.createObjectURL(thumbnail)}
                      height={80}
                      loop
                      width={120}
                    />
                  ) : (
                    <label style={{ cursor: "pointer" }} htmlFor="image">
                      <AddCircleIcon fontSize="large" htmlColor="#497ef0" />
                    </label>
                  )}
                  <input
                    id="image"
                    style={{ display: "none" }}
                    type="file"
                    onChange={handleThumbnailChange}
                    placeholder="Thumbnail"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, x: [90, 0], scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className={classes.errorpopup}
          >
            <p>{error}</p>
            <div>
              <RxCross2
                color="white"
                size={20}
                onClick={() => {
                  setError(null);
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
      {success ? (
        <div className={classes.successMsg}>
          <div className={classes.text}>
            <p>Exercise {clientId ? "Assigned" : "Added"} successfully</p>
            <div className={classes.button} onClick={handleSuccess}>
              <span>Done</span>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {submitting && (
        <div className={classes.spinner}>
          <Spinner className={classes.spin} thickness="3px" />
        </div>
      )}
    </>
  );
};

export default AddExercises;