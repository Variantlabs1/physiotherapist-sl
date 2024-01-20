import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import classes from "../../styles/ActivityGraph.module.scss" 
import Activity from "../../components/Activity";

const ActivityGraph = ({showSingleActivity,setShowSingleActivity}) => {
  return (
    <div className={classes.root}>
      <Activity showSingleActivity={showSingleActivity} setShowSingleActivity={setShowSingleActivity} />

      <div className={classes.glucoseChart}>
        <h3>Glucose Chart</h3>

        <ResponsiveContainer width="99%" height="95%">

        <LineChart  data={data}>
        <XAxis tickMargin={15} tickLine={false} padding={{ left: 30, right: 30 }}  type="number" includeHidden   axisLine={false} dataKey="name" />
        <YAxis tickLine={false} type="category"  axisLine={false} />
        <CartesianGrid strokeDasharray="3 3" stroke="#ADFFA8" vertical={false}  />
        <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#614D8F" dot={{ stroke: '#FF0000' }} strokeWidth={4.465} />
        </LineChart>
      </ResponsiveContainer>
      

      </div>

      <div className={classes.vo2}>
          <h3>VO2</h3>
          <ResponsiveContainer width="99%" height="95%">

            <LineChart  data={data}>
            <XAxis tickLine={false} padding={{ left: 30, right: 30 }} hide={true}  type="number" includeHidden   axisLine={false} dataKey="name" />
            <YAxis stroke=" #9E86FF" tickMargin={20} orientation="right" tickLine={false} type="category"  />
            <Tooltip />
              <Line type="monotone" dataKey="pv" stroke="#614D8F" strokeWidth={4.465}
                            dot={(props) => {
                              if (props.index === data.length-1) {
                                // Display a dot for the first data point
                                return (
                                  <circle
                                  stroke="#000000" // Set the stroke color of the dot
                                  strokeWidth={5} 
                                    cx={props.cx}
                                    cy={props.cy}
                                    r={10} // Adjust the radius of the dot
                                    fill="white" // Set the color of the dot
                                  />
                                );
                              } else {
                                // Hide dots for other data points
                                return null;
                              }
                            }}
              />
            </LineChart>
          </ResponsiveContainer>

      </div>

      <div className={classes.heartRateChart}>
        <h3>Measuring Heart Rate</h3>
        <ResponsiveContainer width="99%" height="95%">

          <LineChart  data={heartRateData}>
          <XAxis tickLine={false} padding={{ left: 30, right: 30 }}   includeHidden   axisLine={false} dataKey="name" />
          <YAxis stroke=" #9E86FF" tickMargin={20} orientation="right" tickLine={false}   />
          <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#614D8F" strokeWidth={4.465}
              dot={(props) => {
                if (props.index === heartRateData.length-1) {
                  // Display a dot for the first data point
                  return (
                    <circle
                    stroke="#000000" // Set the stroke color of the dot
                    strokeWidth={5} 
                      cx={props.cx}
                      cy={props.cy}
                      r={10} // Adjust the radius of the dot
                      fill="white" // Set the color of the dot
                    />
                  );
                } else {
                  // Hide dots for other data points
                  return null;
                }
              }}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>
        
    </div>
  )
}

export default ActivityGraph

const data = [
  {
    name: 5,
    uv: 4000,
    pv: "Low",
    amt: 2400,
  },
  {
    name: 10,
    uv: 500,
    pv: "Ideal",
    amt: 2210,
  },
  {
    name: 15,
    uv: 2000,
    pv: "Low",
    amt: 2290,
  },
  {
    name: 20,
    uv: 2780,
    pv: "Ideal",
    amt: 2000,
  },
  {
    name: 30,
    uv: 7090,
    pv: "High",
    amt: 2181,
  },
  {
    name: 45,
    uv: 2390,
    pv: 'Ideal',
    amt: 2500,
  },
  {
    name: 55,
    uv: 3490,
    pv: "High",
    amt: 2100,
  },
];

const heartRateData = [
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
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];