import React from 'react'
import styled from 'styled-components'

const Activity = ({setShowSingleActivity,showSingleActivity}) => {
  return (
    <Container onClick={()=>{!showSingleActivity&&setShowSingleActivity(true)}} >
        <span>10:00 pm</span>
        <h2>Sleep</h2>
        <span>Idle</span>
    </Container>
  )
}

export default Activity

const Container = styled.div`
    width: 100%;
    cursor: pointer;
    padding: 15px 0;
    background-color: white;
    justify-content: space-around;
    display: flex;
    align-items: center;
    border-radius: 14.373px;
    background: #F9F6FF;
    box-shadow: 0px 3.59322px 7.18644px 0px rgba(230, 219, 255, 0.50);
    &>h2{
        color: black;
    }
`