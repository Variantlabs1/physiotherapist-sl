import React, { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

import "./components/Chats.scss";

function ChatComponent({ user, client }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    console.log("Physio Id is ", user.uid);
    console.log("Client Id is ", client.userID);

    useEffect(() => {
        console.log("Inside Chats");
        const conversationId = generateConversationId(user.uid, client.userID);
        const q = query(
            collection(db, "conversations", conversationId, "messages"),
            orderBy("timestamp")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const updatedMessages = snapshot.docs.map((doc) => doc.data());
            setMessages(updatedMessages);
        });

        return () => {
            unsubscribe();
        };
    }, [user.uid, client.userID]);

    const generateConversationId = (userId1, userId2) => {
        return userId1 < userId2
            ? `${userId1}_${userId2}`
            : `${userId2}_${userId1}`;
    };

    const sendMessage = async () => {
        if (newMessage.trim() !== "") {
            const conversationId = generateConversationId(
                user.uid,
                client.userID
            );
            await addDoc(
                collection(db, "conversations", conversationId, "messages"),
                {
                    text: newMessage,
                    sender: user.uid,
                    timestamp: new Date(),
                }
            );
            setNewMessage("");
        }
    };

    console.log(user.bio);

    return (
        <div>
            <h2>Chat with {client.userName}</h2>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${
                            message.sender === user.uid ? "sent" : "received"
                        }`}
                    >
                        {/* Display user's image for sent messages */}

                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default ChatComponent;
