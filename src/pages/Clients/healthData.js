import React, { useEffect, useState } from "react";
import { db, database } from "../../firebase"; // Import your Firebase Firestore configuration
import {
  collection,
  doc,
  getDocs,
  query,
  limit,
  where,
} from "firebase/firestore";
import PropTypes from "prop-types";
import classes from "./HealthData.module.scss";
import { get, ref } from "firebase/database";
import {
  Center,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";

const HealthDataComponent = ({ clientId }) => {
  const [latestHeartRate, setLatestHeartRate] = useState(null);
  const [latestUserWeight, setLatestUserWeight] = useState(null);
  const [latestSuprior, setLatestSuprior] = useState(null);

  useEffect(() => {
    async function fetchLatestData() {
      try {
        //    const getHeartRate = await getDocs(query(collection(db,"Users",userDocId,"HeartRateTracker"),limit(1)))
        //    !getHeartRate.empty&&setLatestHeartRate(getHeartRate.docs[0].data().avgHeartRate)
        //    const getSuprior = await getDocs(query(collection(db,"Users",userDocId,"VO2Tracker"),limit(1)))
        //    !getSuprior.empty&&setLatestSuprior(getSuprior.docs[0].data().suprior)

        const heartbeatRef = ref(database, "HeartBeat Tracker/" + clientId);
        const VO2Ref = ref(database, "VO2 Tracker/" + clientId);
        const snapshot = await get(heartbeatRef);
        const snapshot1 = await get(VO2Ref);

        const Heartdata = snapshot.val();
        const VO2data = snapshot1.val();
        // Extract the keys of the nested objects
        const HeartnestedObjectKeys = Object.keys(Heartdata);
        const VO2nestedObjectKeys = Object.keys(VO2data);
        // Get the first object key
        const firstObjectKey = HeartnestedObjectKeys[0];
        const firstObjectKeyVO2 = VO2nestedObjectKeys[0];
        // Access the data inside the first nested object
        if (firstObjectKey) {
          const firstObjectData = Heartdata[firstObjectKey];
          setLatestHeartRate(firstObjectData.heartbeat);
        } else {
          console.log("No data found.");
        }
        if (firstObjectKeyVO2) {
          const firstObjectData = VO2data[firstObjectKeyVO2];
          setLatestSuprior(firstObjectData.oxygenlevel);
        } else {
          console.log("No data found.");
        }

        const q = query(
          collection(db, "Users"),
          where("userId", "==", clientId)
        );
        const res = await getDocs(q);
        const userDocId = res.docs[0].ref.id;
        const getWeight = await getDocs(
          query(collection(db, "Users", userDocId, "WeightTracker"))
        );
        const value = getWeight.docs[0].data().userWeight.slice(0, -3);
        !getWeight.empty && setLatestUserWeight(value);
      } catch (e) {
        console.log(e);
      }
    }

    fetchLatestData();
  }, [clientId]);

  // const sortData = (data) => {
  //     return data.sort(
  //         (a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmit))

  return (
    <div className={classes.rootHealthData}>
      <div className={classes.heading}>
        <p>Activity Reports</p>
      </div>

      <div className={classes.graphs}>
        <div className={classes.heartBeat}>
          <div className={classes.head}>
            <p>Heartbeat</p>
          </div>
          <Center
            className={classes.pieChart}
            bgGradient="linear(to-br, #7fa5ed, #2a49b6)"
          >
            <CircularProgress
              value={latestHeartRate ? latestHeartRate : null}
              color="#88A8ED"
              size={["5.5rem", "6rem", "13rem", "15rem"]}
              thickness="6px"
            >
              <CircularProgressLabel>
                <Text className={classes.data1}>
                  {latestHeartRate ? latestHeartRate : "N/A"}
                </Text>
                <Text className={classes.tag1}>bpm</Text>
              </CircularProgressLabel>
            </CircularProgress>
          </Center>
        </div>

        <div className={classes.weight}>
          <div className={classes.head}>
            <p>Weight</p>
          </div>
          <Center className={classes.pieChart}>
            <CircularProgress
              value={latestUserWeight ? latestUserWeight : null}
              color="#88A8ED"
              size={["5.5rem", "6rem", "13rem", "15rem"]}
              thickness="6px"
            >
              <CircularProgressLabel>
                <Text className={classes.data} color="white">
                  {latestUserWeight
                    ? parseFloat(latestUserWeight).toFixed(0)
                    : "N/A"}
                </Text>
                <Text className={classes.tag} fontSize="25px" color="white">
                  kg
                </Text>
              </CircularProgressLabel>
            </CircularProgress>
          </Center>
        </div>

        <div className={classes.weight}>
          <div className={classes.head}>
            <p>VO2</p>
          </div>
          <Center className={classes.pieChart}>
            <CircularProgress
              value={latestSuprior ? latestSuprior : null}
              color="#88A8ED"
              size={["5.5rem", "6rem", "13rem", "15rem"]}
              thickness="6px"
            >
              <CircularProgressLabel>
                <Text className={classes.data} color="white">
                  {latestSuprior ? latestSuprior : "N/A"}
                </Text>
                <Text className={classes.tag} fontSize="25px" color="white">
                  Superior
                </Text>
              </CircularProgressLabel>
            </CircularProgress>
          </Center>
        </div>
      </div>
    </div>
  );
};

HealthDataComponent.propTypes = {
  docId: PropTypes.string.isRequired,
};

export default HealthDataComponent;
