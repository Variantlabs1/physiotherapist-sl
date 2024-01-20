import { useState, useEffect, useContext } from "react";
import { onSnapshot, query, collection, where, doc, getDoc, getDocs } from "firebase/firestore";
import { AuthContext, useAuth } from "../components/data_fetch/authProvider"; // Import the AuthProvider
import { db } from "../firebase";
import classes from "../styles/Profile.module.scss";

const Profile = () => {
    // const user = useAuth(); // Use the authentication state from the context
    const [userData, setUserData] = useState(null);
    const {user} = useContext(AuthContext)

    console.log(userData);

  

    useEffect(()=>{
       if(user){
        const q =  query(collection(db,"physiotherapist"),where('physiotherapistId','==',user.uid))
        const unSub = onSnapshot(q,snapshot=>{
           !snapshot.empty && setUserData(snapshot.docs[0].data())
        })
        return ()=>unSub()}
    },[user])


    const defaultImage =
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

    return (
        <div className={classes.rootProfile}>
            <div className={classes.userPicture}>
                <img
                    src={userData ? userData.profileImageURL : defaultImage}
                    alt="profile"
                ></img>
            </div>
            <p className={classes.name}>
                {userData ? userData.username : "Loading..."}
            </p>
        </div>
    );
};

export default Profile;
