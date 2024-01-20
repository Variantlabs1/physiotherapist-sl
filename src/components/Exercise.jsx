import React from 'react'
import styled from 'styled-components'

const Exercise = ({exercises,clientId}) => {
  return (
    <Container>
        <Top>
            <h3>Activites</h3>
            <span>View all</span>
        </Top>
        <Table>
            <tr>
                <th>Name</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Date</th>
                <th>Time</th>
            </tr>
            {
                exercises.map((item,i)=>(
                    <tr key={i} >
                        <td>{item.title}</td>
                        <td>3</td>
                        <td>{item.reps}</td>
                        <td>{new Date(item.assignedToClient?.filter(d=>d.clientId===clientId)[0].assignedOn.toDate()).toLocaleDateString()}</td>
                        <td>{item.duration} min</td>
                    </tr>
                ))
            }

        </Table>
    </Container>
  )
}

export default Exercise

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: black;
`

const Top = styled.div`
    display: flex;
    color: black;
    align-items: center;
    padding: 30px 50px 10px 50px;
    justify-content: space-between;
    &>span{
        color:#0D30AC
    };
    &>h3{
        color: black;
    }
`


const Table = styled.table`
    color: black;
width: 100%;
    &>tr{
        padding-bottom: 20px!important;
        &>th{
         color: black;
         padding: 12px;
        };
     &> td {
    padding: 12px; /* Add spacing within cells */
    color: black;
    text-align: center; /* Center the text within cells */
    };
}
`

const data = [1,2,3,4,5,6]
