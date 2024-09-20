import { useEffect, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "./authProvider";
import { useQuery } from "@tanstack/react-query";

const ExerciseFetcher = ({ onExercisesFetched }) => {
  const { user } = useContext(AuthContext);

  const fetchExercises = async () => {
    try {
      // Define the query to retrieve exercises for a specific user
      const q = query(
        collection(db, "Default exercises"),
        where("physioId", "==", user?.uid)
      );

      // Fetch the documents that match the query
      const querySnapshot = await getDocs(q);

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
    queryKey: ["exercises"],
    queryFn: fetchExercises,
  });

  useEffect(() => {
    if (exercises) {
      onExercisesFetched(exercises);
    }
  }, [exercises]);

  return null;
};

export default ExerciseFetcher;
