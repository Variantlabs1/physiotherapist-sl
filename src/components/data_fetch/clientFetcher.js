import { useContext, useEffect } from "react";
import { collection, query, where, getDocs, or } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "./authProvider";
import { useQuery } from "@tanstack/react-query";

const ClientFetcher = ({ onClientsFetched }) => {
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const userId = user?.uid;
      if (!userId) return [];

      // Step 1: Get referral code from physiotherapist
      const physiotherapistRef = collection(db, "physiotherapist");
      const q = query(physiotherapistRef, where("physiotherapistId", "==", userId));
      const physiotherapistSnapshot = await getDocs(q);

      if (physiotherapistSnapshot.empty) {
        console.warn("No physiotherapist data found for this user.");
        return [];
      }

      const physiotherapistData = physiotherapistSnapshot.docs[0].data();
      const referralCode = physiotherapistData.referralCode;

      // Step 2: Get all users with the same referral code and verified = true (boolean or string)
      const usersRef = collection(db, "Users");
      const q1 = query(usersRef, where("referralCode", "==", referralCode), where("verified", "==", true));  // boolean
      const querySnapshot = await getDocs(q1);

      let userDataList = querySnapshot.docs.map((doc) => doc.data());

      // Fallback: if no boolean-verified users, try string "true"
      if (userDataList.length === 0) {
        const q2 = query(usersRef, where("referralCode", "==", referralCode), where("verified", "==", "true"));  // string
        const fallbackSnapshot = await getDocs(q2);
        userDataList = fallbackSnapshot.docs.map((doc) => doc.data());
      }

      return userDataList;
    } catch (error) {
      console.error("Error fetching client data:", error);
      throw error;
    }
  };

  const { data: clients } = useQuery({
    queryKey: ["clients", user?.uid],
    queryFn: fetchData,
    enabled: !!user?.uid,
  });

  useEffect(() => {
    if (clients) {
      onClientsFetched(clients);
    }
  }, [clients, onClientsFetched]);

  return null;
};

export default ClientFetcher;
