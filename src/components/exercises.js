import classes from "../styles/Exercises.module.scss";
import { AiOutlineFire } from "react-icons/ai";
import ExerciseFetcher from "../components/data_fetch/exerciseFetcher";
import { useState } from "react";
import { AuthProvider } from "./data_fetch/authProvider";
import { Link } from "react-router-dom";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const handleExercisesFetched = (fetchedExercises) => {
    setExercises(fetchedExercises);
  };

  return (
    <div className={classes.rootExercises}>
      <ExerciseFetcher onExercisesFetched={handleExercisesFetched} />

      <div className={classes.heading}>
        <span>All Exercises</span>
      </div>

      <div className={classes.cardsContainer}>
        {exercises.length > 0
          ? exercises.slice(0, 3).map((Exercise) => {
              return (
                <div className={classes.exercises} key={Exercise.id}>
                  <img src={Exercise.thumbnailURL} alt={Exercise.title}></img>

                  <div className={classes.calories}>
                    {/* <div className={classes.icon}> */}
                    <AiOutlineFire
                      className={classes.reacticon}
                      color="orange"
                    />
                    {/* </div> */}

                    <div className={classes.count}>
                      <span>{Exercise.caloriesBurnPerMin}</span>
                    </div>
                  </div>

                  <div className={classes.title}>
                    <span>{Exercise.Exercise_Name.substring(0, 18)}.</span>
                  </div>
                </div>
              );
            })
          : data.map((item, i) => (
              <div className={classes.exercises} key={i}>
                <img
                  src={`https://firebasestorage.googleapis.com/v0/b/physiotherapy-eb4bb.appspot.com/o/exercise%2Fthumbnails%2Fsit-ups.jpg?alt=media&token=a04a8468-fb1f-4197-8ecf-de3145b875e9
                        `}
                  alt={""}
                ></img>

                <div className={classes.calories}>
                  <div className={classes.icon}>
                    <AiOutlineFire
                      className={classes.reacticon}
                      color="orange"
                    />
                  </div>

                  <div className={classes.count}>
                    <span>{20}</span>
                  </div>
                </div>

                <div className={classes.title}>
                  <span>{"Sit ups"}</span>
                </div>
              </div>
            ))}
      </div>

      <div className={classes.button}>
        <div className={classes.mainbutton}>
          <span>
            <Link to="/Exercises">View All</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Exercises;

const data = [1, 23, 4, 6];
