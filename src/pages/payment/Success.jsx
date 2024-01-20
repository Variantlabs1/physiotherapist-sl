import React, { useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
  
} from "firebase/firestore";
import { db } from "../../firebase";
import {AuthContext} from "../../components/data_fetch/authProvider"

const Success = () => {
    const location = useLocation()
    const {user} = useContext(AuthContext)
    const id = location.search.split("=")[1]



    useEffect(()=>{
        const getSession =async()=>{
            try{
                const res = await fetch("http://localhost:5000/api/session_status?session_id="+id,{method:'GET'})
                const session = await res.json()
                console.log(session)
                if(session.status==="complete"){
                    try{
                        const q= query(collection(db,"physiotherapist"),
                        where('physiotherapistId',"==",user?.uid)
                         )
                         const response = await getDocs(q)
                         const userDocId = response.docs[0].ref.id
                     
                         await setDoc(doc(db,"physiotherapist",userDocId,'payments',session.payment_intent ),{
                             paid_on:new Date(session.created*1000),                            
                             status:session.status,
                             customer_details:session.customer_details,
                             amount_total_in_cents:session.amount_total,
                         })

                         console.log('Payment document added successfully.');
                    }catch(e){
                        console.log(e)
                    }
    
                }
            }catch(e){
                console.log(e)
            }
            
        } 
    //    user?.uid &&  getSession()
    },[id,user?.uid])

  return (
    <>
    <h1> Paid Successfully.</h1> <br />
    <Link className='link' to="/home" >Go to Home</Link>
   </>

  )
}

export default Success

