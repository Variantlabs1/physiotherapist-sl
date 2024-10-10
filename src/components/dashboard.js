import { Center } from "@chakra-ui/react";
import classes from "../styles/Dashboard.module.scss";
import LeftChart from "./LeftChart";
import Chart from "./chart";
import ClientList from "./clientList";
import Exercises from "./exercises";
import WelcomeCard from "./welcomeCard";
import { FaBell, FaSearch } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import useDate from "./useDate";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./data_fetch/authProvider";

const Dashboard = (props) => {
  const formattedDate = useDate();
  const [clients, setClients] = useState([]); // Initialize clients as an empty array
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const func = async () => {
      try {
        if (user?.uid) {
          const q = query(
            collection(db, "physiotherapist"),
            where("physiotherapistId", "==", user?.uid)
          );
          const getPhysio = await getDocs(q);
          if (!getPhysio.empty) {
            const physioData = getPhysio.docs[0]?.data();
            // Ensure physioData.clientsList is an array
            setClients(physioData?.clientsList || []); 
          } else {
            setClients([]); // Fallback if no clients
          }
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        setClients([]); // Fallback in case of error
      }
    };
    func();
  }, [user]);

  return (
    <div className={classes.rootMain}>
      <div className={classes.left}>
        <WelcomeCard />

        <div className={classes.searchBarNotificationContainer}>
          <div className={classes.searchBarContainer}>
            <div className={classes.searchIconContainer}>
              <FaSearch size={20} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={classes.searchInput}
            />
          </div>
          <Center className={classes.notificationIconContainer}>
            <FaBell color="white" />
          </Center>
        </div>

        <div className={classes.Activitytitle}>Activity Reports</div>

        <div className={classes.graphs}>
          <div className={classes.leftGraph}>
            {clients.length > 0 ? (
              <LeftChart clients={clients} />
            ) : (
              <p>Loading clients...</p>
            )}
          </div>

          <div className={classes.rightGraph}>
            <Chart />
          </div>
        </div>
        <div>
          
        </div>
        <div className={classes.clientList}>
          <ClientList />
        </div>
      </div>

      <div className={classes.right}>
        <div className={classes.date}>{formattedDate}</div>
        <div className={classes.exercises}>
          <Exercises />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
