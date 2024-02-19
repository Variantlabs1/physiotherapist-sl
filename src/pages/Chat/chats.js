

//Different method --------------------------------------------------------------------------------
import React, { useState, useEffect, useRef } from "react";
import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    
} from "firebase/firestore";
import { db } from "../../firebase";
import classes from "./Chats.module.scss";
import { format } from "timeago.js";
import { Link } from "react-router-dom";


const Chats = ({ user, client, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatId = client.userId+user.user.uid;
    const messagesEndRef = useRef(null);
    //  console.log(user.user.uid)

    useEffect(()=>{
        let unSub;

        const getMessages=async()=>{
            try{
            const q = query(collection(db,"messages",user.user.uid,client.userId),orderBy("timestamp","asc"))

            unSub = onSnapshot(q, (snapshot) => {
                const messagesData = snapshot.docs.map(doc=>doc.data())
                setMessages(messagesData);
            });
        }catch(e){
            console.log(e)
        }

        }
              getMessages(); // Start listening to messages
      return () => {
                if (unSub) {
                    unSub(); // Unsubscribe from the real-time listener when the component unmounts
                }
            };

    },[])


    useEffect(() => {
        scrollToBottom(); // Scroll to the latest message on initial render
    }, [messages]);

    const sendMessage = async () => {

    const messageData = {
        fromId: user.user.uid,
        toId: client.userId,
        text: newMessage,
        timestamp: serverTimestamp(),
    };

    await addDoc(
        collection(db, "messages", user.user.uid, client.userId),
        messageData
    );

             
      setNewMessage("")
    //    const res= await getDocs(collection(db,"messages","SbqsWHtft11OOndsDQpK","chatMessages"))
    //    const message = res.docs.map(d=>d.data())
    //    console.log(message)
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={classes.rootChats}>
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
                        onClick={onBack}
                    >
                        <div className={classes.button}>Back</div>
                    </div>
                </div>
            </div>
            <div className={classes.chatMessages}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${classes.message} ${
                            message.fromId === user.user.uid
                                ? classes.sent
                                : classes.received
                        }`}
                    >
                        <div className={classes.msg}>
                            <p>{message.text}</p>
                            <span>{format(message.timestamp?.toDate())}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />{" "}
                {/* Empty div for scrolling to bottom */}
            </div>
            <div className={classes.chatInput}>
                <div className={classes.inputContainer}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        placeholder="Type your message here.."
                    />
                    <button
                        disabled={!newMessage}
                        onClick={sendMessage}
                        className={classes.sendButton}
                    >
                        <p>Send</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chats;


