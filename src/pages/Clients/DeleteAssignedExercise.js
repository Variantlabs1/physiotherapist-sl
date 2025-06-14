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
import { get, ref as dbRef, child, remove, orderByChild, equalTo } from "firebase/database";
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

  // Helper function to get client document reference
  const getClientDocRef = (clientId) => {
    // Direct reference to the assignedExcercise document
    return doc(db, "assignedExcercise", clientId);
  };

  // Helper function to find physiotherapist reference
  const findPhysioRef = async (userId) => {
    const res = await getDocs(
      query(collection(db, "physiotherapist"), where("physiotherapistId", "==", userId))
    );
    return res.empty ? null : res.docs[0].ref;
  };

  // Helper function to update physiotherapist's assignedOn array
  const updatePhysioAssignedOn = async (physioRef, timeToRemove) => {
    const physioSnap = await getDoc(physioRef);
    if (!physioSnap.exists()) {
      console.log("No data for physiotherapist");
      return;
    }

    const data = physioSnap.data();
    const assignedOnArray = data.assignedOn || [];
    
    // Filter out the specific timestamp
    const updatedArray = assignedOnArray.filter(
      (timestamp) => timestamp.seconds !== timeToRemove?.seconds
    );
    
    await updateDoc(physioRef, { assignedOn: updatedArray });
  };

  // Helper function to remove from Realtime Database
  const removeFromRealtimeDB = async (clientId, exerciseId) => {
    const exercisesRef = dbRef(database, `assignedExercise/${clientId}/exercises`);
    
    // Query by exercise ID
    const queryRef = query(exercisesRef, orderByChild('id'), equalTo(exerciseId));
    const snapshot = await get(queryRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const childKey = Object.keys(data)[0]; // Get the first (and should be only) matching key
      
      if (childKey) {
        await remove(child(exercisesRef, childKey));
        console.log("Exercise removed from Realtime Database successfully");
      }
    } else {
      console.log("Exercise not found in Realtime Database");
    }
  };

  // Helper function to update exercise's assignedTo array
  const updateExerciseAssignedTo = async (exerciseId, clientIdToRemove) => {
    const exerciseRef = doc(db, "exercises", exerciseId);
    const exerciseSnap = await getDoc(exerciseRef);

    if (!exerciseSnap.exists()) {
      console.log("Exercise does not exist in main collection");
      return;
    }

    const exerciseData = exerciseSnap.data();
    if (exerciseData.assignedTo && exerciseData.assignedTo.includes(clientIdToRemove)) {
      const updatedAssignedTo = exerciseData.assignedTo.filter(
        (assignedClientId) => assignedClientId !== clientIdToRemove
      );
      await updateDoc(exerciseRef, { assignedTo: updatedAssignedTo });
    }
  };

  // Main function to unassign an exercise
  const handleUnassignExercise = async () => {
    if (!user?.uid || !clientId || !id) {
      toast({
        title: "Missing required information",
        status: "error",
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    
    try {
      // 1. Get the client document reference (direct path to assignedExcercise)
      const clientRef = getClientDocRef(clientId);

      // 2. Get the exercise document and extract assignedOn timestamp
      const exerciseRef = doc(clientRef, "exercises", id);
      const exerciseSnap = await getDoc(exerciseRef);
      
      if (!exerciseSnap.exists()) {
        throw new Error("Exercise assignment not found");
      }

      const exerciseData = exerciseSnap.data();
      const timeAssignedOn = exerciseData.assignedOn;

      // 3. Find and update physiotherapist's assignedOn array
      const physioRef = await findPhysioRef(user.uid);
      if (physioRef && timeAssignedOn) {
        await updatePhysioAssignedOn(physioRef, timeAssignedOn);
      }

      // 4. Delete the exercise assignment from client's exercises
      await deleteDoc(exerciseRef);

      // 5. Remove from Realtime Database
      await removeFromRealtimeDB(clientId, id);

      // 6. Update the main exercise's assignedTo array
      await updateExerciseAssignedTo(id, clientId);

      // 7. Update UI and notify user
      if (setAssignedExercises) {
        setAssignedExercises();
      }
      
      toast({
        title: "Exercise unassigned successfully",
        status: "success",
        isClosable: true,
      });

      // Close the modal (don't pass event to avoid stopPropagation errors)
   

    } catch (error) {
      console.error("Error unassigning exercise:", error);
      toast({
        title: error.message || "Error unassigning exercise!",
        status: "error",
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Center className={styles.button}>
        <RiDeleteBin6Line
          color="#0d30ac"
          className={styles.dot}
          onClick={(e) => toggleDeleteModal(e)}
        />
      </Center>
      {isOpenDelete && (
        <div className={styles.recheckDelete}>
          <div>
            <h3>
              Unassign <span style={{ color: "#0d1dac" }}>{exerciseName}</span>
            </h3>
            <p>Are you sure? This will remove the exercise assignment from the client.</p>
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
                onClick={(e) => toggleDeleteModal(e)}
                disabled={loading}
              >
                Cancel
              </motion.button>
              {loading ? (
                <Center
                  style={{ backgroundColor: "#0d30ac" }}
                  className={styles.button1}
                >
                  <Spinner color="white" size="sm" />
                </Center>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className={styles.button1}
                  style={{ backgroundColor: "#0d30ac", color: "white" }}
                  onClick={handleUnassignExercise}
                >
                  Unassign
                </motion.button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}