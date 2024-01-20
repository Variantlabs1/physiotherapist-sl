import classes from "./ExerciseDetails.module.scss";
import { FiClock } from "react-icons/fi";
import { ImLoop } from "react-icons/im";
import { AiOutlineFire } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import styled from "styled-components";
import {uploadVideo,uploadThumbnail, uploadAll} from "./upload"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Modal } from "@mui/material";

const ExerciseDetails = ({ exercise, onClose }) => {
    const musclesData = exercise.musclesInvolved;
    const cardsArray = musclesData.split(",");
    const [isEditing, setIsEditing] = useState(false);
    const [inputs,setInputs] = useState({})
    const [clicked,setClicked] = useState(false)
    const [editedDescription, setEditedDescription] = useState(
        exercise.description
    );

    const handleChange = (e)=>{
        setInputs(p=>(
            {...p,[e.target.name]:e.target.value}
        ))
    }

    useEffect(()=>{
        const handleUpdate = async()=>{
            try{
            const data={...inputs,id:exercise.id};
    
            if(inputs.videoFile && inputs.thumbnailFile){
                 uploadAll(inputs.thumbnailFile,inputs.videoFile,data,setClicked)
            }
            else if(inputs.thumbnailFile){
                 uploadThumbnail(inputs.thumbnailFile,data,setClicked)
            }
            else if(inputs.videoFile){
                uploadVideo(inputs.videoFile,data,setClicked)
            }
            else{
                const {id,videoFile,thumbnailFile,...others} = data
                await updateDoc(doc(db,"exercises",data.id),others)
                setClicked(false)
            }
            console.log('done')
    
        }catch(e){
            console.log(e)
        }
    
        }
        clicked && handleUpdate()
    },[clicked])


    const handleEditDescription = () => {
        setIsEditing(true);
    };

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };

  
    return (
        clicked? 
        <Modal open={clicked} >
            <Container>
                <h1>Please wait...</h1>
            </Container>
        </Modal>
        :

        <div className={classes.exerciseDetailsContainer}>
            <div className={classes.header}>
                <div className={classes.exerciseTitle}>
                    <p>{exercise.title}</p>
                </div>

                <div className={classes.buttons} onClick={onClose}>
                    <div className={classes.button}>
                        <p>Back</p>
                    </div>
                </div>
            </div>

            <div className={classes.container}>
                <div className={classes.left}>
                    <div  className={classes.thumbnailContainer}>
                        <img
                            className={classes.thumbnailImage}
                            src={inputs.thumbnailFile?URL.createObjectURL(inputs.thumbnailFile):exercise.thumbnailURL}
                            alt="Exercise Thumbnail"
                        />
                        {isEditing && <Label  htmlFor="image">Change cover photo</Label>}
                        <input style={{display:'none'}}  type="file" name="thumbnail" id="image" onChange={e=>setInputs(p=>({...p,thumbnailFile:e.target.files[0]}))}  />
                    </div>

                    <div className={classes.aboutContainer}>
                        <div className={classes.aboutTitle}>
                            <p>About</p>
                        </div>
                        <div className={classes.info}>
                            <div className={classes.items}>
                                <div className={classes.logo}>
                                    <FiClock className={classes.icons} />
                                </div>
                                {
                                    isEditing?
                                    <Input type="text" onChange={handleChange} name="duration" id="" defaultValue={exercise.duration}/>
                                : <p>{inputs.duration?inputs.duration:exercise.duration}</p>
                                }
                                <p>Mins</p>
                            </div>
                            <div className={classes.items}>
                                <div className={classes.logo}>
                                    <ImLoop
                                        className={classes.icons}
                                        color="#59B24F"
                                    />
                                </div>
                                {
                                    isEditing?
                                    <Input type="text" onChange={handleChange} name="reps" id="" defaultValue={exercise.reps}/>
                                    :
                                <p>{inputs.reps?inputs.reps:exercise.reps}</p>

                                }
                                <p>Reps</p>
                            </div>
                            <div className={classes.items}>
                                <div className={classes.logo}>
                                    <AiOutlineFire
                                        className={classes.icons}
                                        color="#FCBD1B"
                                    />
                                </div>
                                {
                                    isEditing?
                                    <Input type="text" onChange={handleChange} name="caloriesBurnPerMin" id="" defaultValue={exercise.caloriesBurnPerMin}/>
                                    :
                                    <p>{inputs.caloriesBurnPerMinexercise?inputs.caloriesBurnPerMin:exercise.caloriesBurnPerMin}</p>
                                }
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
                                        name='description'
                                        defaultValue={editedDescription}
                                        onChange={handleChange}
                                    />

                                    <div
                                        className={classes.buttons}
                                        onClick={()=>{setClicked(true);setIsEditing(false)}}
                                    >
                                        <div className={classes.button}>
                                            <p>Save</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p >{editedDescription}</p>
                            )}
                        </div>
                    </div>

                    <div className={classes.musclesInvolvedContainer}>
                        <div className={classes.musclesInvolvedTitle}>
                            <p>Muscles Involved</p>
                        </div>
                        <div className={classes.musclesList}>
                            {cardsArray.map((muscles, index) => (
                                <div
                                    key={index}
                                    className={classes.musclesInvolved}
                                >
                                    <p>{muscles}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={classes.videosContainer}>
                        <div className={classes.videosTitle}>
                            <p>Videos</p>
                        </div>
                        <div style={{position:'relative'}}  className={classes.videoItem}>
                            <video  autoplay={true}  controls loop src={inputs.videoFile?URL.createObjectURL(inputs.videoFile):exercise.videoURL}/>
                            
                          {isEditing &&  <Label style={{border:'none',cursor:'none',width:'35%'}}  htmlFor="video" >
                              <span><CloudUploadIcon fontSize="large" /></span>
                              <Label htmlFor="video"  >Upload new</Label>
                          </Label>}
                        <input style={{display:'none'}}  type="file" name="thumbnail" id="video" onChange={e=>setInputs(p=>({...p,videoFile:e.target.files[0]}))}  />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExerciseDetails;

const Input = styled.input`
    background-color:transparent;
    align-self: center;
    border:none;
    max-width: fit-content;
    text-align: center;
    font-size: 16px;
    &:focus{
        outline:none;
    }

`

const Label = styled.label`
    cursor: pointer;
    padding:6px 15px;
    width: 80%;
    align-self: center;
    text-align: center;
    
    display:flex;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
border: 1px solid #614D8F;
flex-direction: column;
background: #FFF;
box-shadow: 0px 2px 8px 0px rgba(231, 243, 255, 0.15), 0px 2px 6px 0px rgba(231, 243, 255, 0.25);
&>span{
    border-radius: 50%;
background: #E7F3FF;
display: flex;
width: 80px;
height: 80px;
justify-content: center;
align-items: center;
cursor: pointer;
    
}
&>label{
    width: 100%;
}
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  align-items: center;
  &>h1{
    font-size: 50px;
    font-weight: 500;
  }
`