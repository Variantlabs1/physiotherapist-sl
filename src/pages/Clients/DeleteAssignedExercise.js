import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./DeleteAssignedExercise.module.scss";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../../firebase";
import { get, ref as dbRef, child, remove, equalTo } from "firebase/database";
import { AuthContext } from "../../components/data_fetch/authProvider";
import { Center, Spinner, useToast } from "@chakra-ui/react";

export default function DeleteAssignedExercise({
  id,
  clientId,
  exerciseName,
  setAssignedExercises,
  isOpenDelete,
  toggleDeleteModal,
}) {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  //To Unassign an exercise
  const handleUnassignExercise = async () => {
    setLoading(true);
    try {
      //code to delete document from exercises subcollection
      let clientRef = null;
      const res = await getDocs(
        query(collection(db, "Users"), where("userId", "==", clientId))
      );
      if (!res.empty) {
        clientRef = res.docs[0].ref;
      }

      const exerciseRef = doc(clientRef, "exercises", id);
      const docsnap = await getDoc(exerciseRef);

      //to update the assignedOn time in physiotherapist collection
      //assigned time of exercise to be stored
      let timeAssignedOn = null;
      if (docsnap.exists()) {
        const data = docsnap.data();
        timeAssignedOn = data.assignedOn;
        console.log("Document data:", timeAssignedOn);
      } else {
        console.log("No such document!");
      }

      const getPhysios = await getDocs(
        query(
          collection(db, "physiotherapist"),
          where("physiotherapistId", "==", user.uid)
        )
      );
      const physioRef = getPhysios.docs[0].ref;
      const physiosnap = await getDoc(physioRef);
      //assignedOn array of physitherapis to be stored
      let arr = null;
      if (physiosnap.exists()) {
        const data = physiosnap.data();
        arr = data.assignedOn;
        console.log(arr);
      } else {
        console.log("no data");
      }
      //filter the time to  be deleted
      const updatedArray = arr.filter(
        (Timestamp) => Timestamp.seconds !== timeAssignedOn.seconds
      );
      await updateDoc(physioRef, { assignedOn: updatedArray });

      //Delete the exercise
      await deleteDoc(exerciseRef);

      // code to delete assigned exercise  from realtime database
      const exercisesRef = dbRef(
        database,
        "assignedExcercise/" + clientId + "/exercises"
      );

      const querryref = query(exercisesRef, equalTo(id));
      const snapshot = await get(querryref);

      if (snapshot.exists()) {
        //finds the id of the doc inside the exercise node to be deleted
        const childKey = Object.keys(snapshot.val()).find(
          (key) => snapshot.val()[key]["id"] === id
        );

        if (childKey) {
          // Remove the specified child node
          await remove(child(exercisesRef, childKey));
          console.log(`Node deleted successfully.`);
        } else {
          console.log(`Node not found.`);
        }
        console.log("exist", id);
      }

      const exRef = doc(db, "exercises", id);
      const exerciseSnapshot = await getDoc(exRef);

      if (exerciseSnapshot.exists()) {
        const exerciseData = exerciseSnapshot.data();
        if (
          exerciseData.assignedTo &&
          exerciseData.assignedTo.includes(clientId)
        ) {
          const newAssignedTo = exerciseData.assignedTo.filter(
            (id) => id !== clientId
          );
          await updateDoc(exRef, { assignedTo: newAssignedTo });
        } else {
          console.log("Exercise is not assigned to the client.");
        }
      } else {
        console.log("Exercise does not exist.");
      }

      setAssignedExercises();
      // fetchAssignedExercises();
      setLoading(false);
      toast({
        title: "Exercise deleted successfully",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error unassigning exercise!",
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <div>
      <Center className={styles.button}>
        <RiDeleteBin6Line
          color="#0d30ac"
          className={styles.dot}
          onClick={toggleDeleteModal}
        />
      </Center>
      {isOpenDelete && (
        <div className={styles.recheckDelete}>
          <div>
            <h3>
              Delete <span style={{ color: "#0d1dac" }}>{exerciseName}</span>
            </h3>
            <p>Are you sure? You can't undo this action afterwards.</p>
          </div>
          <div className={styles.buttonDelete}>
            <div className={styles.bottoncover}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                style={{
                  borderColor: "#0d30ac",
                  color: "#0d30ac",
                  borderWidth: "1px",
                }}
                className={styles.button1}
                onClick={toggleDeleteModal}
              >
                Cancel
              </motion.button>
              {loading ? (
                <Center
                  style={{ backgroundColor: "#0d30ac" }}
                  className={styles.button1}
                >
                  <Spinner color="white" />
                </Center>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className={styles.button1}
                  style={{ backgroundColor: "#0d30ac", color: "white" }}
                  onClick={handleUnassignExercise}
                >
                  Delete
                </motion.button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
