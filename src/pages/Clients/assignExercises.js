import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import classes from "./AssignExercises.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Center, HStack } from "@chakra-ui/react";
import useDate from "../../components/useDate";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { AiOutlinePlus } from "react-icons/ai";
import DeleteAssignedExercise from "./DeleteAssignedExercise";
import { AuthContext } from "../../components/data_fetch/authProvider";

const array = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AssignExercises = () => {
  const Navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const date = useDate();
  const params = useParams();
  const userId = params.id;
  const [client, setClient] = useState([]);
  const [dayValue, setDayValue] = useState("Monday");
  const [assignedExcercise, setAssignedExercises] = useState();
  const [openDeleteExerciseId, setOpenDeleteExerciseId] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchAssignedExercises = async () => {
    try {
      const getClientDoc = await getDocs(
        query(collection(db, "Users"), where("userId", "==", client.userId))
      );
      const clientDocRef = getClientDoc.docs[0].ref;
      const exercisesRef = collection(clientDocRef, "exercises");
      const q = query(
        exercisesRef,
        where("physioId", "==", user.uid),
        where("assignedDay", "==", dayValue)
      );
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAssignedExercises(data);
    } catch (error) {
      console.error("Error fetching assigned exercises:", error);
    }
  };

  useEffect(() => {
    fetchAssignedExercises();
  }, [client, user, dayValue]);

  const toggleDeleteModal = (e, exerciseId) => {
    e.stopPropagation();
    setOpenDeleteExerciseId(
      exerciseId === openDeleteExerciseId ? null : exerciseId
    );
  };
  return (
    <div className={classes.assignExercises}>
      <div className={classes.heading}>
        <div className={classes.title}>
          <p>Assigned Exercises</p>
        </div>
        <Center fontWeight="500">{date}</Center>
      </div>
      <div className={classes.header}>
        <div className={classes.headerContainer}>
          <Center className={classes.userImage}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTte_W3r44Rc7MYnXPQZLP-z3pfAJCKJuz1GA&usqp=CAU"
              alt={client.userName}
            />
          </Center>

          <Center className={classes.userName}>
            <p>{client.userName}</p>
          </Center>
        </div>

        <div className={classes.headerButtons}>
          <Button
            variant="outline"
            className={classes.back}
            onClick={() => {
              Navigate(-1);
            }}
          >
            Back
          </Button>
          <Center className={classes.add}>
            <Link to={`/Exercises/?client=${client.userId}`}>
              <AiOutlinePlus className={classes.icon} />
            </Link>
          </Center>
        </div>
      </div>
      <div className={classes.outerContainer}>
        <HStack className={classes.buttonsContainer}>
          {array.map((day) => (
            <Button
              className={dayValue === day && classes.clickedButton}
              onClick={() => {
                setDayValue(day);
              }}
            >
              {!isMobile ? day.slice(0, 3) : day.slice(0, 1)}
            </Button>
          ))}
        </HStack>
        <div className={classes.container}>
          <div className={classes.head}>
            <p>Assigned Exercises</p>
          </div>

          <div className={classes.cards}>
            {assignedExcercise &&
              assignedExcercise.map((exercise) => (
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
                      setAssignedExercises={fetchAssignedExercises}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignExercises;
