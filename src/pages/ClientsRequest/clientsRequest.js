import React, { useContext, useEffect, useState } from "react";
import styles from "./ClientsRequest.module.scss";
import ClientRequestFetcher from "../../components/data_fetch/clientRequestFetcher"; // Adjust the path
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    arrayUnion,
    serverTimestamp,
    getDoc,
    Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from "../../components/data_fetch/authProvider";
import styled from "styled-components";

const ClientsRequest = () => {
    const {user} = useContext(AuthContext)
    const [clients, setClients] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleClientsFetched = (fetchedClients) => {
        setClients(fetchedClients);
    };


    const findDocumentId = async (userID) => {
        // console.log(userID);
        try {
            const usersRef = collection(db, "Users");
            const q = query(usersRef, where("userId", "==", userID));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDocRef = querySnapshot.docs[0].ref;
                return userDocRef.id; // Get the document ID
            } else {
                console.log("Client document not found for userID", userID);
                return null;
            }
        } catch (error) {
            console.error("Error finding document ID:", error);
            return null;
        }
    };

    const handleAcceptClient = async (userID) => {
        const documentId = await findDocumentId(userID);
        if (documentId) {
            try {
                const q= query(collection(db,"physiotherapist"),
                where('physiotherapistId',"==",user.uid)
                )
                const getPhysio = await getDocs(q)

                const physioRef = getPhysio.docs[0].ref

                await updateDoc(physioRef,{
                    clientsList:arrayUnion({
                        clientAcceptedOn:Timestamp.now(),
                        clientId:userID
                    })
                })
                const userDocRef = doc(db, "Users", documentId);
                await updateDoc(userDocRef, { verified: true });
              //  update the clients list field in  the physiotherapist document
                console.log("Client accepted successfully!");
                setRefreshKey((prevKey) => prevKey + 1);
            } catch (error) {
                console.error("Error accepting client:", error);
            }
        }
        else{
            console.log(documentId)
        }
    };

    const handleDeclineClient = async (userID) => {
        const documentId = await findDocumentId(userID);
        if (documentId) {
            try {
                const userDocRef = doc(db, "Users", documentId);
                await updateDoc(userDocRef, { referralCode: "" });
                console.log("Client declined successfully!");
                setRefreshKey((prevKey) => prevKey + 1);
            } catch (error) {
                console.error("Error declining client:", error);
            }
        }
    };

    return (
        <div className={styles.rootExercises}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <p>Requests</p>
                </div>
            </div>

            <div className={styles.container}>
                {/* Render the ClientFetcher component to fetch data */}
                <ClientRequestFetcher
                    key={refreshKey}
                    onClientsFetched={handleClientsFetched}
                />

                {/* Render the clients */}
                <div className={styles.listContainer}>
                    {clients.length>0?clients.map((client) => (
                        <div className={styles.card} key={client.userID}>
                            <div className={styles.imageContainer}>
                                <img
                                    className={styles.profilePicture}
                                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=8"
                                    alt={client.userName}
                                />
                            </div>

                            <div className={styles.textContainer}>
                                <div className={styles.info}>
                                    <div className={styles.username}>
                                        <p>{client.userName}</p>
                                    </div>

                                    <div className={styles.userEmail}>
                                        <p>{client.userEmail}</p>
                                    </div>

                                    <div className={styles.userAccDate}>
                                        <p>{client.accCreated}</p>
                                    </div>
                                </div>

                                <div className={styles.buttons}>
                                    <div
                                        className={styles.accept}
                                        onClick={() =>
                                            handleAcceptClient(client.userId)
                                        }
                                    >
                                        <p>Accept</p>
                                    </div>
                                    <div
                                        className={styles.decline}
                                        onClick={() =>
                                            handleDeclineClient(client.userId)
                                        }
                                    >
                                        <p>Decline</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )):
                    <Title>No Requests! </Title>
                    }
                </div>
            </div>
        </div>
    );
};

export default ClientsRequest;

const Title = styled.h1`
    font-size: 50px;
    font-weight: 500;
    text-align: center;
    width: 100%;
    margin-top: 150px;
`
