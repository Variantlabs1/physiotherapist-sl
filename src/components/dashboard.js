import { Center } from "@chakra-ui/react";
import classes from "../styles/Dashboard.module.scss";
import LeftChart from "./LeftChart";
import Chart from "./chart";
import ClientList from "./clientList";
import Exercises from "./exercises";
import WelcomeCard from "./welcomeCard";
import ClientFetcher from "./data_fetch/clientFetcher"; // Import the same fetcher
import { FaBell, FaSearch } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import useDate from "./useDate";
import { AuthContext } from "./data_fetch/authProvider";

const Dashboard = (props) => {
  const formattedDate = useDate();
  const [clients, setClients] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  // Use the same pattern as ClientList component
  const handleClientsFetched = (fetchedClients) => {
    try {
      console.log("Clients fetched for Dashboard:", fetchedClients);
      
      // Process the clients to ensure they have the required date fields for LeftChart
      const processedClients = (fetchedClients || []).map((client, index) => ({
        ...client,
        // Ensure each client has an ID
        userId: client.userId || client.id || index.toString(),
        // Add date fields that LeftChart expects - try multiple field names
        clientAcceptedOn: client.clientAcceptedOn || 
                         client.createdAt || 
                         client.registrationDate ||
                         client.joinedDate ||
                         client.assignedDate ||
                         client.createdOn ||
                         new Date() // fallback to current date
      }));
      
      setClients(processedClients);
      setError(null);
      setLoading(false);
      
      console.log("Processed clients for LeftChart:", processedClients);
    } catch (err) {
      console.error("Error processing clients:", err);
      setError("Failed to process clients data");
      setClients([]);
      setLoading(false);
    }
  };

  const handleFetchError = (error) => {
    console.error("ClientFetcher error:", error);
    setError("Failed to fetch clients");
    setClients([]);
    setLoading(false);
  };

  // Set loading to false after a timeout if no data comes
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading && clients.length === 0) {
        setLoading(false);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [loading, clients.length]);

  return (
    <div className={classes.rootMain}>
      {/* Hidden ClientFetcher - same as in ClientList */}
      <div style={{ display: 'none' }}>
        <ClientFetcher 
          onClientsFetched={handleClientsFetched}
          onError={handleFetchError}
        />
      </div>

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
        
        </div>

        <div className={classes.Activitytitle}>Activity Reports</div>

        <div className={classes.graphs}>
          <div className={classes.leftGraph}>
            {loading ? (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading clients data...</p>
              </div>
            ) : error ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
                <p>Error: {error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
              </div>
            ) : clients.length > 0 ? (
              <LeftChart clients={clients} />
            ) : (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>No clients data available</p>
                <small>Clients will appear here once data is loaded</small>
              </div>
            )}
          </div>

          <div className={classes.rightGraph}>
            <Chart />
          </div>
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