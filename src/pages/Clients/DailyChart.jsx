import styled from "styled-components"
import heartbeat from "../assets/heartbeat.png"
import water from "../assets/water.svg"
import sleep from "../assets/sleep.svg"
import steps from "../assets/steps.svg"
import weight from "../assets/weight.png"
import Activity from "../../components/Activity"
import Exercise from "../../components/Exercise"
import Card from "../../components/Card"
import { useState } from "react"
import ActivityGraph from "./ActivityGraph"
import DailyChartTop from "../../components/DailyChartTop"

const DailyChart = ({onBackClick,client,exercises}) => {
    const [showSingleActivity,setShowSingleActivity] = useState(false)
  return (

        <Container>
          <DailyChartTop  clientName={client.userName} showSingleActivity={showSingleActivity} onBackClick={onBackClick} goBack={setShowSingleActivity} />
       {   showSingleActivity ? <ActivityGraph  showSingleActivity={showSingleActivity} setShowSingleActivity={setShowSingleActivity} /> :

        <Wrapper>
     <div style={{minWidth:"60%"}} >
        <Actions>
        {
          data.map((item,i)=><Activity  showSingleActivity={showSingleActivity} setShowSingleActivity={setShowSingleActivity}  key={i} />)
        }
        </Actions>
  
        <Exercise  clientId={client.userId} exercises={exercises} />
        </div>
  
        <Chart>
          {
           chart.map((item,i)=>(
             <Card  key={i} name={item.name} src={item.src}
              color={item.color} value={item.value} unit={item.unit}  />
             ))
          }
        </Chart>
        </Wrapper>}
  
  
      </Container>
    

  )
}

export default DailyChart

const Container = styled.div`
    width: 82vw;
    min-height: 90vh;
    border-top-left-radius: 10px;
    background-color: white;
    padding: 20px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  
`

const Actions = styled.div`
  display: flex;
  padding: 5px 15px;
  gap: 20px;
  width: 100%;
  flex-direction: column;

`

const Chart = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  padding: 5px 50px;
  gap: 45px;
  &:hover{
      background-color: white;
      border-radius: 50px;
    }
`
const data = [1,2,3,4]

const chart = [
  {
    name:'Heartbeat',
    color:'#5B39AA',
    value:68,
    unit:"bpm",
    src:heartbeat
  },
  {
    name:'Weight',
    color:'#E081BC',
    value:58,
    unit:"Kg",
    src:weight
  },
  {
    name:'Steps',
    color:'#9BCFCE',
    value:500,
    unit:"Steps",
    src:steps
  },
  {
    name:'Sleep',
    color:'#EA93A4',
    value:7,
    unit:"Hr",
    src:sleep
  },
  {
    name:'VO2',
    color:'#6F4AE4',
    value:53,
    unit:"suprior",
    src:''
  },
  {
    name:'Water',
    color:'#63AEFF',
    value:600,
    unit:"ml",
    src:water
  },
]
