import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import classes from "./ClientDetails.module.scss";
import { MdClose } from "react-icons/md";
import HealthDataComponent from "./healthData";
import FormCheck from "./formCheck";
import Chart from "../../components/chart";
import { AuthContext } from "../../components/data_fetch/authProvider";
import { Link, useNavigate, useParams } from "react-router-dom";
import useDate from "../../components/useDate";
import { motion } from "framer-motion";
import BodyMeasurement from "./BodyMeasurement";
import HeartbeatGraph from "./HeartbeatGraph";
import ImageComponent from "../Chat/components/ImageConponent";

const ClientDetails = () => {
  const date = useDate();
  const Navigate = useNavigate();
  const params = useParams();
  const userId = params.id;
  const [docId, setDocId] = useState("constant");
  const { user } = useContext(AuthContext);
  const [client, setClient] = useState();
  const [weeklyExercises, setWeeklyExercises] = useState(null);
  const [showFormCheck, setShowFormCheck] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [nutritionData, setNutritionData] = useState({
    calories: "",
    fats: "",
    proteins: "",
    carbohydrates: "",
  });
  const handleToggleGraph = () => {
    setShowGraph(!showGraph);
  };
  const toggleNutritionOverlay = () => {
    setShowNutrition(true);
  };
  useEffect(() => {
    const getClients = async () => {
      try {
        const q = query(collection(db, "Users"), where("userId", "==", userId));
        const ref = await getDocs(q);
        const docref = ref.docs[0];
        setClient(docref.data());
      } catch (e) {
        console.error("Error fetching document:", e);
      }
    };
    getClients();
  }, []);

  useEffect(() => {
    async function fetchDocId() {
      try {
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming you're only interested in the first matching document
          const doc = querySnapshot.docs[0];
          setDocId(doc.id);
        } else {
          console.log("No document found with the specified userID.");
        }
      } catch (error) {
        console.error("Error fetching document ID:", error);
      }
    }

    fetchDocId();
  }, [userId, docId]);

  useEffect(() => {
    async function fetchClientNutritionData() {
      try {
        const userDocRef = doc(db, "Users", docId);
        const SubcollectionRef = collection(userDocRef, "nutrition");
        const nutritionRef = await getDocs(SubcollectionRef);

        if (!nutritionRef.empty) {
          const nutritionDataFromFirebase = nutritionRef.docs[0].data();
          setNutritionData({
            calories: nutritionDataFromFirebase.calories || "",
            fats: nutritionDataFromFirebase.fats || "",
            proteins: nutritionDataFromFirebase.proteins || "",
            carbohydrates: nutritionDataFromFirebase.carbohydrates || "",
          });
        }
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      }
    }

    if (docId !== "constant") {
      fetchClientNutritionData();
    }
  }, [docId]);

  const assignNutritionData = async () => {
    if (
      !nutritionData.calories ||
      !nutritionData.fats ||
      !nutritionData.proteins ||
      !nutritionData.carbohydrates
    ) {
      console.error("Please fill in all nutrition fields.");
      setShowNutrition(!showNutrition);
    } else {
      try {
        const getUserRef = doc(db, "Users", docId);
        const nutritionCollectionRef = collection(getUserRef, "nutrition");
        const querySnapshot = await getDocs(nutritionCollectionRef);

        if (!querySnapshot.empty) {
          // If documents exist, update the first document found
          const docSnapshot = querySnapshot.docs[0]; // Assuming only one document exists
          await updateDoc(docSnapshot.ref, nutritionData);
        } else {
          // If no documents exist, add a new one
          await addDoc(nutritionCollectionRef, nutritionData);
        }

        setShowNutrition(!showNutrition);
      } catch (error) {
        console.error("Error assigning nutrition data:", error);
      }
    }
  };

  //Fetching assigned exercises
  useEffect(() => {
    const fetchAssignedExercises = async () => {
      try {
        const getClientDoc = await getDocs(
          query(collection(db, "Users"), where("userId", "==", client.userId))
        );
        const clientDocRef = getClientDoc.docs[0].ref;
        const exercisesRef = collection(clientDocRef, "exercises");
        const q = query(exercisesRef, where("physioId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const today = new Date();
        const sun = new Date(
          new Date().setDate(today.getDate() - today.getDay())
        );
        const weeklyExercisesData = [];
        for (let i = 0; i < 7; i++) {
          const singleDayExercises = data.filter(
            (e) =>
              new Date(e.assignedOn.toDate()).toLocaleDateString() ===
              new Date(
                new Date(sun).setDate(sun.getDate() + i)
              ).toLocaleDateString()
          );
          weeklyExercisesData.push(singleDayExercises.length);
        }

        setWeeklyExercises(weeklyExercisesData);
      } catch (error) {
        console.error("Error fetching assigned exercises:", error);
      }
    };
    fetchAssignedExercises();
  }, [client, user]);
  return (
    <>
      {showFormCheck ? (
        showFormCheck === "Form Check" ? (
          <FormCheck
            clientId={client.userId}
            onBackClick={() => setShowFormCheck(null)}
          />
        ) : (
          <BodyMeasurement
            clientId={client.userId}
            client={client}
            onBackClick={() => setShowFormCheck(null)}
          />
        )
      ) : (
        client && (
          <div className={classes.rootClientDetails}>
            <div className={classes.headeing}>
              <div className={classes.title}>
                <p>Activity Reports</p>
              </div>
            </div>
            {!showGraph ? (
              <div className={classes.outerContainer}>
                <div className={classes.header}>
                  <div className={classes.headerContainer}>
                    <div className={classes.userImage}>
                      {client && client.userProfilePhoto ? (
                        <ImageComponent imagePath={client.userProfilePhoto} />
                      ) : (
                        <img
                          src={require("../../assets/vectorProfile.png")}
                          alt={client.userName}
                        />
                      )}
                    </div>

                    <div className={classes.userName}>
                      <p>{client.userName}</p>
                    </div>
                  </div>

                  <div className={classes.headerButtons}>
                    <div
                      className={classes.button}
                      onClick={() => {
                        Navigate(-1);
                      }}
                    >
                      Back
                    </div>
                    <div className={classes.buttonChat}>
                      <Link to={`/Chat/${client.userId}`}>Chat</Link>
                    </div>
                  </div>
                </div>

                <div className={classes.dashboard}>
                  <div className={classes.healthInfo}>
                    <HealthDataComponent
                      clientId={client.userId}
                      toggleGraph={handleToggleGraph}
                    />
                  </div>
                  <div className={classes.bottomContainer}>
                    <div className={classes.graph}>
                      <div className={classes.top}>
                        <p>Exercise Graph</p>
                      </div>
                      <div className={classes.chart}>
                        <Chart clientWeeklyExercises={weeklyExercises} />
                      </div>
                    </div>

                    <div className={classes.buttons}>
                      <div
                        className={classes.assign}
                        onClick={() => setShowFormCheck("Form Check")}
                      >
                        <p>Form Check</p>
                      </div>
                      <div
                        className={classes.assign}
                        onClick={toggleNutritionOverlay}
                      >
                        <p>Assign Nutrition</p>
                      </div>
                      <div
                        className={classes.assign}
                        // onClick={assignExerciseHandler}
                        onClick={() => {
                          Navigate(`assignedExercise`);
                        }}
                      >
                        <p>Assign Exercises</p>
                      </div>
                      <div
                        className={classes.assign}
                        onClick={() => setShowFormCheck("Measurement")}
                      >
                        <p>Body Measurements</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Nutrition Input Overlay */}
                {showNutrition && (
                  <div className={classes.overlay}>
                    <motion.div
                      initial={{ opacity: 0, y: -100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -100 }}
                      transition={{ ease: "easeOut", duration: 0.2 }}
                      className={classes.overlayContent}
                    >
                      <div
                        className={classes.closeicon}
                        onClick={() => setShowNutrition(false)}
                      >
                        <MdClose size={35} />
                      </div>
                      <div className={classes.inputBox}>
                        <label>Calories</label>
                        <input
                          type="text"
                          value={nutritionData.calories}
                          onChange={(e) =>
                            setNutritionData({
                              ...nutritionData,
                              calories: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className={classes.inputBox}>
                        <label>Fats</label>
                        <input
                          type="text"
                          value={nutritionData.fats}
                          onChange={(e) =>
                            setNutritionData({
                              ...nutritionData,
                              fats: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className={classes.inputBox}>
                        <label>Proteins</label>
                        <input
                          type="text"
                          value={nutritionData.proteins}
                          onChange={(e) =>
                            setNutritionData({
                              ...nutritionData,
                              proteins: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className={classes.inputBox}>
                        <label>Carbohydrates</label>
                        <input
                          type="text"
                          value={nutritionData.carbohydrates}
                          onChange={(e) =>
                            setNutritionData({
                              ...nutritionData,
                              carbohydrates: e.target.value,
                            })
                          }
                        />
                      </div>

                      <button onClick={assignNutritionData}>Done</button>
                    </motion.div>
                  </div>
                )}
              </div>
            ) : (
              <HeartbeatGraph client={client} toggleGraph={handleToggleGraph} />
            )}
          </div>
        )
      )}
    </>
  );
};

export default ClientDetails;
