import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import classes from "./AssignExercises.module.scss";

const AssignExercises = ({
    assignedExercises,
    exercises,
    handleUnassignExercise,
    handleAssignExercise,
}) => {
    return (
        <div className={classes.assignExercises}>
            <div className={classes.assignedExercises}>
                <div className={classes.heading}>
                    <p>Assigned Exercises</p>
                </div>

                <div className={classes.cards}>
                    {assignedExercises.map((exercise) => (
                        <div className={classes.exercise} key={exercise.id}>
                            <div className={classes.exerciseName}>
                                <p>{exercise.title}</p>
                            </div>

                            <div className={classes.delete}>
                                <RiDeleteBin6Line
                                    className={classes.icon}
                                    onClick={() =>
                                        handleUnassignExercise(exercise.id)
                                    }
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={classes.exerciseList}>
                <div className={classes.heading}>
                    <p>All Exercises</p>
                </div>

                <div className={classes.cards}>
                    {exercises.map((exercise) => (
                        <div className={classes.exercise} key={exercise.id}>
                            <div className={classes.exerciseName}>
                                <p>{exercise.title}</p>
                            </div>

                            <div className={classes.assign}>
                                <button
                                    onClick={() =>
                                        handleAssignExercise(exercise.id)
                                    }
                                >
                                    Assign
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AssignExercises;
