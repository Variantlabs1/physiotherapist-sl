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

  const getPhysio = async () => {
    const q = query(
      collection(db, "physiotherapist"),
      where("physiotherapistId", "==", user.uid)
    );
    const res = await getDocs(q);
    return res.docs[0].data();
  };

  const { data: physioData } = useQuery({
    queryKey: ["graphexercise"],
    queryFn: getPhysio,
  });

  useEffect(() => {
    const getExercises = () => {
      if (!physioData || !physioData.assignedOn) return; // Ensure data exists
      const weeklyExercises = [];
      const today = new Date();
      const mondayThisWeek = new Date(today);
      mondayThisWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
      const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      let monthCount, month;
  
      switch (selectedPeriod) {
        case "thisWeek":
          for (let i = 0; i < 7; i++) {
            const dailyExercises = physioData.assignedOn.filter(
              (d) =>
                new Date(d.toDate()).toLocaleDateString() ===
                new Date(
                  new Date(mondayThisWeek).setDate(mondayThisWeek.getDate() + i)
                ).toLocaleDateString()
            );
            weeklyExercises.push(dailyExercises.length);
          }
          setData(weeklyExercises);
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
          }));
          break;
  
        case "lastWeek":
          const mondayLastWeek = new Date(mondayThisWeek);
          mondayLastWeek.setDate(mondayThisWeek.getDate() - 7);
          for (let i = 0; i < 7; i++) {
            const dailyExercises = physioData.assignedOn.filter(
              (d) =>
                new Date(d.toDate()).toLocaleDateString() ===
                new Date(
                  new Date(mondayLastWeek).setDate(mondayLastWeek.getDate() + i)
                ).toLocaleDateString()
            );
            weeklyExercises.push(dailyExercises.length);
          }
          setData(weeklyExercises);
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
          }));
          break;
  
        case "thisMonth":
          month = today.getMonth();
          monthCount = new Date(today.getFullYear(), month + 1, 0).getDate(); // Get total days in the month
          for (let i = 0; i < monthCount; i++) {
            const dailyExercises = physioData.assignedOn.filter(
              (d) =>
                new Date(d.toDate()).toLocaleDateString() ===
                new Date(
                  new Date(firstDayThisMonth).setDate(
                    firstDayThisMonth.getDate() + i
                  )
                ).toLocaleDateString()
            );
            weeklyExercises.push(dailyExercises.length);
          }
          setData(weeklyExercises);
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: Array.from(
                { length: monthCount },
                (_, i) => i + 1
              ).map((day) => `${day}`),
            },
          }));
          break;
  
        case "lastMonth":
          const firstDayLastMonth = new Date(firstDayThisMonth);
          firstDayLastMonth.setMonth(firstDayThisMonth.getMonth() - 1);
          monthCount = new Date(
            firstDayLastMonth.getFullYear(),
            firstDayLastMonth.getMonth() + 1,
            0
          ).getDate(); // Get total days in the last month
          for (let i = 0; i < monthCount; i++) {
            const dailyExercises = physioData.assignedOn.filter(
              (d) =>
                new Date(d.toDate()).toLocaleDateString() ===
                new Date(
                  new Date(firstDayLastMonth).setDate(
                    firstDayLastMonth.getDate() + i
                  )
                ).toLocaleDateString()
            );
            weeklyExercises.push(dailyExercises.length);
          }
          setData(weeklyExercises);
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: Array.from(
                { length: monthCount },
                (_, i) => i + 1
              ).map((day) => `${day}`),
            },
          }));
          break;
  
        case "thisYear":
          const exerciseCountsThisYear = new Array(12).fill(0);
          physioData.assignedOn.forEach((exercise) => {
            const exerciseDate = exercise.toDate();
            if (exerciseDate.getFullYear() === today.getFullYear()) {
              const month = exerciseDate.getMonth();
              exerciseCountsThisYear[month]++;
            }
          });
          setData(exerciseCountsThisYear);
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          }));
          break;
  
        case "lastYear":
          const lastYear = today.getFullYear() - 1;
          const exerciseCountsLastYear = new Array(12).fill(0);
          physioData.assignedOn.forEach((exercise) => {
            const exerciseDate = exercise.toDate();
            if (exerciseDate.getFullYear() === lastYear) {
              const month = exerciseDate.getMonth();
              exerciseCountsLastYear[month]++;
            }
          });
          setData(exerciseCountsLastYear);
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "June",
                "July",
                "Aug",
                "Sept",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          }));
          break;
  
        default:
      }
    };
    if (user && physioData) getExercises();
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
          show: false, // Hide the x-axis line
        },
        axisTicks: {
          show: false, // Hide the x-axis ticks
        },
        labels: {
          offsetY: -1,
          style: {
            colors: "#DDDDDD", // Change the color of x-axis labels
            fontSize: "0.1 rem", // Set the font size of x-axis labels
          },
        },
        tickAmount: 8,
      },
      stroke: {
        curve: "smooth", // Set the curve to smooth
        colors: "#DDDDDD",
        width: 3,
      },
      yaxis: {
        labels: {
          offsetX: -18, // Move labels to the left
          style: {
            colors: "#DDDDDD", // Change the color of x-axis labels
            fontSize: "0.1 rem", // Set the font size of y-axis labels
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
        theme: "dark", // Change the tooltip theme to 'dark'
        x: {
          show: true,
        },
        y: {
          formatter: (value) => `${value} units`,
        },
        marker: {
          show: true,
        },
        style: {
          background: "#FF0000", // Change the background color of the tooltip
          color: "#FFFFFF", // Change the font color of the tooltip
        },
      },
    };
  }

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
