import { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { AuthContext, useAuth } from "./authProvider";

const ClientFetcher = ({ onClientsFetched }) => {
    // const user = useAuth();
    const {user} = useContext(AuthContext)
    const [userData, setUserData] = useState(null);

    useEffect(() => {
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
                const physiotherapistData =
                    physiotherapistSnapshot.docs[0].data();
                // console.log(physiotherapistData);

                // Fetch all users with the same referral code
                const usersRef = collection(db, "Users");
                const clientsQuery = query(
                    usersRef,
                    where(
                        "referralCode",
                        "==",
                        physiotherapistData.referralCode
                    ),
                    where("verified", "==", true)
                );

                const querySnapshot = await getDocs(clientsQuery);

                // Store the user data in the state of the parent component
                const userDataList = querySnapshot.docs.map((doc) =>
                    (doc.data())
                );
                onClientsFetched(userDataList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Call the function to retrieve data
        fetchData();
    },[user]);

    return null;
};

export default ClientFetcher;
