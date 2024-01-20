import React, { useEffect, useState } from "react";
import styles from "./ExercisesPage.module.scss"; // Replace with your CSS/SCSS module for styling
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import ExerciseFetcher from "../../components/data_fetch/exerciseFetcher";
// import { deleteDoc, doc } from "firebase/firestore";
// import { db } from "../../firebase";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AuthProvider } from "../../components/data_fetch/authProvider";
import { collection, deleteDoc, doc, endBefore, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { db } from "../../firebase";
import styled from "styled-components";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



const ExercisesPage = ({clientId, onAddExercisesClick, onExerciseCardClick }) => {
    const [exercises, setExercises] = useState([]);
    const [isGrid, setIsGrid] = useState(false);
    const [client,setClient] = useState(null)
    const [pageNumber,setPageNumber] = useState(1)
    const [direction,setDirection] = useState(null)
    const [lastDocument,setLastDocument] = useState(null)
    

useEffect(()=>{
     const getDefaultExercises = async()=>{
        try{           
            const clientData = await getDocs(query(collection(db,"Users"),where("userId","==",clientId)))
           !clientData.empty && setClient(clientData.docs[0].data())


           if(pageNumber>1 && lastDocument){
           const pointer = direction==='next'?startAfter(lastDocument):endBefore(lastDocument)

              const res = await getDocs(query(collection(db,"Default excercises"),limit(3),orderBy("Exercise_Name"),pointer))
            setExercises(res.docs.map(doc=>(doc.data())))
            setLastDocument(res.docs[res.docs.length-1])
           }else{
            const res = await getDocs(query(collection(db,"Default excercises"),limit(3),orderBy("Exercise_Name"),))
            setExercises(res.docs.map(doc=>(doc.data())))
            setLastDocument(res.docs[res.docs.length-1])
           }
        }catch(e){
            console.log(e)
        }
     }
        
        
        clientId&&getDefaultExercises()

    },[clientId,pageNumber,direction])

    const handleExercisesFetched = (fetchedExercises) => {
       !clientId&& setExercises(fetchedExercises);
    };

    const toggleView = () => {
        setIsGrid(!isGrid);
    };

   const handleDelete = async(e,id)=>{
    e.stopPropagation();

    try{
        await deleteDoc(doc(db,"exercises",id))
        setExercises(exercises.filter(e=>e.id!==id))
    }catch(e){
        console.log(e)
    }

   }

    return (
        <div className={styles.rootExercises}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <p>All Exercises</p>
                </div>

                <div className={styles.buttons}>
                    <div className={styles.addExercise}>
                        <button onClick={onAddExercisesClick}>Add</button>
                    </div>
                    <div className={styles.toggle} onClick={toggleView}>
                        {isGrid ? (
                            <HiOutlineViewList className={styles.icon} />
                        ) : (
                            <HiOutlineViewGrid className={styles.icon} />
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                {/* Render the ExerciseFetcher component to fetch data */}
                <ExerciseFetcher onExercisesFetched={handleExercisesFetched} />

                {/* Render the exercises */}
                {
                    clientId && (
                        <Top>
                            <Pagination>
                                <Button disabled={!(pageNumber>1&&pageNumber<=60)} onClick={()=>{setPageNumber(p=>p-1);setDirection('previous')}}   >
                                <ArrowBackIosIcon />
                                </Button>
                                <h4>{pageNumber}</h4>
                                <Button disabled={!(pageNumber>0&&pageNumber<60)} onClick={()=>{setPageNumber(p=>p+1);setDirection('next')}}>
                                <ArrowForwardIosIcon  />
                                </Button>
                            </Pagination>
                        </Top>
                    )
                }
                <div
                    className={
                        isGrid ? styles.gridContainer : styles.listContainer
                    }
                >
                    {exercises.map((exercise) => (
                        <div
                            key={exercise.id}
                            className={styles.card}
                            onClick={() => onExerciseCardClick(exercise)}
                        >
                            {/* Exercise card content */}
                          { !clientId&& <div className={styles.imageContainer}>
                                <img 
                                    src={exercise.thumbnailURL}
                                    alt={''}
                                />
                            </div>}
                            <div  style={clientId&&{width:"100%", minHeight:"max-content"}}  className={styles.textContainer}>
                                <div className={styles.titleBar}>
                                    <h3  style={{fontSize:clientId&&16}} >{exercise.title?exercise.title:exercise.Exercise_Name}</h3>
                              {!clientId &&      <div className={styles.icon} 
                                           onClick={(e)=>handleDelete(e,exercise.id)} >

                                        <DeleteOutlineOutlinedIcon htmlColor="tomato" 
                                            className={styles.dot}
                                        />
                                    </div>}
                                </div>
                                <p     >{exercise.description?exercise.description:exercise.Preparation}</p>
                            </div>
                            {/* <button
                                className={styles.deleteButton}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent card click event from firing
                                    handleDeleteExercise(exercise.id);
                                }}
                            >
                                Delete
                            </button> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExercisesPage;

const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
 
`

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

 `
const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    &:disabled{
        cursor: not-allowed;
    }
`
 
