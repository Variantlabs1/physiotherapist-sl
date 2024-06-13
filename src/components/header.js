import classes from "../styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import { HiBars3BottomLeft } from "react-icons/hi2";
import useDate from "./useDate";

const Header = ({ toggleDrawer }) => {
  const date = useDate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.rootHeader}>
      <Center onClick={toggleDrawer}>
        <HiBars3BottomLeft className={classes.icon} />
      </Center>
      <div className={classes.greet}>
        <p>{greeting}</p>
        <p className={classes.date}>{isMobile && date}</p>
      </div>
    </div>
  );
};

export default Header;
