import { useState, useEffect, useContext } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { AuthContext } from "./authProvider";

const ExerciseFetcher = ({ onExercisesFetched }) => {
    const [exercises, setExercises] = useState([]);
    const {user} = useContext(AuthContext)


    useEffect(() => {
        // Define the query to retrieve exercises for a specific user

        // Fetch the documents that match the query
        const fetchExercises = async () => {
            try {
                const q = query(
                    collection(db, "exercises"),
                    where("physioId", "==", user?.uid)
                );

                const querySnapshot = await getDocs(q);

                // Extract the data from the query snapshot
                const exerciseData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Set the exercises state with the retrieved data
                setExercises(exerciseData);
                onExercisesFetched(exerciseData); // Pass the fetched data to the parent component
            } catch (error) {
                console.error("Error fetching exercises: ", error);
            }
        };

        // Call the fetchExercises function to retrieve data
        fetchExercises();
    }, [user]);

    return null;
};

export default ExerciseFetcher;
