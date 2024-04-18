import { useContext, useEffect, useState } from "react";
import classes from "../styles/LeftChart.module.scss";
import { AuthContext } from "./data_fetch/authProvider";
import { IoTrendingUpSharp } from "react-icons/io5";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Center, Flex, Select } from "@chakra-ui/react";
import moment from "moment";
import { css } from "@emotion/react";

const customStyles = css`
  outline: none;
  border: none;
  box-shadow: none;
  color: #0d30ac;
  border-radius: 20px;
  background-color: white;
  font-weight: 500;
  height: 4.5vh;
`;

const LeftChart = ({ clients }) => {
  // const { user } = useContext(AuthContext);
  const [selectedPeriod, setSelectedPeriod] = useState("lastWeek");
  const [totalClients, setTotalClients] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [decreasePercentage, setDecreasePercentage] = useState(0);
  // const [clients, setClients] = useState([]);
  // useEffect(() => {
  // const  calculatePercentageChange = async (startDate, endDate) => {
  //   const today = new Date();
  //   const sun = new Date(
  //     new Date(today).setDate(today.getDate() - today.getDay())
  //   );
  //   // console.log(sun)
  //   const q = query(
  //     collection(db, "physiotherapist"),
  //     where("physiotherapistId", "==", user?.uid)
  //   );
  //   const getPhysio = await getDocs(q);
  //   const physioData = getPhysio.docs[0].data();
  //   if (physioData.clientsList) {
  //     setTotalClients(physioData.clientsList?.length);
  //     const lastWeekClients = physioData.clientsList?.filter(
  //       (c) => c.clientAcceptedOn?.toDate() >= sun
  //     );
  //     const newClientsPercent =
  //       (lastWeekClients?.length / physioData.clientsList.length) * 100;
  //       const decreasePercent = 100 - newClientsPercent;
  //     setDecreasePercentage(decreasePercent);
  //     setPercentage(newClientsPercent);

  //   }
  // };
  //   const calculatePercentageChange = async (startDate, endDate) => {
  //     // Count the number of clients added within the selected period

  //     if (physioData.clientsList) {
  //       setTotalClients(physioData.clientsList?.length);
  //       const currentDate = new Date();
  //       const endOfWeek = new Date(
  //         currentDate.getFullYear(),
  //         currentDate.getMonth(),
  //         currentDate.getDate() - currentDate.getDay()
  //       );
  //       const startOfWeek = new Date(
  //         endOfWeek.getFullYear(),
  //         endOfWeek.getMonth(),
  //         endOfWeek.getDate() - 6
  //       );

  //       // Filter client data for the last week
  //       const clientsLastWeek = physioData.clientsList.filter((client) => {
  //         const clientDate = client.clientAcceptedOn.toDate();
  //         return clientDate >= startOfWeek && clientDate <= endOfWeek;
  //       });

  //       // Count the number of clients for the last week
  //       const numClientsLastWeek = clientsLastWeek.length;

  //       // Calculate the start and end dates of the week before last week
  //       const endOfPreviousWeek = new Date(
  //         startOfWeek.getFullYear(),
  //         startOfWeek.getMonth(),
  //         startOfWeek.getDate() - 1
  //       );
  //       const startOfPreviousWeek = new Date(
  //         endOfPreviousWeek.getFullYear(),
  //         endOfPreviousWeek.getMonth(),
  //         endOfPreviousWeek.getDate() - 6
  //       );

  //       // Filter client data for the week before last week
  //       const clientsPreviousWeek = physioData.clientsList.filter((client) => {
  //         const clientDate = client.clientAcceptedOn.toDate();
  //         return (
  //           clientDate >= startOfPreviousWeek && clientDate <= endOfPreviousWeek
  //         );
  //       });

  //       // Count the number of clients for the week before last week
  //       const numClientsPreviousWeek = clientsPreviousWeek.length;

  //       // Calculate the percentage increase and decrease
  //       const percentageIncrease =
  //         numClientsPreviousWeek !== 0
  //           ? ((numClientsLastWeek - numClientsPreviousWeek) /
  //               numClientsPreviousWeek) *
  //             100
  //           : 0;
  //       const percentageDecrease =
  //         numClientsPreviousWeek !== 0
  //           ? ((numClientsPreviousWeek - numClientsLastWeek) /
  //               numClientsPreviousWeek) *
  //             100
  //           : 0;

  //       // setDecreasePercentage(percentageDecrease);
  //       // setPercentage(percentageIncrease);
  //     }
  //   };
  //   const endDate = moment();
  //   let startDate;
  //   switch (selectedPeriod) {
  //     case "lastWeek":
  //       startDate = moment().subtract(7, "days");
  //       setPercentage(0);
  //       setDecreasePercentage(0);
  //       break;
  //     case "lastMonth":
  //       startDate = moment().subtract(1, "months");
  //       setPercentage(25);
  //       setDecreasePercentage(0);
  //       break;
  //     case "lastYear":
  //       startDate = moment().subtract(1, "years");
  //       setPercentage(65);
  //       setDecreasePercentage(20);
  //       break;
  //     case "fiveYears":
  //       startDate = moment().subtract(5, "years");
  //       break;
  //     default:
  //       startDate = moment().subtract(7, "days");
  //   }
  //   user?.uid && calculatePercentageChange(startDate, endDate);
  // }, [selectedPeriod, user]);
  const calculateStatistics = () => {
    // Calculate start and end dates for the selected period
    const endDate = new Date();
    let startDate;
    if (selectedPeriod === "lastWeek") {
      startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (selectedPeriod === "lastMonth") {
      startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (selectedPeriod === "lastYear") {
      startDate = new Date(endDate.getTime() - 365 * 24 * 60 * 60 * 1000);
    }
    // Filter clientList based on selected period
    const filteredClients = clients.filter((client) => {
      const clientAssignedOn = client.clientAcceptedOn.toDate();
      return clientAssignedOn >= startDate && clientAssignedOn <= endDate;
    });

    const totalClients = filteredClients.length;

    // Calculate previous period clients
    const previousPeriodClients = clients.filter((client) => {
      const clientAssignedOn = client.clientAcceptedOn.toDate();
      return clientAssignedOn < startDate;
    }).length;

    console.log(previousPeriodClients);
    // Calculate percentage increase/decrease
    const percentageIncrease = (totalClients / clients.length) * 100;
    const percentageDecrease =
      ((previousPeriodClients - totalClients) / clients.length) * 100;

    setTotalClients(totalClients);
    setPercentage(Math.abs(percentageIncrease.toFixed(2)));
    setDecreasePercentage(Math.abs(percentageDecrease.toFixed(2)));
  };

  useEffect(() => {
    calculateStatistics();
  }, [selectedPeriod]);

  return (
    <>
      <div className={classes.top}>
        <p>Clients</p>
        <div>
          <Select
            css={customStyles}
            icon={<FaCaretDown color="#0d30ac" />}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="lastYear">Last Year</option>
            {/* <option value="fiveYears">Last Five Years</option> */}
          </Select>
        </div>
      </div>

      <div className={classes.center}>
        <Center>
          <IoTrendingUpSharp size={40} color="#04FC04" />{" "}
        </Center>
        <h1>{totalClients}</h1>
        <div className={classes.percentage}>
          <Flex>
            <Center>
              <FaCaretUp color="#04FC04" />
            </Center>
            <span>{percentage}%</span>
          </Flex>
          <p>New patients</p>
        </div>
      </div>
      <div className={classes.center}>
        <Center className={classes.downarrow}>
          <IoTrendingUpSharp size={40} color="red" />{" "}
        </Center>

        <h1>{totalClients}</h1>
        <div className={classes.percentage}>
          <Flex>
            <Center>
              <FaCaretDown color="#04FC04" />
            </Center>
            <span>{decreasePercentage}%</span>
          </Flex>
          <p>Old patients</p>
        </div>
      </div>
    </>
  );
};

export default LeftChart;
