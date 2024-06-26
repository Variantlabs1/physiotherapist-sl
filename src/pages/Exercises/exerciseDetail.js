import classes from "./ExerciseDetails.module.scss";
import { FiClock } from "react-icons/fi";
import { ImLoop } from "react-icons/im";
import { AiOutlineFire } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { uploadVideo, uploadThumbnail, uploadAll } from "./upload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@chakra-ui/react";

const ExerciseDetails = ({ exercise, onClose }) => {
  const musclesData = exercise.Target;
  const cardsArray = musclesData && musclesData.split(",");
  const [isEditing, setIsEditing] = useState(false);
  const [inputs, setInputs] = useState({});
  const [clicked, setClicked] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    exercise.Preparation
  );

  const handleChange = (e) => {
    setInputs((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const handleUpdate = async () => {
      try {
        const data = { ...inputs, id: exercise.id };

        if (inputs.videoFile && inputs.thumbnailFile) {
          uploadAll(inputs.thumbnailFile, inputs.videoFile, data, setClicked);
        } else if (inputs.thumbnailFile) {
          uploadThumbnail(inputs.thumbnailFile, data, setClicked);
        } else if (inputs.videoFile) {
          uploadVideo(inputs.videoFile, data, setClicked);
        } else {
          const { id, videoFile, thumbnailFile, ...others } = data;
          await updateDoc(doc(db, "exercises", data.id), others);
          handleEdit();
        }
      } catch (e) {
        console.log(e);
      }
    };
    clicked && handleUpdate();
  }, [clicked]);

  const handleEditDescription = () => {
    setIsEditing(true);
  };

  // const handleDescriptionChange = (e) => {
  //   setEditedDescription(e.target.value);
  // };
  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleClick = () => {
    setClicked((prev) => !prev);
  };

  return (
    <div className={classes.exerciseDetailsContainer}>
      <div className={classes.header}>
        <div className={classes.exerciseTitle}>
          <p>{exercise.Exercise_Name}</p>
        </div>

        <div className={classes.buttons} onClick={onClose}>
          Back
        </div>
      </div>

      <div className={classes.container}>
        <div className={classes.left}>
          <div
            className={`${classes.thumbnailContainer} ${classes.thumbnailContainerMobile}`}
          >
            <img
              className={classes.thumbnailImage}
              src={
                inputs.thumbnailFile
                  ? URL.createObjectURL(inputs.thumbnailFile)
                  : exercise.thumbnailURL
              }
              alt="Exercise Thumbnail"
            />
            {isEditing && (
              <label className={classes.label} htmlFor="image">
                Change cover photo
              </label>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              name="thumbnail"
              id="image"
              onChange={(e) =>
                setInputs((p) => ({ ...p, thumbnailFile: e.target.files[0] }))
              }
            />
          </div>

          <div
            className={`${classes.aboutContainer} ${classes.aboutContainerMobile}`}
          >
            <div className={classes.aboutTitle}>
              <p>About</p>
            </div>
            <div className={classes.info}>
              <div className={classes.items}>
                <div className={classes.logo}>
                  <FiClock className={classes.icons} />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    onChange={handleChange}
                    name="duration"
                    id=""
                    defaultValue={exercise.duration}
                  />
                ) : (
                  <p>{inputs.duration ? inputs.duration : exercise.duration}</p>
                )}
                <p>Mins</p>
              </div>
              <div className={classes.items}>
                <div className={classes.logo}>
                  <ImLoop className={classes.icons} color="#59B24F" />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    onChange={handleChange}
                    name="reps"
                    id=""
                    defaultValue={exercise.reps}
                  />
                ) : (
                  <p>{inputs.reps ? inputs.reps : exercise.reps}</p>
                )}
                <p>Reps</p>
              </div>
              <div className={classes.items}>
                <div className={classes.logo}>
                  <AiOutlineFire className={classes.icons} color="#FCBD1B" />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    onChange={handleChange}
                    name="caloriesBurnPerMin"
                    id=""
                    defaultValue={exercise.caloriesBurnPerMin}
                  />
                ) : (
                  <p>
                    {inputs.caloriesBurnPerMinexercise
                      ? inputs.caloriesBurnPerMin
                      : exercise.caloriesBurnPerMin}
                  </p>
                )}
                <p>Calories</p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.right}>
          <div className={classes.descriptionContainer}>
            <div className={classes.descriptionTitle}>
              <p>Description</p>
              <div onClick={handleEditDescription}>
                <BiSolidPencil className={classes.icon} />
              </div>
            </div>

            <div className={classes.descriptionContent}>
              {isEditing ? (
                <div className={classes.editDesc}>
                  <textarea
                    name="description"
                    defaultValue={editedDescription}
                    onChange={handleChange}
                  />

                  <div className={classes.buttons}>
                    <div>
                      <Button
                        className={classes.button}
                        onClick={() => {
                          handleClick(handleEdit);
                        }}
                      >
                        Save
                      </Button>
                    </div>
                    <div>
                      <Button
                        className={classes.button1}
                        onClick={handleEdit}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p>{editedDescription}</p>
              )}
            </div>
          </div>

          <div className={classes.musclesInvolvedContainer}>
            <div className={classes.musclesInvolvedTitle}>
              <p>Muscles Involved</p>
            </div>
            <div className={classes.musclesList}>
              {cardsArray.map((muscles, index) => (
                <div key={index} className={classes.musclesInvolved}>
                  <p>{muscles}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`${classes.videosContainer} ${classes.videosContainerMobile}`}
          >
            <div className={classes.videosTitle}>
              <p>Videos</p>
            </div>
            <div style={{ position: "relative" }} className={classes.videoItem}>
              <video
                autoplay={true}
                controls
                loop
                src={
                  inputs.videoFile
                    ? URL.createObjectURL(inputs.videoFile)
                    : exercise.videoURL
                }
              />

              {isEditing && (
                <label
                  className={`${classes.label} ${classes.label1}`}
                  style={{ border: "none", cursor: "none", width: "35%" }}
                  htmlFor="video"
                >
                  <span>
                    <CloudUploadIcon fontSize="large" />
                  </span>
                  <label className={classes.label} htmlFor="video">
                    Upload new
                  </label>
                </label>
              )}
              <input
                style={{ display: "none" }}
                type="file"
                name="thumbnail"
                id="video"
                onChange={(e) =>
                  setInputs((p) => ({ ...p, videoFile: e.target.files[0] }))
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${classes.aboutContainerMobile}`}>
        <div className={classes.aboutTitle}>
          <p>About</p>
        </div>
        <div className={classes.info}>
          <div className={classes.items}>
            <div className={classes.logo}>
              <FiClock className={classes.icons} />
            </div>
            {isEditing ? (
              <input
                type="text"
                onChange={handleChange}
                name="duration"
                id=""
                defaultValue={exercise.duration}
              />
            ) : (
              <p>{inputs.duration ? inputs.duration : exercise.duration}</p>
            )}
            <p>Mins</p>
          </div>
          <div className={classes.items}>
            <div className={classes.logo}>
              <ImLoop className={classes.icons} color="#59B24F" />
            </div>
            {isEditing ? (
              <input
                type="text"
                onChange={handleChange}
                name="reps"
                id=""
                defaultValue={exercise.reps}
              />
            ) : (
              <p>{inputs.reps ? inputs.reps : exercise.reps}</p>
            )}
            <p>Reps</p>
          </div>
          <div className={classes.items}>
            <div className={classes.logo}>
              <AiOutlineFire className={classes.icons} color="#FCBD1B" />
            </div>
            {isEditing ? (
              <input
                type="text"
                onChange={handleChange}
                name="caloriesBurnPerMin"
                id=""
                defaultValue={exercise.caloriesBurnPerMin}
              />
            ) : (
              <p>
                {inputs.caloriesBurnPerMinexercise
                  ? inputs.caloriesBurnPerMin
                  : exercise.caloriesBurnPerMin}
              </p>
            )}
            <p>Calories</p>
          </div>
        </div>
      </div>
      <div
        className={`${classes.videosContainer} ${classes.videosContainerMobile}`}
      >
        <div className={classes.videosTitle}>
          <p>Videos</p>
        </div>
        <div style={{ position: "relative" }} className={classes.videoItem}>
          <video
            autoplay={true}
            controls
            loop
            src={
              inputs.videoFile
                ? URL.createObjectURL(inputs.videoFile)
                : exercise.videoURL
            }
          />

          {isEditing && (
            <label
              className={classes.label}
              style={{ border: "none", cursor: "none", width: "35%" }}
              htmlFor="video"
            >
              <span>
                <CloudUploadIcon fontSize="large" />
              </span>
              <label className={classes.label} htmlFor="video">
                Upload new
              </label>
            </label>
          )}
          <input
            style={{ display: "none" }}
            type="file"
            name="thumbnail"
            id="video"
            onChange={(e) =>
              setInputs((p) => ({ ...p, videoFile: e.target.files[0] }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetails;

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   width: 100vw;
//   height: 100vh;
//   z-index: 9999;
//   align-items: center;
//   &>h1{
//     font-size: 50px;
//     font-weight: 500;
//   }
// `
