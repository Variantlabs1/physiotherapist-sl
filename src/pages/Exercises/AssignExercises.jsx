import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Timestamp, addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

const defaultUrl =
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=8";

const AssignExercises = () => {
    const [exercises, setExercises] = useState([]);
    const location = useLocation();
    const clientId = location.pathname.split("/")[2];
    const [selected, setSelected] = useState([]);
    const [client, setClient] = useState({});

    // Simulating fetch for testing purpose
    useEffect(() => {
        const simulatedFetch = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            
            // Simulate either an empty array or an array with data
            const fetchedExercises = []; // Change to simulate exercises e.g., [{id:1, title:'Test', description:'Desc', thumbnailURL:''}]
            setExercises(fetchedExercises);
        };

        simulatedFetch();
    }, []);

    useEffect(() => {
        const getClient = async () => {
            const q = query(collection(db, "Users"), where("userId", "==", clientId));
            const res = await getDocs(q);
            if (!res.empty) {
                const data = { ...res.docs[0].data(), id: res.docs[0].ref.id };
                setClient(data);
            }
        };
        clientId && getClient();
    }, [clientId]);

    const handleClick = async () => {
        try {
            console.log("Storing in path: assignedExcercise/" + clientId + "/exercises");
            
            await addDoc(collection(db, "assignedExcercise", clientId, "exercises"), {
                exercisesId: selected,
                assignedOn: Timestamp.now(),
                assignedBy: "Suvo",
                userId: clientId,
            });
            
            setSelected([]);
            console.log("Exercises assigned successfully to assignedExercise collection!");
        } catch (e) {
            console.error("Error assigning exercises:", e);
        }
    };

    return (
        <Container className={'classes.container'}>
            <Top>
                <h1>Assign exercises to {client.userName ? client.userName : "Loading..."}</h1>
                <TBottom>
                    <img width={80} src={defaultUrl} alt="" />
                    <p>Suvo</p>
                </TBottom>
            </Top>

            {/* Display the exercises */}
            <Wrapper>
                {exercises.length > 0 ? (
                    exercises.map((item, i) => (
                        <Card selected={selected.includes(item.id)} key={i}>
                            <Image src={item.thumbnailURL || defaultUrl} />
                            <Right>
                                <span>
                                    <h3 style={{ color: "#8211df" }}>{item.title}</h3>
                                </span>
                                <p>{item.description}</p>
                            </Right>
                            <span>
                                <Checkbox
                                    value={item.id}
                                    onClick={() => {
                                        !selected.includes(item.id)
                                            ? setSelected((p) => [...p, item.id])
                                            : setSelected(selected.filter((e) => e !== item.id));
                                    }}
                                />
                            </span>
                        </Card>
                    ))
                ) : (
                    <p>No exercises available. Please check your data source.</p>
                )}
            </Wrapper>

            <Button disabled={selected.length === 0} onClick={handleClick}>
                Assign
            </Button>
        </Container>
    );
};

export default AssignExercises;

// Styled Components...

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px;
    gap: 20px;
    padding-top: 25px;
`;

const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    
`;

const TBottom = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    & > img {
        border-radius: 50%;
        width: 60px;
        height: 60px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
`;

const Card = styled.div`
    display: flex;
    gap: 15px;
    width: 28vw;
    align-items: center;
    background-color: #b3c4ea;
    border-radius: 8px;
    padding: 10px;
    border: ${(props) => props.selected && '2px solid #2e0580'};
    position: relative;
    & > span {
        position: absolute;
        right: 10px;
        top: 10px;
    }
`;

const Right = styled.div`
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    background-color: #7699e5;
    cursor: pointer;
    padding: 12px 28px;
    border: none;
    border-radius: 5px;
    color: whitesmoke;
    font-size: 18px;
    align-self: center;
    font-weight: 500;
    transition: all 0.5s ease;
    &:hover {
        background-color: #2e66de;
    }
`;

const Image = styled.img`
    width: 30%;
    height: 70px;
    object-fit: cover;
    border-radius: 5px;
`;