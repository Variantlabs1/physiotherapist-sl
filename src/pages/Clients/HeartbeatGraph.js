import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import classes from "./HeartbeatGraph.module.scss";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { set, get, ref, push } from "firebase/database";
import { database } from "../../firebase";
import ReactApexChart from "react-apexcharts";

const options = {
  chart: {
    type: "line",
    toolbar: {
      show: false, // Hide the toolbar buttons
    },
    height: "100%",
    width: "100%",
  },
  xaxis: {
    type: "datetime",
    labels: {
      formatter: function (value, timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours < 10 ? "0" + hours : hours;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        return formattedHours + ":" + formattedMinutes;
      },
      rotate: -45, // Rotate labels for better readability
      style: {
        fontSize: "12px", // Adjust font size
        fontFamily: "Arial, sans-serif", // Specify font family
      },
    },
    tickAmount: 10, // Set the number of labels to display
    axisBorder: {
      show: false, // Hide the x-axis line
    },
  },
  yaxis: {
    tickAmount: 3,
    labels: {
      offsetX: 10,
      style: {
        colors: ["darkviolet", "green", "red"], // Change the color of x-axis labels
        fontSize: "1rem", // Set the font size of y-axis labels
      },
      formatter: function (val, index) {
        if (index === 0) {
          return "Min";
        } else if (index === 1) {
          return "Ideal";
        } else if (index === 2) {
          return "Max";
        }
      },
    },
    plotLines: [
      {
        value: 40, // Position above "Ideal"
        color: "green",
        dashArray: 5,
        width: 2,
        label: {
          text: "Above Ideal",
        },
      },
      {
        value: 60, // Position below "Ideal"
        color: "green",
        dashArray: 5,
        width: 2,
        label: {
          text: "Below Ideal",
        },
      },
    ],
  },
  grid: {
    show: false,
  },
  markers: {
    size: 2,
    colors: ["#FFBAD0"],
    strokeColors: "#FFBAD0",
  },
  stroke: {
    curve: "smooth", // Set curve to 'smooth' for curved line
    width: 2, // Increase the width of the curve
    lineCap: "round", // Round line caps for smoother appearance
  },
  colors: ["#3a2be2", "rgba(138, 43, 226, 0.5)", "rgba(138, 43, 226, 0.5)"], // Set main curve color to violet
};
export default function HeartbeatGraph({ client, toggleGraph }) {
  //   const Navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [heartbeatData, setHeartbeatData] = useState();
  const [heartbeatValues, setHeartbeatValues] = useState();
  const [heartRateStats, setHeartRateStats] = useState({
    max: "",
    min: "",
    avg: "",
  });

  useEffect(() => {
    const fetchHeatbeatData = async () => {
      const exercisesRef = ref(database, "HeartBeat Tracker/" + client.userId);
      const snapshot = await get(exercisesRef);
      if (snapshot.exists()) {
        setHeartbeatData(Object.values(snapshot.val()));
      } else {
        console.log("No data available");
      }
    };
    fetchHeatbeatData();
  }, []);

  const parseDate = (dateString) => {
    const parts = dateString.split(/[\s,]+/); // Split by whitespace or comma
    const day = parseInt(parts[1]); // Extract day
    const monthName = parts[2]; // Extract month name
    const year = parseInt(parts[3]); // Extract year
    const timeParts = parts[4].split(":"); // Split time by colon
    let hours = parseInt(timeParts[0]); // Extract hours
    const minutes = parseInt(timeParts[1]); // Extract minutes
    const period = parts[5]; // Extract AM/PM

    // Adjust hours for PM
    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    // Construct and return Date object
    return new Date(year, getMonthIndex(monthName), day, hours, minutes);
  };

  // Function to get month index (0-based) from month name
  const getMonthIndex = (monthName) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.indexOf(monthName);
  };

  // Filter heartbeat values based on selected day
  useEffect(() => {
    if (heartbeatData) {
      const filteredHeartbeatValues = heartbeatData
        .filter((item) => item.date.split(/[\s,]+/)[0] === selectedDay)
        // .map((item) => parseInt(item.heartbeat));
        .map((item) => ({
          x: parseDate(item.date).getTime(),
          y: parseInt(item.heartbeat),
        }));
      setHeartbeatValues(filteredHeartbeatValues);
      // Calculate max, min, and average heart rate
      const heartRates = filteredHeartbeatValues.map((item) => item.y);
      let maxHeartRate = Math.max(...heartRates);
      let minHeartRate = Math.min(...heartRates);
      if (!isFinite(maxHeartRate)) maxHeartRate = 0;
      if (!isFinite(minHeartRate)) minHeartRate = 0;
      let avgHeartRate =
        heartRates.reduce((acc, curr) => acc + curr, 0) / heartRates.length;
      if (isNaN(avgHeartRate)) avgHeartRate = 0;
      setHeartRateStats({
        max: maxHeartRate,
        min: minHeartRate,
        avg: avgHeartRate.toFixed(0),
      });
    }
  }, [selectedDay, heartbeatData]);

  return (
    <Box className={classes.root}>
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
          <div className={classes.button} onClick={toggleGraph}>
            Back
          </div>
          <div className={classes.buttonChat}>
            <Link to={`/Chat/${client.userId}`}>Chat</Link>
          </div>
        </div>
      </div>
      <Box className={classes.graph}>
        <Flex className={classes.textContainer}>
          <div className={classes.graphSelector}>
            <select
              className={classes.selector}
              id="daySelector"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
        </Flex>
        <Flex className={classes.chartContainer}>
          <Box>
            <Text className={classes.text}>Daily heartbeat chart</Text>

            <Box className={classes.chart}>
              <ReactApexChart
                options={options}
                series={[{ data: heartbeatValues }]}
                type="line"
                height={options.chart.height}
                width={options.chart.width}
              />
            </Box>
          </Box>
          <VStack className={classes.values}>
            <Box className={classes.valueCard}>
              <Center className={classes.head}>Max</Center>
              <CircularProgress
                value={heartRateStats ? heartRateStats.max : null}
                color="#E081BC"
                thickness="5px"
              >
                <CircularProgressLabel>
                  <Text className={classes.data}>
                    {heartRateStats ? heartRateStats.max : "N/A"}
                  </Text>
                  <Text className={classes.tag}>bpm</Text>
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <Box className={classes.valueCard}>
              <Center className={classes.head}>Min</Center>
              <CircularProgress
                value={heartRateStats ? heartRateStats.min : null}
                color="#63AEFF"
                thickness="5px"
              >
                <CircularProgressLabel>
                  <Text className={classes.data}>
                    {heartRateStats ? heartRateStats.min : "N/A"}
                  </Text>
                  <Text className={classes.tag}>bpm</Text>
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <Box className={classes.valueCard}>
              <Center className={classes.head}>Average</Center>
              <CircularProgress
                value={heartRateStats ? heartRateStats.avg : null}
                color="blue"
                thickness="5px"
              >
                <CircularProgressLabel>
                  <Text className={classes.data}>
                    {heartRateStats ? heartRateStats.avg : "N/A"}
                  </Text>
                  <Text className={classes.tag}>bpm</Text>
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
}
