//Different method --------------------------------------------------------------------------------
import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { LuImagePlus } from "react-icons/lu";
import { db, storage } from "../../firebase";
import classes from "./Chats.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { isSameDay } from "date-fns";
import { Center, Text } from "@chakra-ui/react";
import useDate from "../../components/useDate";
import { IoIosSend } from "react-icons/io";
import { useAuth } from "../../components/data_fetch/authProvider";
import { MdClose } from "react-icons/md";
import ImageComponent from "./components/ImageConponent";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Chats = () => {
  const date = useDate();
  const user = useAuth();
  const params = useParams();
  const userId = params.id;
  const Navigate = useNavigate();
  // const [messages, setMessages] = useState([]);
  // const [client, setClient] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  // const chatId = client.userId + user?.uid;
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  const getClient = async () => {
    try {
      const q = query(collection(db, "Users"), where("userId", "==", userId));
      const ref = await getDocs(q);
      const docref = ref.docs[0];
      console.log("calleddd");
      return docref.data();
    } catch (e) {
      console.error("Error fetching document:", e);
    }
  };

  const { data: client } = useQuery({
    queryKey: ["client", userId],
    queryFn: getClient,
  });

  const getMessages = async () => {
    try {
      const q = query(
        collection(db, "messages", user.user.uid, userId),
        orderBy("timestamp", "asc")
      );
      console.log("called");
      return new Promise((resolve, reject) => {
        onSnapshot(
          q,
          (snapshot) => {
            const message = snapshot.docs.map((doc) => doc.data());
            resolve(message);
          },
          reject
        );
      });
    } catch (e) {
      console.log(e);
    }
  };

  const { data: messages } = useQuery({
    queryKey: ["message", userId],
    queryFn: getMessages,
    // staleTime: Infinity, // 5 minutes
  });

  const sendMessage = async () => {
    if (!newMessage && !file) {
      return;
    }
    if (file) {
      const filename = "/messageFiles/" + user.user.uid + "@" + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = await uploadBytes(storageRef, file);
      getDownloadURL(uploadTask.ref)
        .then(async (downloadURL) => {
          if (file && newMessage) {
            await addDoc(collection(db, "messages", user.user.uid, userId), {
              fromId: user.user.uid,
              toId: userId,
              text: filename,
              isImage: true,
              timestamp: serverTimestamp(),
            });
            await addDoc(collection(db, "messages", user.user.uid, userId), {
              fromId: user.user.uid,
              toId: userId,
              text: newMessage,
              isImage: false,
              timestamp: serverTimestamp(),
            });
          } else {
            await addDoc(collection(db, "messages", user.user.uid, userId), {
              fromId: user.user.uid,
              toId: userId,
              text: filename,
              isImage: true,
              timestamp: serverTimestamp(),
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      await addDoc(collection(db, "messages", user.user.uid, userId), {
        fromId: user.user.uid,
        toId: userId,
        text: newMessage,
        isImage: false,
        timestamp: serverTimestamp(),
      });
    }
    queryClient.invalidateQueries({ queryKey: ["message"] });
    setNewMessage("");
    setFile(null);
  };

  useEffect(() => {
    // Scroll to the bottom when the component mounts
    messagesEndRef.current.scrollTo(0, messagesEndRef.current.scrollHeight);
  }, [messages]);

  let currentDate = null;
  const formatDate = (date) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    if (isSameDay(date, today)) {
      return "Today";
    } else if (isSameDay(date, yesterday)) {
      return "Yesterday";
    } else if (date >= oneWeekAgo) {
      // If the date is within one week, return the day name
      const dayOptions = { weekday: "long" };
      return date.toLocaleString("en-IN", dayOptions);
    } else if (date >= oneYearAgo) {
      const options = {
        month: "long",
        day: "2-digit",
      };

      return date.toLocaleString("en-IN", options);
    } else {
      // Otherwise, return the formatted date
      const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };

      const formattedDate = date.toLocaleString("en-IN", options);
      const [month, day, year] = formattedDate.split("-");
      return `${day} ${month}, ${year}`;
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className={classes.rootChats}>
      <div className={classes.heading}>
        <div className={classes.title}>
          <p>Chatbox</p>
        </div>
        <Center fontWeight="500" className={classes.date}>
          {date}
        </Center>
      </div>
      <div className={classes.outerContainer}>
        <div className={classes.header}>
          <div className={classes.headerContainer}>
            <div className={classes.userImage}>
              {client && client.userProfilePhoto ? (
                <ImageComponent imagePath={client.userProfilePhoto} />
              ) : (
                <img
                  src={require("../../assets/vectorProfile.png")}
                  alt={client && client.userName}
                />
              )}
            </div>

            <div className={classes.userName}>
              <p>{client && client.userName}</p>
            </div>
          </div>

          <div className={classes.headerButtons}>
            <div className={classes.buttons} onClick={() => Navigate(-1)}>
              <div className={classes.button}>Back</div>
            </div>
          </div>
        </div>
        {!file ? (
          <div className={classes.chatMessages} ref={messagesEndRef}>
            {messages?.map((message, index) => {
              const messageDate = message.timestamp
                ? message.timestamp.toDate()
                : null;

              // Check if the current message has a different date than the previous one
              const showDateHeader =
                messageDate && !isSameDay(messageDate, currentDate);

              // Update currentDate to the current message date
              currentDate = messageDate;
              return (
                <div key={index}>
                  {showDateHeader && (
                    <Text className={classes.dateHeader} textAlign="center">
                      {formatDate(messageDate)}
                    </Text>
                  )}

                  <div
                    className={`${classes.message} ${
                      message.fromId === user.user.uid
                        ? classes.sent
                        : classes.received
                    }`}
                  >
                    {message.fromId !== user.user.uid && (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTte_W3r44Rc7MYnXPQZLP-z3pfAJCKJuz1GA&usqp=CAU"
                        alt={client && client.userName}
                        className={classes.img}
                      />
                    )}
                    {message.isImage ? (
                      <div className={classes.msg}>
                        <ImageComponent imagePath={message.text} />
                        <span>
                          {messageDate &&
                            messageDate.toLocaleTimeString([], {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                        </span>
                      </div>
                    ) : (
                      <div className={classes.msg}>
                        <p>{message.text}</p>
                        <span>
                          {messageDate &&
                            messageDate.toLocaleTimeString([], {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={classes.imageContainer}>
            <div>
              <Center className={classes.icon}>
                <MdClose size={30} onClick={() => setFile(null)} />
              </Center>
            </div>
            <Center className={classes.img}>
              <img src={URL.createObjectURL(file)} alt="" />
            </Center>
          </div>
        )}
        <div className={classes.chatInput}>
          <div className={classes.inputContainer}>
            <Center>
              <LuImagePlus
                className={classes.icon}
                onClick={handleButtonClick}
              />
            </Center>
            <input
              type="file"
              accept="image/jpeg, image/png"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
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
            <Center disabled={!newMessage} onClick={sendMessage}>
              <IoIosSend className={classes.icon} color="#0177fd" />
            </Center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
