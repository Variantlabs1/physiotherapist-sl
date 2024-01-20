import React, { useState } from "react";
import ClientFetcher from "../../components/data_fetch/clientFetcher";
import Chats from "./chats";
import { useAuth } from "../../components/data_fetch/authProvider";
import styles from "./MainChats.module.scss";

const MainChats = () => {
    const user = useAuth();
    const [selectedClient, setSelectedClient] = useState(null);
    const [clients, setClients] = useState([]); // State to hold the list of clients
    const [showChat, setShowChat] = useState(false);

    // console.log(user.uID);

    const handleClientSelected = (client) => {
        setSelectedClient(client);
        setShowChat(true);
    };

    // Function to set the list of clients when fetched by ClientFetcher
    const handleClientsFetched = (fetchedClients) => {
        setClients(fetchedClients);
    };

    const handleBackToClientList = () => {
        setSelectedClient(null); // Clear the selectedClient to go back to the client list
        setShowChat(false);
    };

    return (
        <div className={styles.rootChats}>
            <div className={styles.container}>
                {showChat ? (
                    <Chats
                        user={user}
                        client={selectedClient}
                        onBack={handleBackToClientList}
                    />
                ) : (
                    <>
                        <ClientFetcher
                            onClientsFetched={handleClientsFetched}
                        />
                        <div className={styles.header}>
                            <div className={styles.title}>
                                <p>Clients List</p>
                            </div>
                        </div>

                        <div className={styles.cardsContainer}>
                            {clients.map((client, index) => (
                                <div key={index} className={styles.card}>
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
                                            onClick={() =>
                                                handleClientSelected(client)
                                            }
                                        >
                                            <p>Chat</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MainChats;
