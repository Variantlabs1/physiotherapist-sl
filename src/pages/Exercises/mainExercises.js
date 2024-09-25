import React, { useState } from "react";
import ExercisesPage from "./exercisesPage";
import AddExercises from "./addExercises";
import ExerciseDetails from "./exerciseDetail";
import { useLocation } from "react-router-dom";

const MainExercises = () => {
  const [showAddExercises, setShowAddExercises] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const location = useLocation();
  const clientId = location.search.split("=")[1];

  const handleAddExercisesClick = () => {
    setShowAddExercises(true);
    setSelectedExercise(null); // Optional: reset selectedExercise when adding new
  };

  const handleExerciseCardClick = (exercise) => {
    setSelectedExercise(exercise); // Set selected exercise
    setShowAddExercises(true); // Navigate to AddExercises view
  };

  const handleBackClick = () => {
    setShowAddExercises(false);
    setSelectedExercise(null);
  };

  return (
    <div style={{ width: "100%", padding: "2% 3%", position: "relative" }}>
      {showAddExercises ? (
        <AddExercises
          clientId={clientId}
          selectedExercise={selectedExercise} // Pass the selected exercise details
          onBackClick={handleBackClick}
        />
      ) : selectedExercise ? (
        <ExerciseDetails
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      ) : (
        <ExercisesPage
          clientId={clientId}
          onAddExercisesClick={handleAddExercisesClick}
          onExerciseCardClick={handleExerciseCardClick}
        />
      )}
    </div>
  );
};


export default MainExercises;
