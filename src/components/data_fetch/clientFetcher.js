import { useContext, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "./authProvider";
import { useQuery } from "@tanstack/react-query";

const ClientFetcher = ({ onClientsFetched }) => {
  // const user = useAuth();
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const userId = user?.uid; // Get the currently signed-in user

      // Fetch the signed-in user's referral code from the physiotherapist collection
      const physiotherapistRef = collection(db, "physiotherapist");
      const q = query(
        physiotherapistRef,
        where("physiotherapistId", "==", userId)
      );
      const physiotherapistSnapshot = await getDocs(q);

      //Get Data of the Physiotherapist
      const physiotherapistData = physiotherapistSnapshot.docs[0].data();
      // console.log(physiotherapistData);

      // Fetch all users with the same referral code
      const usersRef = collection(db, "Users");
      const clientsQuery = query(
        usersRef,
        where("referralCode", "==", physiotherapistData.referralCode),
        where("verified", "==", true)
      );

      const querySnapshot = await getDocs(clientsQuery);

      // Store the user data in the state of the parent component
      const userDataList = querySnapshot.docs.map((doc) => doc.data());

      return userDataList;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: fetchData,
  });

  useEffect(() => {
    if (clients) {
      onClientsFetched(clients); // Pass fetched data to parent component
    }
  }, [clients]);

  return null;
};

export default ClientFetcher;
