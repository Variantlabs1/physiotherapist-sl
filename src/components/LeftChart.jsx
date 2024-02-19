import { useContext, useEffect, useState } from "react";
import classes from "../styles/LeftChart.module.scss";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { AuthContext } from "./data_fetch/authProvider";

const LeftChart = () => {
  const { user } = useContext(AuthContext);
  const [totalClients, setTotalClients] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const getNewClients = async () => {
      const today = new Date();
      const sun = new Date(
        new Date(today).setDate(today.getDate() - today.getDay())
      );
      // console.log(sun)
      const q = query(
        collection(db, "physiotherapist"),
        where("physiotherapistId", "==", user?.uid)
      );
      const getPhysio = await getDocs(q);
      const physioData = getPhysio.docs[0].data();
      if (physioData.clientsList) {
        setTotalClients(physioData.clientsList?.length);
        const lastWeekClients = physioData.clientsList?.filter(
          (c) => c.clientAcceptedOn?.toDate() >= sun
        );
        const newClientsPercent =
          (lastWeekClients?.length / physioData.clientsList.length) * 100;
        setPercentage(newClientsPercent);
      }
    };
    user?.uid && getNewClients();
  }, [user]);

  return (
    <>
      <div className={classes.top}>
        <p>Clients</p>
        <div>
          <span>This week</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path
              d="M5.14187 7.13304L1.04956 3.04073C0.551137 2.54231 0.439911 1.97201 0.715879 1.32983C0.991848 0.687653 1.48345 0.36604 2.19068 0.36499H10.2966C11.0049 0.36499 11.497 0.686604 11.773 1.32983C12.0489 1.97306 11.9372 2.54336 11.4377 3.04073L7.34542 7.13304C7.18802 7.29043 7.01751 7.40848 6.83388 7.48718C6.65025 7.56588 6.4535 7.60523 6.24364 7.60523C6.03378 7.60523 5.83703 7.56588 5.65341 7.48718C5.46978 7.40848 5.29926 7.29043 5.14187 7.13304Z"
              fill="#4A6ECF"
            />
          </svg>
        </div>
      </div>

      <div className={classes.center}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="68"
          viewBox="0 0 55 54"
          fill="none"
        >
          <path
            d="M43.0963 15.7732L29.759 29.1105L25.3132 24.6647L13.0874 36.8906"
            stroke="#00FFA3"
            stroke-width="2.85799"
          />
          <path
            d="M34.2051 15.2175H43.6523V24.6648"
            stroke="#00FFA3"
            stroke-width="2.85799"
          />
        </svg>
        <h1>{totalClients}</h1>
        <div>
          <span>{percentage}%</span>
          <p>New patients</p>
        </div>
      </div>
    </>
  );
};

export default LeftChart;
