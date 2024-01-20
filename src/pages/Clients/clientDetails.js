import React, { useEffect, useState, useRef, useContext } from "react";
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    updateDoc,
    arrayUnion,
    doc,
    setDoc,
    serverTimestamp,
    addDoc,
    onSnapshot,
    Timestamp,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import ExerciseFetcher from "../../components/data_fetch/exerciseFetcher";
import classes from "./ClientDetails.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import HealthDataComponent from "./healthData";
import ClientData from "./clientData";
import FormCheck from "./formCheck";
import Chart from "../../components/chart";
import DailyChart from "./DailyChart";
import ClientsPage from "./clientsPage";
import { AuthContext } from "../../components/data_fetch/authProvider";
import Measurement from "./Measurement";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { database } from "../../firebase";
import { set,get,ref as dbRef,push, child, remove, orderByChild, equalTo, orderByKey } from "firebase/database";


const ClientDetails = ({clientDocId, client, onBackToList }) => {
    const [weeklyExercises,setWeeklyExercises] = useState(null)
    const [showFormCheck, setShowFormCheck] = useState(false);
    const {user} = useContext(AuthContext)
    const [assignedExercises, setAssignedExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [showAssignExercise, setShowAssignExercise] = useState(false);
    const [showNutrition, setShowNutrition] = useState(false);
    const [fetch,setFetch] = useState(false)
    const [displayExercises,setDisplayExercises] = useState(false)
    const [nutritionData, setNutritionData] = useState({
        calories: " ",
        fats: "",
        proteins: "",
        carbohydrates: "",
    });

    const toggleNutritionOverlay = () => {
        setShowNutrition(!showNutrition);
    };

    const [docId, setDocId] = useState("constant");
    const userIdToFind = client.userId; // Actual userID

    useEffect(()=>{
        if(clientDocId){
            setDisplayExercises(true)

        }
    },[clientDocId])

    useEffect(() => {
        // console.log("Fetching DocId :");
        async function fetchDocId() {
            try {
                const usersRef = collection(db, "Users");
                const q = query(usersRef, where("userId", "==", userIdToFind));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // Assuming you're only interested in the first matching document
                    const doc = querySnapshot.docs[0];
                    setDocId(doc.id);
                } else {
                    console.log("No document found with the specified userID.");
                }
            } catch (error) {
                console.error("Error fetching document ID:", error);
            }
        }

        fetchDocId();
    }, [userIdToFind, docId]);

    useEffect(() => {
        // console.log("Nutritions");
        async function fetchClientNutritionData() {
            try {
                const userDocRef = doc(db, "Users", docId);
                const nutritionDocRef = doc(
                    userDocRef,
                    "Calories",
                    "nutritionData"
                );
                const nutritionSnapshot = await getDoc(nutritionDocRef);

                if (nutritionSnapshot.exists()) {
                    const nutritionDataFromFirebase = nutritionSnapshot.data();
                    setNutritionData({
                        calories: nutritionDataFromFirebase.calories || "",
                        fats: nutritionDataFromFirebase.fats || "",
                        proteins: nutritionDataFromFirebase.proteins || "",
                        carbohydrates:
                            nutritionDataFromFirebase.carbohydrates || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching nutrition data:", error);
            }
        }

        if (docId !== "constant") {
            fetchClientNutritionData();
        }
    }, [docId]);


    const assignNutritionData = async () => {
        
        if (
            !nutritionData.calories ||
            !nutritionData.fats ||
            !nutritionData.proteins ||
            !nutritionData.carbohydrates
        ) {
            // You can add error handling here to display a message to the user.
            console.error("Please fill in all nutrition fields.");
            setShowNutrition(!showNutrition)

            // return;
        } else {
        //     console.log(userId)
            try {
                // Reference to the user's document and the "Calories" subcollection
                // const userDocRef = doc(db, "Users", userId);

                 const getUser = await getDocs(collection(db,"Users"),where("userId","==",client.userId))
                 const getUserRef = getUser.docs[0].ref

                const caloriesCollectionRef = collection(
                    // db,"Users",getUserId,
                    getUserRef,
                    "nutrition"
                    
                );

                // Set the nutrition data in the "Calories" subcollection
                await addDoc(caloriesCollectionRef, {
                    calories: nutritionData.calories,
                    fats: nutritionData.fats,
                    proteins: nutritionData.proteins,
                    carbohydrates: nutritionData.carbohydrates,
                    assignedOn:Timestamp.now()
                });
                setShowNutrition(!showNutrition)
                console.log("assigned successfully")

            } catch (error) {
                console.error("Error assigning nutrition data:", error);
            }
        }
    };

    //Fetching the exercises
    const handleExercisesFetched = (fetchedExercises) => {
        setExercises(fetchedExercises);
    };

    // console.log(client)

    //Fetching assigned exercises
    useEffect(()=>{
        const fetchAssignedExercises = async () => {
            try {
                const getClientDoc = await getDocs(query(collection(db,"Users"),where("userId","==",client.userId)))
                const clientDocRef = getClientDoc.docs[0].ref
                const exercisesRef = collection(clientDocRef,"exercises");
                const q = query(
                    exercisesRef,
                    where("physioId","==",user.uid),
                    );
                    const querySnapshot = await getDocs(q);

                  const  data = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                console.log(data);
                setAssignedExercises(data);

                const today=new Date()
                const sun=new Date(new Date().setDate(today.getDate()-today.getDay()))
                const weeklyExercisesData=[]
                for (let i = 0; i <7; i++) {
                  const singleDayExercises =   data.filter(e=>new Date(e.assignedOn.toDate()).toLocaleDateString()===new Date(new Date(sun).setDate(sun.getDate()+i)).toLocaleDateString() )
                    weeklyExercisesData.push(singleDayExercises.length)
                }
                

                 setWeeklyExercises(weeklyExercisesData)


            } catch (error) {
                console.error("Error fetching assigned exercises:", error);
            }
        };
        fetchAssignedExercises()

    },[fetch,client,user])


    const assignedExercisesRef = useRef(null);

    useEffect(() => {
        // console.log("scroll");
        if (showAssignExercise && assignedExercisesRef.current) {
            assignedExercisesRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [showAssignExercise]);

    //To Unassign an exercise
    const handleUnassignExercise = async (exerciseId, clientId) => {
        try {
            //code to delete document from exercises subcollection 
            let clientRef = null;
            const  res = await getDocs(query(collection(db,"Users"),where('userId',"==",clientId))) 
            if(!res.empty){
                clientRef = res.docs[0].ref
            }
            
            const exerciseRef = doc(clientRef, "exercises", exerciseId);
            const docsnap = await getDoc(exerciseRef);
            
            //to update the assignedOn time in physiotherapist collection
            //assigned time of exercise to be stored
            let timeAssignedOn = null;
            if (docsnap.exists()) {
                const data = docsnap.data();
                timeAssignedOn = data.assignedOn; 
                console.log("Document data:", timeAssignedOn);
            } else {
                console.log("No such document!");
            }

            const getPhysios = await getDocs(query(collection(db,'physiotherapist'),where('physiotherapistId',"==",user.uid)))
            const physioRef = getPhysios.docs[0].ref;
            const physiosnap = await getDoc(physioRef);
            //assignedOn array of physitherapis to be stored
            let arr = null;
            if(physiosnap.exists()){
                const data = physiosnap.data();
                arr = data.assignedOn;
                console.log(arr);
            }
            else{
                console.log("no data");
            }
            //filter the time to  be deleted
            const updatedArray = arr.filter(Timestamp => Timestamp.seconds !== timeAssignedOn.seconds);
            await updateDoc(physioRef, {assignedOn: updatedArray});

            //Delete the exercise 
            await deleteDoc(exerciseRef);
            
            // code to delete assigned exercise  from realtime database
            const exercisesRef = dbRef(database, 'assignedExcercise/' + clientId + '/exercises');

            const querryref = query(exercisesRef, equalTo(exerciseId));
            const snapshot = await get(querryref);

            if (snapshot.exists()) {
                //finds the id of the doc inside the exercise node to be deleted
                const childKey = Object.keys(snapshot.val()).find(key => snapshot.val()[key]['id'] === exerciseId);

                if (childKey) {
                    // Remove the specified child node
                    await remove(child(exercisesRef, childKey));
                    console.log(`Node deleted successfully.`);
                  } else {
                    console.log(`Node not found.`);
                  }
                console.log('exist', exerciseId);
              }
              //update the state of assigned exercises
              const getClientDoc = await getDocs(query(collection(db,"Users"),where("userId","==",client.userId)))
                const clientDocRef = getClientDoc.docs[0].ref
                const exercisesRef1 = collection(clientDocRef,"exercises");
                const q = query(
                    exercisesRef1,
                    where("physioId","==",user.uid),
                    );
                    const querySnapshot = await getDocs(q);

                  const  data = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                setAssignedExercises(data);

            // const exerciseRef = doc(db, "exercises", exerciseId);
            // const exerciseSnapshot = await getDoc(exerciseRef);

            // if (exerciseSnapshot.exists()) {
            //     const exerciseData = exerciseSnapshot.data();
            //     if (
            //         exerciseData.assignedTo &&
            //         exerciseData.assignedTo.includes(client.userID)
            //     ) {
            //         const newAssignedTo = exerciseData.assignedTo.filter(
            //             (id) => id !== client.userID
            //         );
            //         await updateDoc(exerciseRef, { assignedTo: newAssignedTo });
            //         // Update the exercises state to immediately reflect the change
            //         const updatedExercises = exercises.map((exercise) => {
            //             if (exercise.id === exerciseId) {
            //                 return {
            //                     ...exercise,
            //                     assignedTo: newAssignedTo,
            //                 };
            //             }
            //             return exercise;
            //         });

            //         setExercises(updatedExercises);
            //         console.log("Exercise unassigned successfully!");
            //     } else {
            //         console.log("Exercise is not assigned to the client.");
            //     }
            // } else {
            //     console.log("Exercise does not exist.");
            // }

            // fetchAssignedExercises();
        } catch (error) {
            console.error("Error unassigning exercise:", error);
        }
    };


    //Show All exercises
    const [showAllExercises, setShowAllExercises] = useState(false);
    const allExercisesHandler = () => {
        setShowAllExercises(!showAllExercises);
    };

    //Assign Exercise
    const assignExerciseHandler = () => {
        setShowAssignExercise(!showAssignExercise);
    };

    const handleAssignExercise = async (exerciseId) => {
        try {
             const exerciseRef = doc(db, "exercises", exerciseId);
            await updateDoc(exerciseRef, {
                assignedToClient: arrayUnion({
                    clientId:client.userId,
                    assignedOn:new Date()
                }),


            });
            setFetch(!fetch)
        console.log("working")

        }catch(e){
            console.log(e)
        }

        }

    return (
        <>
            {showFormCheck ?  showFormCheck==='Form Check'? (
                <FormCheck clientId={client.userId} onBackClick={()=>setShowFormCheck(null)} />
            ):
            <Measurement  clientId={client.userId} onBackClick={setShowFormCheck} />
            : displayExercises? 
            <div
            className={classes.assignedExercises}
            ref={assignedExercisesRef}
        >   
            <div className={classes.container}>
                <div className={classes.heading}>
                    <p>Assigned Exercises</p>
                </div>

                <div className={classes.cards}>
                    {assignedExercises.map((exercise) => (
                        <div
                            className={classes.exercise}
                            key={exercise?.id}
                        >
                            <div
                                className={
                                    classes.exerciseName
                                }
                            >
                                <p>{exercise?.title ? exercise.title : exercise.Exercise_Name}</p>
                            </div>

                            <div className={classes.delete}>
                                <RiDeleteBin6Line
                                    className={classes.icon}
                                    onClick={() =>
                                        handleUnassignExercise(
                                            exercise?.id, 
                                            client.userId
                                        )
                                    }
                                />

                            </div>
                        </div>
                    ))}
                </div>

                <div className={classes.footer}>
                    <Button bgColor='#8db2f9' color='white' _hover={{bgColor: '#8db2d2'}} onClick={() => {setDisplayExercises(false)}}>Back</Button>
                    <div
                        className={classes.buttons}
                        onClick={allExercisesHandler}
                    >
                        <Link  to={`/Exercises/?client=${client.userId}`} >
                            <IoMdAddCircle className={classes.icon}/>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
            : (
                <div className={classes.rootClientDetails}>
                    <div className={classes.header}>
                        <div className={classes.headerContainer}>
                            <div className={classes.userImage}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTte_W3r44Rc7MYnXPQZLP-z3pfAJCKJuz1GA&usqp=CAU"
                                    alt={client.userName}
                                />
                            </div>

                            <div className={classes.userName}>
                                <p>{client.userName}</p>
                            </div>
                        </div>

                        <div className={classes.headerButtons}>
                            <div
                                className={classes.buttons}
                                onClick={onBackToList}
                            >
                                <div className={classes.button}>Back</div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.dashboard}>
                        <div className={classes.clientInfo}>
                            <div className={classes.data}>
                                <HealthDataComponent clientId={client.userId} />
                            </div>
                        </div>
                        <div className={classes.bottomContainer}>

                            <div className={classes.graph}>
                                <div className={classes.top}>
                                       <p onClick={()=>setShowFormCheck("Measurement")} >Body Measurements</p>
                                       <p onClick={()=>setShowFormCheck('Form Check')} >Form Check</p>
                                 </div>  
                                
                                <div className={classes.chart}>
                                   <Chart clientWeeklyExercises={weeklyExercises} />
                                </div>

                            </div>

                            <div className={classes.buttons}>
   
                                    
                                
                                    <div
                                        className={classes.assign}
                                        onClick={toggleNutritionOverlay}
                                    >
                                        <p>Assign Nutrition</p>
                                    </div>
                                    <div
                                        className={classes.assign}
                                        // onClick={assignExerciseHandler}
                                        onClick={()=>setDisplayExercises(true)}
                                    >
                                        <p>Assign Exercises</p>
                                    </div>

                            </div>
                        </div>
                    </div>

                    {/* ///////////////////////////////////////////////////////////////? */}
                    {/* Nutrition Input Overlay */}
                    {showNutrition && (
                        <div className={classes.overlay}>
                            <div className={classes.overlayContent}>
                                <div className={classes.inputBox}>
                                    <label>Calories</label>
                                    <input
                                        type="text"
                                        value={nutritionData.calories}
                                        onChange={(e) =>
                                            setNutritionData({
                                                ...nutritionData,
                                                calories: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className={classes.inputBox}>
                                    <label>Fats</label>
                                    <input
                                        type="text"
                                        value={nutritionData.fats}
                                        onChange={(e) =>
                                            setNutritionData({
                                                ...nutritionData,
                                                fats: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className={classes.inputBox}>
                                    <label>Proteins</label>
                                    <input
                                        type="text"
                                        value={nutritionData.proteins}
                                        onChange={(e) =>
                                            setNutritionData({
                                                ...nutritionData,
                                                proteins: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className={classes.inputBox}>
                                    <label>Carbohydrates</label>
                                    <input
                                        type="text"
                                        value={nutritionData.carbohydrates}
                                        onChange={(e) =>
                                            setNutritionData({
                                                ...nutritionData,
                                                carbohydrates: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <button onClick={assignNutritionData}>
                                    Done
                                </button>
                            </div>
                        </div>
                    )}


                    <div className={classes.info}>
                        {showAssignExercise ? (
                            <div
                                className={classes.assignedExercises}
                                ref={assignedExercisesRef}
                            >
                                <div className={classes.container}>
                                    <div className={classes.heading}>
                                        <p>Assigned Exercises</p>
                                    </div>

                                    <div className={classes.cards}>
                                        {assignedExercises.map((exercise) => (
                                            <div
                                                className={classes.exercise}
                                                key={exercise?.id}
                                            >
                                                <div
                                                    className={
                                                        classes.exerciseName
                                                    }
                                                    >
                                                    <p>{exercise?.title}</p>
                                                </div>

                                                <div className={classes.delete}>
                                                    <RiDeleteBin6Line
                                                        size={40}
                                                        className={classes.icon}
                                                        onClick={() =>
                                                            handleUnassignExercise(
                                                                exercise?.id
                                                                )
                                                            }
                                                            />

                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={classes.footer}>
                                        <div
                                            className={classes.buttons}
                                            onClick={allExercisesHandler}
                                            >
                                                    <Link  to={`/assign-exercises/${client.userId}`} >

                                            <IoMdAddCircle
                                                className={classes.icon}
                                            />
                                                    </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        {/*Conditionally Display all exercises using ExerciseFetcher*/}
                        {showAllExercises ? (
                            <div className={classes.rootExercises}>
                                <div className={classes.header}>
                                    <div className={classes.title}>
                                        <p>All Exercises</p>
                                    </div>
                                </div>

                                <div className={classes.container}>
                                    {/* Render the ExerciseFetcher component to fetch data */}
                                    <ExerciseFetcher
                                        onExercisesFetched={
                                            handleExercisesFetched
                                        }
                                    />

                                    {/* Render the exercises */}
                                    <div className={classes.gridContainer}>
                                        {exercises.map((exercise) => (
                                            <div
                                                key={exercise.id}
                                                className={classes.card}
                                            >
                                                {/* Exercise card content */}
                                                <div
                                                    className={
                                                        classes.imageContainer
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            exercise.thumbnailURL
                                                        }
                                                        alt={exercise.title}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        classes.textContainer
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes.titleBar
                                                        }
                                                    >
                                                        <h3>
                                                            {exercise.title}
                                                        </h3>
                                                    </div>
                                                    <p>
                                                        {exercise.description}
                                                    </p>
                                                </div>
                                                <div className={classes.footer}>
                                                    {exercise.assignedTo?.includes(
                                                        client.userID
                                                    ) ? (
                                                        <IoMdRemoveCircle
                                                            className={
                                                                classes.icon
                                                            }
                                                            onClick={() => {
                                                                handleUnassignExercise(
                                                                    exercise.id
                                                                );
                                                            }}
                                                        />
                                                    ) : (
                                                        <IoMdAddCircle
                                                            className={
                                                                classes.icon
                                                            }
                                                            onClick={() => {
                                                                handleAssignExercise(
                                                                    exercise.id
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ClientDetails;
