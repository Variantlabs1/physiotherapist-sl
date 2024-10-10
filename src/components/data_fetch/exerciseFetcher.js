import { useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Ensure your db import is correct
import { AuthContext } from "./authProvider";
import { useQuery } from "@tanstack/react-query";

const ExerciseFetcher = ({ onExercisesFetched }) => {
  const { user } = useContext(AuthContext);

  const fetchExercises = async () => {
    try {
      // Define the reference to the exercises collection for the specific physio
      const exercisesRef = collection(db, `physiotherapist/${user?.uid}/exercises`);

      // Fetch the documents in the exercises collection
      const querySnapshot = await getDocs(exercisesRef);

      // Extract the data from the query snapshot
      const exerciseData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return exerciseData;
    } catch (error) {
      console.error("Error fetching exercises: ", error);
    }
  };

  const { data: exercises } = useQuery({
    queryKey: ["exercises", user?.uid], // Include user ID to invalidate query on user change
    queryFn: fetchExercises,
    enabled: !!user?.uid, // Only run the query if the user ID is available
  });

  useEffect(() => {
    if (exercises) {
      onExercisesFetched(exercises);
    }
  }, [exercises, onExercisesFetched]);

  return null;
};

export default ExerciseFetcher;
