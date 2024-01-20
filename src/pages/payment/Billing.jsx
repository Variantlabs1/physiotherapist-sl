import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import StripeCheckoutForm from './Stripe'
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    setDoc,
    doc,
    orderBy,
  
} from "firebase/firestore";
import { db } from "../../firebase";
import {AuthContext} from "../../components/data_fetch/authProvider"

const Billing = () => {
    const {user} = useContext(AuthContext)

    const [payments,setPayments] = useState([])

    useEffect(()=>{
       const  getPayments = async()=>{
        try{
            const userQuery = query(collection(db,"physiotherapist"),where("physiotherapistId","==",user.uid))
            const getUser = await getDocs(userQuery)
            const userDocRef = getUser.docs[0].ref
            const res =await getDocs(query(collection(userDocRef,"payments"),orderBy("paid_on","asc")))
            setPayments(res.docs.map(doc=>doc.data()).reverse())
        }catch(e){
            console.log(e)
        }
       } 
       user && getPayments()
    },[user])

  return (
    <Container>
        <h1>Billing</h1>

        <Wrapper>
            <Left>
                <Top>
                    <h2>Order History</h2>
                    <p style={{color: '#747399'}} >Manage billing information and view reciepts</p>
                </Top>'
                <Payments>
                
                    { payments.length>0&&
                    <Payment>
                        <p>Date</p>
                        <p>Amount</p>
                        <p>Status</p>
                        {/* <p>Reciept</p> */}
                    </Payment>
}
                    
                      {payments.length>0?payments.map((item,i)=>(
                         <Payment key={i}>
                            <h3>{new Date(item.paid_on.toDate()).toDateString()}</h3>
                            <h3>${item.amount_total_in_cents/100}</h3>
                            < h3 style={{color:"#088f14"}} >{item.status}</h3>
                            {/* <Button>Download</Button> */}
                        </Payment>
                        ))
                        : <h1>No transactions.</h1>
                    }



                </Payments>
            </Left>


        </Wrapper>

        <StripeCheckoutForm/>


    </Container>
  )
}

export default Billing

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px  90px;
    
    &>h1{
        font-size: 50px;
        margin-bottom: 30px;
        color: #393A62;

    }
    
`

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    
`

const Right = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #EA4C3C;
    border-radius: 30px;
    width: 32%;
    height: 320px;
    padding:  40px;
    color: white;
    gap: 20px;
    
`

const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    color: #393A62;

    margin-bottom: 25px;
    
`
const Payments = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    height: 45vh;
    overflow-y: auto;
    &>h1{
        align-self:center;
        color: #484747;
        margin-top: 50px;
    }
    
`
const Payment = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>p{
        color: #747399;
        font-size: 18px;
        font-weight: 500;
    }
    &>*{
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: start;
    }
`

const Button = styled.button`
background-color: #F1F1FB;
border: none;
cursor: pointer;
padding: 12px 25px;
border-radius: 5px;
font-size: 16px;
font-weight: 500;
border: 1px solid #F1F1FB ;
`

