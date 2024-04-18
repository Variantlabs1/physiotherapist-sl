import React, { useEffect, useState, useContext } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import classes from "./ClientDetails.module.scss";
import { IoMdAddCircle } from "react-icons/io";
import { MdClose } from "react-icons/md";
import HealthDataComponent from "./healthData";
import FormCheck from "./formCheck";
import Chart from "../../components/chart";
import { AuthContext } from "../../components/data_fetch/authProvider";
import Measurement from "./Measurement";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import useDate from "../../components/useDate";
import { Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import DeleteAssignedExercise from "./DeleteAssignedExercise";
import BodyMeasurement from "./BodyMeasurement";

const ClientDetails = ({ clientDocId, client, onBackToList }) => {
  const date = useDate();
  const [weeklyExercises, setWeeklyExercises] = useState(null);
  const [showFormCheck, setShowFormCheck] = useState(false);
  const { user } = useContext(AuthContext);
  const [assignedExercises, setAssignedExercises] = useState([]);
  const [showNutrition, setShowNutrition] = useState(false);
  const [displayExercises, setDisplayExercises] = useState(false);
  const [openDeleteExerciseId, setOpenDeleteExerciseId] = useState(null);
  const [nutritionData, setNutritionData] = useState({
    calories: "",
    fats: "",
    proteins: "",
    carbohydrates: "",
  });
  const [docId, setDocId] = useState("constant");
  const userIdToFind = client.userId; // Actual userID
  const toggleDeleteModal = (e, exerciseId) => {
    e.stopPropagation();
    setOpenDeleteExerciseId(
      exerciseId === openDeleteExerciseId ? null : exerciseId
    );
  };
  const toggleNutritionOverlay = () => {
    setShowNutrition(true);
  };

  useEffect(() => {
    if (clientDocId) {
      setDisplayExercises(true);
    }
  }, [clientDocId]);

  useEffect(() => {
    async function fetchDocId() {
      try {
        const usersRef = collection(db, "Users");
        const q = query(usersRef, where("userId", "==", userIdToFind));
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
  }, [userIdToFind, docId]);

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
      // You can add error handling here to display a message to the user.
      console.error("Please fill in all nutrition fields.");
      setShowNutrition(!showNutrition);
    } else {
      try {
        const getUserRef = doc(db, "Users", docId);
        const caloriesCollectionRef = collection(getUserRef, "nutrition");

        await addDoc(
          caloriesCollectionRef,
          nutritionData
          // assignedOn:Timestamp.now()
        );
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

        console.log(data);
        setAssignedExercises(data);

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

  //Show All exercises
  const [showAllExercises, setShowAllExercises] = useState(false);
  const allExercisesHandler = () => {
    setShowAllExercises(!showAllExercises);
  };

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
      ) : displayExercises ? (
        <div className={classes.assignedExercises}>
          <div className={classes.container}>
            <div className={classes.heading}>
              <p>Assigned Exercises</p>
            </div>

            <div className={classes.cards}>
              {assignedExercises.map((exercise) => (
                <div className={classes.exercise} key={exercise?.id}>
                  <div className={classes.exerciseName}>
                    <p>
                      {exercise?.title
                        ? exercise.title
                        : exercise.Exercise_Name}
                    </p>
                  </div>

                  <div className={classes.delete}>
                    <DeleteAssignedExercise
                      className={classes.icon}
                      id={exercise.id}
                      exerciseName={
                        exercise?.title
                          ? exercise.title
                          : exercise.Exercise_Name
                      }
                      clientId={client.userId}
                      isOpenDelete={exercise.id === openDeleteExerciseId}
                      toggleDeleteModal={(e) =>
                        toggleDeleteModal(e, exercise.id)
                      }
                      setAssignedExercises={setAssignedExercises}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className={classes.footer}>
              <Button
                bgColor="#8db2f9"
                color="white"
                _hover={{ bgColor: "#8db2d2" }}
                onClick={() => {
                  setDisplayExercises(false);
                }}
              >
                Back
              </Button>
              <div className={classes.buttons} onClick={allExercisesHandler}>
                <Link to={`/Exercises/?client=${client.userId}`}>
                  <IoMdAddCircle className={classes.icon} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.rootClientDetails}>
          <div className={classes.headeing}>
            <div className={classes.title}>
              <p>Activity Reports</p>
            </div>
            <Center fontWeight="500">{date}</Center>
          </div>
          <div className={classes.outerContainer}>
            <div className={classes.header}>
              <div className={classes.headerContainer}>
                <div className={classes.userImage}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTte_W3r44Rc7MYnXPQZLP-z3pfAJCKJuz1GA&usqp=CAU"
                    alt={client.userName}
                  />
                </div>

                <div className={classes.userName}>
                  <p>{client.userName}</p>
                </div>
              </div>

              <div className={classes.headerButtons}>
                <div className={classes.button} onClick={onBackToList}>
                  <Link to="/Clients">Back</Link>
                </div>
                <div className={classes.buttonChat}>
                  <Link to={`/Chat/${client.userId}`}>Chat</Link>
                </div>
              </div>
            </div>

            <div className={classes.dashboard}>
              <div className={classes.healthInfo}>
                <HealthDataComponent clientId={client.userId} />
              </div>
              <div className={classes.bottomContainer}>
                <div className={classes.graph}>
                  <div className={classes.top}>
                    <p>Exercise Graph</p>
                    {/* <p onClick={() => setShowFormCheck("Form Check")}>
                      Form Check
                    </p> */}
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
                    onClick={() => setDisplayExercises(true)}
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

            {/* ///////////////////////////////////////////////////////////////? */}
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
        </div>
      )}
    </>
  );
};

export default ClientDetails;
