import React from "react";
import { db, database } from "../../firebase"; // Import your Firebase Firestore configuration
import { collection, getDocs, query, where } from "firebase/firestore";
import PropTypes from "prop-types";
import classes from "./HealthData.module.scss";
import { get, ref } from "firebase/database";
import {
  Center,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const HealthDataComponent = ({ clientId, toggleGraph }) => {
  //fetch the heartbeat value from the realtime database
  const getHeartBeat = async () => {
    const heartbeatRef = ref(database, "HeartBeat Tracker/" + clientId);
    const snapshot = await get(heartbeatRef);
    const Heartdata = snapshot.val();
    // Extract the keys of the nested objects
    const HeartnestedObjectKeys = Object.keys(Heartdata);
    // Get the first object key
    const ObjectKey = HeartnestedObjectKeys[0];
    // Access the data inside the first nested object
    if (ObjectKey) {
      const firstObjectData = Heartdata[ObjectKey];
      return firstObjectData.heartbeat;
    }
  };
  //fetch the VO2 value from the realtime database
  const getVO2 = async () => {
    const VO2Ref = ref(database, "VO2 Tracker/" + clientId);
    const snapshot1 = await get(VO2Ref);
    const VO2data = snapshot1.val();
    // Extract the keys of the nested objects
    const VO2nestedObjectKeys = Object.keys(VO2data);
    // Get the first object key
    const firstObjectKeyVO2 = VO2nestedObjectKeys[0];
    // Access the data inside the first nested object
    if (firstObjectKeyVO2) {
      const firstObjectData = VO2data[firstObjectKeyVO2];
      return firstObjectData.oxygenlevel;
    }
  };

  //fetch the weight value
  const getWeight = async () => {
    const q = query(collection(db, "Users"), where("userId", "==", clientId));
    const res = await getDocs(q);
    const userDocId = res.docs[0].ref.id;
    const getWeight = await getDocs(
      query(collection(db, "Users", userDocId, "WeightTracker"))
    );
    const value = getWeight.docs[0].data().userWeight.slice(0, -3);
    if (!getWeight.empty) return value;
  };

  const { data: latestHeartRate } = useQuery({
    queryKey: ["heart"],
    queryFn: getHeartBeat,
  });

  const { data: latestUserWeight } = useQuery({
    queryKey: ["weight"],
    queryFn: getWeight,
  });

  const { data: latestSuprior } = useQuery({
    queryKey: ["VO2"],
    queryFn: getVO2,
  });
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
            _hover={{ cursor: "pointer" }}
            bgGradient="linear(to-br, #7fa5ed, #2a49b6)"
          >
            <CircularProgress
              value={latestHeartRate ? latestHeartRate : null}
              color="#88A8ED"
              className={classes.progress}
              thickness="6px"
            >
              <CircularProgressLabel onClick={toggleGraph}>
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
              className={classes.progress}
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
              className={classes.progress}
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
