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
    try {
      const heartbeatRef = ref(database, "HeartBeat Tracker/" + clientId);
      const snapshot = await get(heartbeatRef);
      const Heartdata = snapshot.val();
      
      if (!Heartdata) return null;
      
      // Extract the keys of the nested objects
      const HeartnestedObjectKeys = Object.keys(Heartdata);
      // Get the first object key
      const ObjectKey = HeartnestedObjectKeys[0];
      // Access the data inside the first nested object
      if (ObjectKey) {
        const firstObjectData = Heartdata[ObjectKey];
        return firstObjectData.heartbeat;
      }
      return null;
    } catch (error) {
      console.error("Error fetching heartbeat:", error);
      return null;
    }
  };

  //fetch the VO2 value from the realtime database
  const getVO2 = async () => {
    try {
      const VO2Ref = ref(database, "VO2 Tracker/" + clientId);
      const snapshot1 = await get(VO2Ref);
      const VO2data = snapshot1.val();
      
      if (!VO2data) return null;
      
      // Extract the keys of the nested objects
      const VO2nestedObjectKeys = Object.keys(VO2data);
      // Get the first object key
      const firstObjectKeyVO2 = VO2nestedObjectKeys[0];
      // Access the data inside the first nested object
      if (firstObjectKeyVO2) {
        const firstObjectData = VO2data[firstObjectKeyVO2];
        return firstObjectData.oxygenlevel;
      }
      return null;
    } catch (error) {
      console.error("Error fetching VO2:", error);
      return null;
    }
  };

  //fetch the weight value - FIXED VERSION
  const getWeight = async () => {
    try {
      const q = query(collection(db, "Users"), where("userId", "==", clientId));
      const res = await getDocs(q);
      
      if (res.empty) {
        console.log("No user found with clientId:", clientId);
        return null;
      }
      
      // Get the user document data directly
      const userDoc = res.docs[0];
      const userData = userDoc.data();
      
      // Extract weight directly from the user document
      const userWeight = userData.userWeight;
      
      if (userWeight) {
        // Remove any non-numeric characters and convert to number
        const numericWeight = parseFloat(userWeight.toString().replace(/[^\d.]/g, ''));
        return numericWeight;
      }
      
      return null;
    } catch (error) {
      console.error("Error fetching weight:", error);
      return null;
    }
  };

  const { data: latestHeartRate, isLoading: heartRateLoading } = useQuery({
    queryKey: ["heart", clientId],
    queryFn: getHeartBeat,
    enabled: !!clientId,
    staleTime: 30000, // 30 seconds
  });

  const { data: latestUserWeight, isLoading: weightLoading } = useQuery({
    queryKey: ["weight", clientId],
    queryFn: getWeight,
    enabled: !!clientId,
    staleTime: 30000, // 30 seconds
  });

  const { data: latestSuprior, isLoading: vo2Loading } = useQuery({
    queryKey: ["VO2", clientId],
    queryFn: getVO2,
    enabled: !!clientId,
    staleTime: 30000, // 30 seconds
  });

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
              value={latestHeartRate || 0}
              max={200} // Assuming max heart rate of 200 bpm
              color="#88A8ED"
              className={classes.progress}
              thickness="6px"
            >
              <CircularProgressLabel onClick={toggleGraph}>
                <Text className={classes.data1}>
                  {heartRateLoading ? "..." : (latestHeartRate || "N/A")}
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
              value={latestUserWeight || 0}
              max={200} // Assuming max weight of 200 kg
              color="#88A8ED"
              className={classes.progress}
              thickness="6px"
            >
              <CircularProgressLabel>
                <Text className={classes.data} color="white">
                  {weightLoading 
                    ? "..." 
                    : latestUserWeight 
                      ? parseFloat(latestUserWeight).toFixed(0)
                      : "N/A"
                  }
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
              value={latestSuprior || 0}
              max={100} // Assuming max VO2 of 100
              color="#88A8ED"
              className={classes.progress}
              thickness="6px"
            >
              <CircularProgressLabel>
                <Text className={classes.data} color="white">
                  {vo2Loading ? "..." : (latestSuprior || "N/A")}
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
  clientId: PropTypes.string.isRequired,
  toggleGraph: PropTypes.func,
};

export default HealthDataComponent;