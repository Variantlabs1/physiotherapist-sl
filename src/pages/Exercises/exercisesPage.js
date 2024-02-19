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
import { Button, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";



const ExercisesPage = ({clientId, onAddExercisesClick, onExerciseCardClick }) => {
    const navigate = useNavigate();
    const [exercises, setExercises] = useState([]);
    const [isGrid, setIsGrid] = useState(false);
    const [client,setClient] = useState(null)
    const [pageNumber,setPageNumber] = useState(1)
    const [direction,setDirection] = useState(null)
    const [lastDocument,setLastDocument] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);

    
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 430);
        };
    
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Remove event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

useEffect(()=>{
     const getDefaultExercises = async()=>{
        try{           
            const clientData = await getDocs(query(collection(db,"Users"),where("userId","==",clientId)))
           !clientData.empty && setClient(clientData.docs[0].data())


           if(pageNumber>1 && lastDocument){
           const pointer = direction==='next'?startAfter(lastDocument):endBefore(lastDocument)

              const res = await getDocs(query(collection(db,"Default excercises"),limit(4),orderBy("Exercise_Name"),pointer))
            setExercises(res.docs.map(doc=>(doc.data())))
            setLastDocument(res.docs[res.docs.length-1])
           }else{
            const res = await getDocs(query(collection(db,"Default excercises"),limit(4),orderBy("Exercise_Name"),))
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
        setExercises(fetchedExercises);
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
   const backHandler = () => {
     clientId ? window.location.replace('/Clients?client='+ clientId) : navigate(-1);
   }
    return (
        <div className={styles.rootExercises}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <p>All Exercises</p>
                </div>

                <div className={styles.buttons}>
                    <Button colorScheme="blue" variant="outline" onClick={backHandler}>Back</Button>
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
                {!clientId && <ExerciseFetcher onExercisesFetched={handleExercisesFetched} />}

                {/* Render the exercises */}
                {
                    clientId && (
                        <div className={styles.arrow}>
                            <div className={styles.pagination}>
                                <button disabled={!(pageNumber>1&&pageNumber<=60)} onClick={()=>{setPageNumber(p=>p-1);setDirection('previous')}}   >
                                <ArrowBackIosIcon />
                                </button>
                                <Center fontSize={["1rem","1rem","1rem","1.2rem"]}>{pageNumber}</Center>
                                <button disabled={!(pageNumber>0&&pageNumber<60)} onClick={()=>{setPageNumber(p=>p+1);setDirection('next')}}>
                                <ArrowForwardIosIcon  />
                                </button>
                            </div>
                        </div>
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
                          { !clientId&& 
                                <img 
                                    className={styles.imageContainer}
                                    src={exercise.thumbnailURL}
                                    alt={''}
                                />}
                            <div  style={clientId&&{width:"100%", minHeight:"max-content"}}  className={styles.textContainer}>
                                <div className={styles.titleBar}>
                                {/* style={{fontSize:clientId&&16}} */}
                                    <h3 >{exercise.title?exercise.title:exercise.Exercise_Name}</h3>
                                    {!clientId && <div className={styles.icon} 
                                           onClick={(e)=>handleDelete(e,exercise.id)} >

                                        <DeleteOutlineOutlinedIcon htmlColor="#362f69" 
                                            className={styles.dot}
                                        />
                                    </div>}
                                </div>
                                {/* <p>{exercise.description?exercise.description:exercise.Preparation}</p> */}
                                {isMobile ? <p>{exercise.Preparation.substring(0, 80)}...</p> :
                                    <p>{exercise.Preparation.substring(0, 180)}...</p> }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExercisesPage;
 
