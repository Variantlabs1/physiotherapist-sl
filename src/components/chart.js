import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/Chart.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./data_fetch/authProvider";
import { Select } from "@chakra-ui/react";
import { FaCaretDown } from "react-icons/fa";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";

const customStyles = css`
  outline: none;
  border: none;
  box-shadow: none;
  color: #0d30ac;
  border-radius: 20px;
  background-color: white;
  font-weight: 500;
  height: 4.5vh;
  option {
    height: 5vh;
  }
`;

const Chart = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const [selectedPeriod, setSelectedPeriod] = useState("thisWeek");
  const [options, setOptions] = useState(getInitialOptions());

  const series = [
    {
      name: "Exercises",
      data: data,
    },
  ];

  // Fetch exercises from the correct Firestore path
  const getPhysio = async () => {
    console.log("🔍 Fetching exercises for user:", user?.uid);
    
    try {
      // Fetch from: /assignedExercise/{userId}/exercises
      const exercisesRef = collection(db, `assignedExcercise/${user?.uid}/exercises`);
      const exercisesSnapshot = await getDocs(exercisesRef);
      
      if (!exercisesSnapshot.empty) {
        const exercises = exercisesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log("📋 Found exercises:", exercises.length);
        console.log("📋 Sample exercise:", exercises[0]);
        
        return { exercises: exercises };
      } else {
        console.log("❌ No exercises found in assignedExercise collection");
        return { exercises: [] };
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      return { exercises: [] };
    }
  };

  const { data: physioData } = useQuery({
    queryKey: ["graphexercise", user?.uid],
    queryFn: getPhysio,
    enabled: !!user?.uid,
  });

  useEffect(() => {
    console.log("🔄 useEffect triggered");
    console.log("👤 User:", user?.uid);
    console.log("📊 Selected period:", selectedPeriod);
    console.log("📋 Physio data:", physioData);

    const getExercises = () => {
      if (!physioData || !physioData.exercises) {
        console.log("❌ No physioData or exercises array");
        setData([0, 0, 0, 0, 0, 0, 0]); // Default data for empty chart
        return;
      }

      console.log("📅 Processing exercises for period:", selectedPeriod);
      console.log("📅 Total exercises:", physioData.exercises.length);

      const chartData = [];
      const exercises = physioData.exercises;

      switch (selectedPeriod) {
        case "thisWeek":
        case "lastWeek":
          console.log(`📅 Processing ${selectedPeriod}`);
          
          // Count exercises by day of week
          const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
          const dayCounts = [0, 0, 0, 0, 0, 0, 0]; // Mon, Tue, Wed, Thu, Fri, Sat, Sun
          
          exercises.forEach(exercise => {
            if (exercise.assignedDay) {
              const dayIndex = dayNames.indexOf(exercise.assignedDay);
              if (dayIndex !== -1) {
                dayCounts[dayIndex]++;
                console.log(`✅ Exercise assigned to ${exercise.assignedDay} (index ${dayIndex})`);
              }
            }
          });
          
          console.log("📊 Day counts:", dayCounts);
          setData(dayCounts);
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
          }));
          break;

        case "thisMonth":
        case "lastMonth":
          console.log(`📅 Processing ${selectedPeriod}`);
          
          // For monthly view, distribute exercises across days of the month
          // Since we don't have specific dates, we'll show total count on day 1
          const today = new Date();
          const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
          const monthData = new Array(daysInMonth).fill(0);
          
          // Put all exercises on the first day as we don't have specific dates
          monthData[0] = exercises.length;
          
          setData(monthData);
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => `${day}`),
            },
          }));
          break;

        case "thisYear":
        case "lastYear":
          console.log(`📅 Processing ${selectedPeriod}`);
          
          // For yearly view, distribute exercises across months
          // Since we don't have specific dates, we'll show total count in current month
          const yearData = new Array(12).fill(0);
          const currentMonth = new Date().getMonth();
          yearData[currentMonth] = exercises.length;
          
          setData(yearData);
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
            },
          }));
          break;

        default:
          setData([0, 0, 0, 0, 0, 0, 0]);
      }
      
      console.log("📊 Final chart data:", data);
    };

    if (user && physioData) {
      getExercises();
    }
  }, [user, selectedPeriod, physioData]);

  function getInitialOptions() {
    return {
      chart: {
        id: "chart",
        toolbar: {
          show: false,
        },
        height: "95%",
        width: "100%",
      },
      xaxis: {
        categories: [],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          offsetY: -1,
          style: {
            colors: "#DDDDDD",
            fontSize: "12px", // Fixed font size
          },
        },
        tickAmount: 8,
      },
      stroke: {
        curve: "smooth",
        colors: ["#DDDDDD"],
        width: 3,
      },
      yaxis: {
        labels: {
          offsetX: -18,
          style: {
            colors: "#DDDDDD",
            fontSize: "12px", // Fixed font size
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#AEA8FF",
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      markers: {
        size: 4,
        colors: ["#FFBAD0"],
        strokeColors: "#FFBAD0",
      },
      tooltip: {
        theme: "dark",
        x: {
          show: true,
        },
        y: {
          formatter: (value) => `${value} exercises`,
        },
        marker: {
          show: true,
        },
        style: {
          background: "#333333",
          color: "#FFFFFF",
        },
      },
      colors: ["#FFBAD0"], // Line color
    };
  }

  // Debug render
  console.log("🎨 Rendering chart with data:", data);
  console.log("🎨 Series:", series);

  return (
    <div className="lineChart">
      <div className="exercisesTop">
        <span>Exercises</span>

        <div className="exercisesButton">
          <Select
            css={customStyles}
            icon={<FaCaretDown color="#0d30ac" />}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="thisWeek">This Week</option>
            <option value="lastWeek">Last Week</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
            <option value="lastYear">Last Year</option>
          </Select>
        </div>
      </div>

      {/* Debug info - remove this in production */}
   
      <ReactApexChart
        className="chart"
        options={options}
        series={series}
        type="line"
        height={options.chart.height}
        width={options.chart.width}
      />
    </div>
  );
};

export default Chart;