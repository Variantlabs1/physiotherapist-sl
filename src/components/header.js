import classes from "../styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import { HiBars3BottomLeft } from "react-icons/hi2";

const Header = ({ toggleDrawer }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      updateGreeting();
    }, 1000); // Update the date and greeting every second (1000ms)

    // Cleanup function to stop the interval when the component unmounts
    return () => clearInterval(interval);
  });

  useEffect(() => {
    updateGreeting();
  }); // Run the initial updateGreeting when the component mounts

  const updateGreeting = () => {
    const currentHour = currentDate.getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning!");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
    }
  };

  return (
    <div className={classes.rootHeader}>
      <Center onClick={toggleDrawer}>
        <HiBars3BottomLeft className={classes.icon} />
      </Center>
      <div className={classes.greet}>
        <p>{greeting}</p>
      </div>
    </div>
  );
};

export default Header;
