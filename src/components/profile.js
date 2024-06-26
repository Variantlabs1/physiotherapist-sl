import { useState, useEffect, useContext } from "react";
import {
  onSnapshot,
  query,
  collection,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { AuthContext, useAuth } from "../components/data_fetch/authProvider"; // Import the AuthProvider
import { db } from "../firebase";
import classes from "../styles/Profile.module.scss";
import defaultImg from "../assets/vectorProfile.png";

const Profile = () => {
  // const user = useAuth(); // Use the authentication state from the context
  const [userData, setUserData] = useState(null);
  const { user } = useContext(AuthContext);

  console.log(userData);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "physiotherapist"),
        where("physiotherapistId", "==", user.uid)
      );
      const unSub = onSnapshot(q, (snapshot) => {
        !snapshot.empty && setUserData(snapshot.docs[0].data());
      });
      return () => unSub();
    }
  }, [user]);

  return (
    <div className={classes.rootProfile}>
      <div className={classes.userPicture}>
        <img
          src={userData ? userData.profileImageURL : defaultImg}
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
