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
  const [data, setData] = useState([]); // Initialize data to an empty array
  const { user } = useContext(AuthContext);
  const [selectedPeriod, setSelectedPeriod] = useState("thisWeek");
  const [options, setOptions] = useState(getInitialOptions());

  const series = [
    {
      name: "Exercises",
      data: data.length > 0 ? data : [0], // Ensure there's data to display
    },
  ];

  const getPhysio = async () => {
    if (!user) return null;
    const q = query(
      collection(db, "physiotherapist"),
      where("physiotherapistId", "==", user.uid)
    );
    const res = await getDocs(q);
    return res.docs.length > 0 ? res.docs[0].data() : null;
  };

  const { data: physioData } = useQuery({
    queryKey: ["graphexercise"],
    queryFn: getPhysio,
  });

  useEffect(() => {
    const getExercises = () => {
      if (!physioData || !physioData.assignedOn) return; // Ensure data is available

      const weeklyExercises = [];
      const today = new Date();
      const mondayThisWeek = new Date(today);
      mondayThisWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
      const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      let monthCount, month;

      switch (selectedPeriod) {
        case "thisWeek":
          for (let i = 0; i < 7; i++) {
            const dailyExercises = physioData.assignedOn.filter((d) =>
              new Date(d.toDate()).toLocaleDateString() ===
              new Date(new Date(mondayThisWeek).setDate(mondayThisWeek.getDate() + i)).toLocaleDateString()
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
            const dailyExercises = physioData.assignedOn.filter((d) =>
              new Date(d.toDate()).toLocaleDateString() ===
              new Date(new Date(mondayLastWeek).setDate(mondayLastWeek.getDate() + i)).toLocaleDateString()
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
          monthCount = getDaysInMonth(month, today.getFullYear());

          for (let i = 0; i < monthCount; i++) {
            const dailyExercises = physioData.assignedOn.filter((d) =>
              new Date(d.toDate()).toLocaleDateString() ===
              new Date(new Date(firstDayThisMonth).setDate(firstDayThisMonth.getDate() + i)).toLocaleDateString()
            );
            weeklyExercises.push(dailyExercises.length);
          }
          setData(weeklyExercises);
          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: Array.from({ length: monthCount }, (_, i) => i + 1).map((day) => `${day}`),
            },
          }));
          break;

        // (Rest of the cases)
        
        default:
          break;
      }
    };

    // Fetch exercises only when user and physioData are available
    user && physioData && getExercises();
  }, [user, selectedPeriod, physioData]);

  function getInitialOptions() {
    return {
      chart: {
        id: "chart",
        toolbar: { show: false },
        height: "95%",
        width: "100%",
      },
      xaxis: {
        categories: [],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          offsetY: -1,
          style: {
            colors: "#DDDDDD",
            fontSize: "0.1rem",
          },
        },
        tickAmount: 8,
      },
      stroke: { curve: "smooth", colors: "#DDDDDD", width: 3 },
      yaxis: {
        labels: {
          offsetX: -18,
          style: { colors: "#DDDDDD", fontSize: "0.1rem" },
        },
      },
      grid: {
        show: true,
        borderColor: "#AEA8FF",
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: false } },
      },
      markers: { size: 4, colors: ["#FFBAD0"], strokeColors: "#AEA8FF" },
      fill: {
        colors: ["#B1D0FF"],
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          gradientToColors: ["#FFBAD0"],
          stops: [0, 100],
        },
      },
    };
  }

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  return (
    <div className="container">
      <Select
        onChange={(e) => setSelectedPeriod(e.target.value)}
        icon={<FaCaretDown />}
        defaultValue={"thisWeek"}
        css={customStyles}
      >
        <option value="thisWeek">This week</option>
        <option value="lastWeek">Last week</option>
        <option value="thisMonth">This month</option>
        <option value="lastMonth">Last month</option>
        <option value="thisYear">This year</option>
        <option value="lastYear">Last year</option>
      </Select>
      {/* Only render the chart when there's data */}
      {data.length > 0 ? (
        <ReactApexChart options={options} series={series} type="line" />
      ) : (
        <p>No data available for the selected period.</p>
      )}
    </div>
  );
};

export default Chart;
