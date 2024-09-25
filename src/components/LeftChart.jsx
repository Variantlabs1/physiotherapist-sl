import { useEffect, useState, useCallback } from "react";
import classes from "../styles/LeftChart.module.scss";
import { IoTrendingUpSharp } from "react-icons/io5";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Center, Flex, Select } from "@chakra-ui/react";
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

  // Wrap the calculateStatistics function in useCallback to memoize it
  const calculateStatistics = useCallback(() => {
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

    // Calculate percentage increase/decrease
    const percentageIncrease = (totalClients / clients.length) * 100;
    const percentageDecrease =
      ((previousPeriodClients - totalClients) / clients.length) * 100;

    setTotalClients(totalClients);
    setPercentage(Math.abs(percentageIncrease.toFixed(2)));
    setDecreasePercentage(Math.abs(percentageDecrease.toFixed(2)));
  }, [selectedPeriod, clients]); // Add dependencies here

  useEffect(() => {
    calculateStatistics();
  }, [calculateStatistics]); // Now useEffect depends on the memoized version of the function

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
        <h1>{totalClients && totalClients}</h1>
        <div className={classes.percentage}>
          <Flex>
            <span>
              <FaCaretUp color="#04FC04" />
            </span>
            <span>{percentage && percentage}%</span>
          </Flex>
          <p>New patients</p>
        </div>
      </div>
      <div className={classes.center}>
        <Center className={classes.downarrow}>
          <IoTrendingUpSharp size={40} color="red" />{" "}
        </Center>

        <h1>{totalClients && totalClients}</h1>
        <div className={classes.percentage}>
          <Flex>
            <span>
              <FaCaretDown color="#04FC04" />
            </span>
            <span>{decreasePercentage && decreasePercentage}%</span>
          </Flex>
          <p>Old patients</p>
        </div>
      </div>
    </>
  );
};

export default LeftChart;
