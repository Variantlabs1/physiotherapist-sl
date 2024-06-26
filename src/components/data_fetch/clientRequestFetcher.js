import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { AuthContext, useAuth } from "./authProvider";
import { useQuery } from "@tanstack/react-query";

const ClientRequestFetcher = ({ onClientsFetched }) => {
  // const user = useAuth();
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const userId = user.uid; // Get the currently signed-in user
      // const userId = "T7xHEEXnHWZCNA6fqPHoMeVXwAt2";

      // Fetch the signed-in user's referral code from the physiotherapist collection
      const physiotherapistRef = collection(db, "physiotherapist");
      const q = query(
        physiotherapistRef,
        where("physiotherapistId", "==", userId)
      );
      const physiotherapistSnapshot = await getDocs(q);

      //Get Data of the Physiotherapist
      const physiotherapistData = physiotherapistSnapshot.docs[0].data();

      // Fetch all users with the same referral code
      const usersRef = collection(db, "Users");

      const clientsQuery = query(
        usersRef,
        where("referralCode", "==", physiotherapistData.referralCode),
        where("verified", "==", false)
        // where("userId", "==", "apZDOT9uYUPvoEBUKg6LGTRcgl92")
      );

      const querySnapshot = await getDocs(clientsQuery);

      // Store the user data in the state of the parent component
      const userDataList = querySnapshot.docs.map((doc) => doc.data());
      return userDataList;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: clientRequests } = useQuery({
    queryKey: ["clientrequests"],
    queryFn: fetchData,
  });

  useEffect(() => {
    if (clientRequests) {
      onClientsFetched(clientRequests); // Pass fetched data to parent component
    }
  }, [clientRequests]);

  return null;
};

export default ClientRequestFetcher;
