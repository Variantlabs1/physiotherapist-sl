import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import body from '../assets/body.jpg'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { Heading } from '@chakra-ui/react'

const Measurement = ({onBackClick,clientId}) => {
    const [measurements,setMeasurements]  = useState([])

    useEffect(()=>{
        const getMeasurements = async()=>{
            const res = await getDoc(doc(db,"Body Measurements",clientId))
            if(res.exists()){
                // setMeasurements(Object.entries(res.data()))
                setMeasurements(res.data())
            }

        }
        getMeasurements()
    },[clientId])

  return (
    <Container>
        <Top>
            <Heading fontSize={'1.3rem'}>Body Mesurements</Heading>
            <span onClick={()=>onBackClick(null)} >Back</span>
        </Top>

        <Wrapper>
            <Left>
                    <Card> 
                        <p>Arms</p>
                        <span>{measurements.average_arms ? measurements.average_arms :"No data!"}</span>
                    </Card>
                    <Card> 
                        <p>Height</p>
                        <span>{measurements.average_height ? measurements.average_height :"No data!"}</span>
                    </Card>
                    <Card> 
                        <p>Legs</p>
                        <span>{measurements.average_left_leg ? measurements.average_left_leg :"No data!"}</span>
                    </Card>
                    <Card> 
                        <p>Shoulder</p>
                        <span>{measurements.average_shoulder ? measurements.average_shoulder :"No data!"}</span>
                    </Card>
                    <Card> 
                        <p>Waist</p>
                        <span>{measurements.average_waist ? measurements.average_waist :"No data!"}</span>
                    </Card>
            </Left>

            <Right>
                <img src={body} alt=''/>

            </Right>
        </Wrapper>
    </Container>
  )
}

export default Measurement 

const Container =  styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;

`
const Top =  styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;
    margin-bottom: 10px;
    &>span{
        display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 17px;
  cursor: pointer;
  gap: 10px;
border: 1px solid #6C9FFF;
background: #6C9FFF;
color:whitesmoke;
    }
    
`

const Wrapper =  styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
`

const Left =  styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    
`
const Right =  styled.div`
    display: flex;
    flex-direction: column;
    height: 70vh;
    width: 50%;
    justify-content: center;
    align-items: center;
    &>img{
        width: 100%;
        height: 100%;
    }
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px;
    border-radius: 10px;
    background-color: #b3c4ea;
    &>p{
        font-weight: bold;
    }
`

// const data = [

//     {
//         bodyPart:"Arms",
//         length:50
//     },
//     {
//         bodyPart:"Height",
//         length:50
//     },
//     {
//         bodyPart:"Legs",
//         length:50
//     },
//     {
//         bodyPart:"Shoulders",
//         length:50
//     },
//     {
//         bodyPart:"Waist",
//         length:50
//     },
// ]