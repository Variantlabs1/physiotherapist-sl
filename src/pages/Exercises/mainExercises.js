import React, { useState } from "react";
import ExercisesPage from "./exercisesPage";
import AddExercises from "./addExercises";

import ExerciseDetails from "./exerciseDetail"; // Import the ExerciseDetails component
import { useLocation } from "react-router-dom";

const MainExercises = () => {
    const [showAddExercises, setShowAddExercises] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const location = useLocation();
    const clientId  = location.search.split('=')[1]

    const handleAddExercisesClick = () => {
        setShowAddExercises(true);

    };

    const handleExerciseCardClick = (exercise) => {
        setSelectedExercise(exercise);
    };

    const handleBackClick = () => {
        setShowAddExercises(false);
        setSelectedExercise(null); // Reset selected exercise when going back to ExercisesPage
    };

    return (
        <div style={{width: "100%"}}>
            {showAddExercises ? (
                <AddExercises   onBackClick={handleBackClick} />
            ) :
             (selectedExercise && clientId) ? 
                (<AddExercises clientId={clientId} selectedExercise={selectedExercise} onBackClick={handleBackClick} />)
                 :selectedExercise?

                <ExerciseDetails
                    exercise={selectedExercise}
                    onClose={() => setSelectedExercise(null)}
                />
             : (<ExercisesPage
                clientId={clientId}
                    onAddExercisesClick={handleAddExercisesClick}
                    onExerciseCardClick={handleExerciseCardClick}
                />)
            }
        </div>
    );
};

export default MainExercises;
