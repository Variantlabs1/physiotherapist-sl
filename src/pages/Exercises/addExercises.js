import React, { useState, useCallback, useContext } from "react";
import { getStorage, uploadBytes,ref, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp, getDocs, query, where, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDropzone } from "react-dropzone";

import classes from "./AddExercises.module.scss";
import { AuthContext } from "../../components/data_fetch/authProvider";

import { database } from "../../firebase";
import { set,get,ref as dbRef,push } from "firebase/database";

const AddExercises = ({ selectedExercise,onBackClick,clientId }) => {
    const {user} = useContext(AuthContext)
    const [thumbnail, setThumbnail] = useState(null);
    const [Exercise_Name, setTitle] = useState("");
    const [Preparation, setDescription] = useState("");
    const [Target, setMusclesInvolved] = useState("");
    const [caloriesBurnPerMin, setCaloriesBurnPerMin] = useState("");
    const [duration, setDuration] = useState("");
    const [reps, setReps] = useState("");
    const [video, setVideo] = useState(null);
    const [success, setSuccess] = useState(false);

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

        // Step 1: Upload video to Firebase Storage
        const storage = getStorage();
        const videoRef = ref(storage, `exercise/${video.name}`);
        await uploadBytes(videoRef, video);

        // Step 2: Upload thumbnail to Firebase Storage
        const thumbnailRef = ref(
            storage,
            `exercise/thumbnails/${thumbnail.name}`
        );
        await uploadBytes(thumbnailRef, thumbnail);

        // Step 3: Get the download URLs of the uploaded video and thumbnail
        const videoURL = await getDownloadURL(videoRef);
        const thumbnailURL = await getDownloadURL(thumbnailRef);

        // Step 4: Save exercise data to Firebase Firestore
        const exerciseData =selectedExercise? {
            ...selectedExercise,
            videoURL,
            thumbnailURL,
            caloriesBurnPerMin,
            duration,
            reps,
            assignedOn: Timestamp.now(),
           physioId: user?.uid,
        }: {
            videoURL,
            thumbnailURL,
            Exercise_Name,
            Preparation,
            Target,
            caloriesBurnPerMin,
            duration,
            reps,
            assignedOn: Timestamp.now(),
            physioId: user?.uid,
        } ;

        const exerciseData1 = selectedExercise ? {
            ...selectedExercise,
            videoURL,
            thumbnailURL,
            Target: selectedExercise.Target ?? Target,
            assignedTo: [clientId],
           physioId: user?.uid,
        }: {
            videoURL,
            thumbnailURL,
            Exercise_Name,
            Preparation,
            Target,
            assignedTo: [clientId],
            physioId: user?.uid,
        } ;

        try {
            let clientRef = null;
            if(clientId){
                 const  res = await getDocs(query(collection(db,"Users"),where('userId',"==",clientId))) 
                  if(!res.empty){
                      clientRef = res.docs[0].ref
                  }
            }
            const collectionRef =(clientId && clientRef) ? collection(clientRef,"exercises") : collection(db, "exercises")
            const docRef = await addDoc(
                collectionRef,
                exerciseData
            );
            const  response = await getDocs(query(collection(db,"exercises"),where('Exercise_Name', 'in', [Exercise_Name, selectedExercise.Exercise_Name]))) 
            if(response.empty){
                await addDoc(
                    collection(db,"exercises"),
                    exerciseData1
                );
            }
            else{
              const docid = response.docs[0].ref.id; 
              await updateDoc(doc(db,"exercises",docid),{assignedTo:arrayUnion(clientId)});
            }
            console.log(docRef);
            if(clientId){
                const getPhysios = await getDocs(query(collection(db,'physiotherapist'),where('physiotherapistId',"==",user.uid)))
                const physioDocId = getPhysios.docs[0].ref.id;
                await updateDoc(doc(db,"physiotherapist",physioDocId),{assignedOn:arrayUnion(Timestamp.now())})
            }

            //function to add exercise assigned to client in realtime database//
            const ex = {
                Exercise_Name : selectedExercise.Exercise_Name,
                caloriesBurnPerMin : caloriesBurnPerMin,
                id : docRef.id
            }
            if(clientId){
                try {
                    const exercisesRef = dbRef(database, 'assignedExcercise/'+ clientId );
                    const snapshot = await get(exercisesRef);
                    if(!snapshot.exists()){
                        await set(exercisesRef, { exercises: [] });
                    }
                  const exercisesRef1 = dbRef(database, `assignedExcercise/${clientId}/exercises`);
                  const newExerciseRef = await push(exercisesRef1);
                //   const newExerciseId = newExerciseRef.key;
                  
                //   await set(newExerciseRef,{exerciseData, id: docRef.id});
                  await set(newExerciseRef,ex);
                } catch (error) {
                  console.error('Error assigning exercise on realtime database:', error);
                }
            }
            // Reset the form fields after successful upload
            setVideo(null);
            setThumbnail(null);
            setTitle("");
            setDescription("");
            setMusclesInvolved("");
            setCaloriesBurnPerMin("");
            setDuration("");
            setReps("");

            setSuccess(true);
          clientId &&   window.location.replace('/Clients?client='+clientRef.id)
        } catch (error) {
            // console.error("Error adding exercise: ", error);
        }
    };

    //Handle Back Click
    const handleBackClick = () => {
        onBackClick();
    };

    const handleSuccess = () => {
        setSuccess(false);
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
                            defaultValue={selectedExercise&&selectedExercise.Exercise_Name}
                                type="text"
                                // value={title}
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
                            defaultValue={selectedExercise&&`Preparation: ${selectedExercise.Preparation} \n \nExecution: ${selectedExercise.Execution}`}

                                // value={description}
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
                                // value={musclesInvolved}
                            defaultValue={selectedExercise&&selectedExercise.Target}

                                onChange={(e) =>
                                    setMusclesInvolved(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className={classes.bottom}>
                        <div className={classes.left}>
                            <div className={classes.formElementsBottom}>
                                <div className={classes.fieldName}>
                                    <p>Calories Burn</p>
                                </div>
                                <div className={classes.inputFieldSmall}>
                                    <input
                                        type="number"
                                        value={caloriesBurnPerMin}
                                        onChange={(e) =>
                                            setCaloriesBurnPerMin(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className={classes.formElementsBottom}>
                                <div className={classes.fieldName}>
                                    <p>Repetitions</p>
                                </div>
                                <div className={classes.inputFieldSmall}>
                                    <input
                                        type="number"
                                        value={reps}
                                        onChange={(e) =>
                                            setReps(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={classes.right}>
                            <div className={classes.video}>
                                <div className={classes.field}>
                                    <p>Add Video</p>
                                </div>
                                <div className={classes.videoContainer}>
                                    {
                                        video? <video width={120} height={100} autoPlay controls src={URL.createObjectURL(video)} alt={video.name} />  :
                                          <label style={{cursor:'pointer'}} htmlFor="video"><AddCircleIcon fontSize="large" htmlColor="#497ef0" /></label>

                                    }
                                    <input id="video" style={{display:"none"}} 

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
                                    {thumbnail? <img  src={URL.createObjectURL(thumbnail)} height={80} loop  width={120}  />
                                 :  <label style={{cursor:'pointer'}} htmlFor="image"><AddCircleIcon fontSize="large" htmlColor="#497ef0" /></label>

                                    }
                                    <input id="image" style={{display:"none"}} 
                                        type="file"
                                        onChange={handleThumbnailChange}
                                        placeholder="Thumbnail"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.footer}>
                        <div className={classes.button} onClick={handleSubmit}>
                            <span>Submit</span>
                        </div>

                        <div
                            className={classes.button}
                            onClick={handleBackClick}
                        >
                            <span>Back</span>
                        </div>
                    </div>
                </div>
            </div>
            {success ? (
                <div className={classes.successMsg}>
                    <div className={classes.text}>
                        <p>Exercise {clientId?"Assigned":"Added"} successfully</p>

                        <div className={classes.button} onClick={handleSuccess}>
                            <span>Done</span>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default AddExercises;
