import React, { useEffect, useState } from "react";
import styles from "./ClientsPage.module.scss";
import ClientFetcher from "../../components/data_fetch/clientFetcher"; // Adjust the path
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ClientsPage = ({clientDocId, onSelectClient }) => {
    const [clients, setClients] = useState([]);
 

    const handleClientsFetched = (fetchedClients) => {
        setClients(fetchedClients);
    };

    useEffect(()=>{
        if(clientDocId){
            const getClient = async()=>{
                const client = await getDoc(doc(db,"Users",clientDocId))
                client.exists() && onSelectClient(client.data())
            }
            getClient()
        }
    },[clientDocId])
    
    return (
        <div className={styles.rootClients}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <p>Clients List</p>
                </div>

                {/* <div className={styles.buttons}>Add New</div> */}
            </div>

            <div className={styles.container}>
                {/* Render the ClientFetcher component to fetch data */}
                <ClientFetcher onClientsFetched={handleClientsFetched} />

                {/* Render the clients */}
                <div className={styles.listContainer}>
                    {clients.map((client) => (
                        <div className={styles.card} key={client.userID}>
                            <div className={styles.imageContainer}>
                                <img
                                    className={styles.profilePicture}
                                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=8"
                                    alt={client.userName}
                                />
                            </div>

                            <div className={styles.textContainer}>
                                <div className={styles.username}>
                                    <p>{client.userName}</p>
                                </div>

                                <div
                                    className={styles.buttons}
                                    onClick={() => onSelectClient(client)}
                                >
                                    <p>View</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientsPage;
