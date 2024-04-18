import React, { useEffect, useState } from "react";
import body from "../assets/body.jpg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./BodyMeasurement.module.scss";
import {
  Box,
  Button,
  Heading,
  Center,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import useDate from "../../components/useDate";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const BodyMeasurement = ({ client, onBackClick }) => {
  const date = useDate();
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    const getMeasurements = async () => {
      const res = await getDoc(doc(db, "Body Measurements", client.userId));
      if (res.exists()) {
        // setMeasurements(Object.entries(res.data()))
        setMeasurements(res.data());
      }
    };
    getMeasurements();
  }, [client.userId]);
  return (
    <div className={styles.rootClients}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p>Body Measurement</p>
        </div>
        <Center fontWeight="500">{date}</Center>
      </div>

      <div className={styles.outerContainer}>
        <div className={styles.heading}>
          <div className={styles.headerContainer}>
            <div className={styles.userImage}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTte_W3r44Rc7MYnXPQZLP-z3pfAJCKJuz1GA&usqp=CAU"
                alt={client.userName}
              />
            </div>

            <div className={styles.userName}>
              <p>{client.userName}</p>
            </div>
          </div>

          <div className={styles.headerButtons}>
            <div className={styles.button} onClick={onBackClick}>
              Back
            </div>
            <div className={styles.buttonChat}>
              <Link to={`/Chat/${client.userId}`}>Chat</Link>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.card}>
            <div>
              <p>Arms:</p>
              <span>
                {measurements.average_arms
                  ? measurements.average_arms
                  : "No data!"}
              </span>
            </div>
          </div>
          <div className={styles.card}>
            <div>
              <p>Height:</p>
              <span>
                {measurements.average_height
                  ? measurements.average_height
                  : "No data!"}
              </span>
            </div>
          </div>
          <div className={styles.card}>
            <div>
              <p>Legs:</p>
              <span>
                {measurements.average_left_leg
                  ? measurements.average_left_leg
                  : "No data!"}
              </span>
            </div>
          </div>
          <div className={styles.card}>
            <div>
              <p>Shoulder:</p>
              <span>
                {measurements.average_shoulder
                  ? measurements.average_shoulder
                  : "No data!"}
              </span>
            </div>
          </div>
          <div className={styles.card}>
            <div>
              <p>Waist:</p>
              <span>
                {measurements.average_waist
                  ? measurements.average_waist
                  : "No data!"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyMeasurement;
