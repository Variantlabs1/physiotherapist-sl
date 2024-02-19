import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "../styles/Chart.css";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./data_fetch/authProvider";

const Chart = ({clientWeeklyExercises}) => {
    const [data,setData]=useState([0,0,0,0,0,0,0])
    const {user} = useContext(AuthContext)
    // console.log(user)

    const series = [{
        name:"Exercises",
       data:clientWeeklyExercises?clientWeeklyExercises:data
    }]

    useEffect(()=>{

        const getExercises = async()=>{
            try{
                const q=query(collection(db,"physiotherapist"),where("physiotherapistId","==",user.uid))
                const res=await getDocs(q)
                const physioData=res.docs[0].data()
                const today=new Date()
                const sun=new Date(new Date().setDate(today.getDate()-today.getDay()))
                const weeklyExercises=[]
                for (let i = 0; i <7; i++) {
                   const  dailyExercises =  physioData.assignedOn.filter(d=>new Date(d.toDate()).toLocaleDateString()===new Date(new Date(sun).setDate(sun.getDate()+i)).toLocaleDateString())
                    
                    weeklyExercises.push(dailyExercises.length)
                }
                setData(weeklyExercises)
                console.log(weeklyExercises)

            }catch(e){
                console.log(e)
            }
        }
     user&&   getExercises()
        

    },[user])

    


    return (
        <div className="lineChart" >
            <div className='exercisesTop'>
                <span>Exercises</span>
                <div className="exercisesButton" >
                    <p>View all</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 8" fill="none">
                    <path d="M5.14187 7.13304L1.04956 3.04073C0.551137 2.54231 0.439911 1.97201 0.715879 1.32983C0.991848 0.687653 1.48345 0.36604 2.19068 0.36499H10.2966C11.0049 0.36499 11.497 0.686604 11.773 1.32983C12.0489 1.97306 11.9372 2.54336 11.4377 3.04073L7.34542 7.13304C7.18802 7.29043 7.01751 7.40848 6.83388 7.48718C6.65025 7.56588 6.4535 7.60523 6.24364 7.60523C6.03378 7.60523 5.83703 7.56588 5.65341 7.48718C5.46978 7.40848 5.29926 7.29043 5.14187 7.13304Z" fill="#4A6ECF"/>
                    </svg>
                </div>
            </div>

            <div className="apexChart"  >

            <ReactApexChart className="chart" options={options} series={series} type="line" />
            </div>
        </div>
    );
};

export default Chart;



const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
  ];



    
const options = {
    chart: {
        id: "chart",
        toolbar: {
            show: false,
        },
        height:900,
    },
    xaxis: {
         categories: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
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