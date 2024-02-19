import { useEffect, useState } from "react";
import classes from "./FormCheck.module.scss";
import "react-day-picker/dist/style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {  doc, collection, getDocs} from "firebase/firestore";
import { db } from "../../firebase";

import { Box, Center, Flex, Text } from "@chakra-ui/react";
import { FaRegCirclePlay } from "react-icons/fa6";


const FormCheck = ({clientId, onBackClick }) => {
    const [resultData, setResultsData] = useState([]);

        useEffect( () => {
            const getFormCheckData = async () => {
                // const q = query(collection(db,"Form Check Tool"),where('userId',"==",clientId))
              try{
                const userDocRef = doc(db, 'Form Check Tool', clientId);

                // Reference to the 'results' subcollection for the specified user
                const resultsCollectionRef = collection(userDocRef, 'results');

                // Get all documents in the 'results' subcollection for the specified user
                const resultsQuerySnapshot = await getDocs(resultsCollectionRef)

                const resultsDataArray = resultsQuerySnapshot.docs.map((resultDoc) => resultDoc.data());
                console.log(resultsDataArray);
                setResultsData(resultsDataArray);
            } catch (error) {
                console.error('Error getting documents:', error);
              }
            }
        
            // Cleanup function to unsubscribe when the component is unmounted or clientId changes
            getFormCheckData();
          }, [clientId]);


    return (
        <div className={classes.exerciseDetailsContainer}>

            <div className={classes.header}>
                <div className={classes.exerciseTitle}>
                    <p>Form Check</p>
                </div>

                <div className={classes.buttons} onClick={onBackClick}>
                    <div className={classes.button}>
                        <p>Back</p>
                    </div>
                </div>
            </div>

            <div className={classes.container}>
                {resultData.map((data, index) => (
                    <Box className={classes.card}>
                        <Flex className={classes.tag} justify='space-between'>
                            <div className={classes.musclesList}>
                                <h3 className={classes.exerciseName}>{data.exercise}</h3>
                            </div>
                            <Flex gap="10px">
                                <Center fontSize="1.2rem" color= '#0d1dac' fontWeight='500'>Play</Center>
                                <Center><a href={data.URL} target="_blank" rel="noreferrer"><FaRegCirclePlay size={20} color="#0d1dac"/></a></Center>
                            </Flex>
                        </Flex>
                        <Box fontSize='.8rem' fontWeight='500'>{data.date}</Box>
                        <div>
                            <Text className={classes.musclesInvolved}>{data["Muscles Involved"]}</Text>
                        </div>
                    </Box>
                ))}
            </div>
        </div>
    );
};

export default FormCheck;
