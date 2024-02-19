import styled from "styled-components";
import classes from "../styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Center, HStack, Text, VStack } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import { BiMessageAdd } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from ".././firebase";

const Header = () => {
    const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [showDropdown, setShowDropdows] = useState(false);

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

  // Function to format the date in the desired format
  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    const formattedDate = date.toLocaleString("en-IN", options);
    return formattedDate.replace(/-/g, " "); // Remove all dashes from the formatted date
  };

  const formattedDate = formatDate(currentDate);

  const handleDropdown = () => {
    setShowDropdows((prev) => !prev);
  };
  const handleLogout = () => {
    signOut(auth)
        .then(() => {
            
            // Logout successful, navigate to the login page
            navigate("/login"); // Assuming your login page route is '/login'
        })
        .catch((error) => {
            // Handle any errors that occurred during logout
            console.log("Logout Error:", error);
        });
};  
  return (
    <div className={classes.rootHeader}>
      <div className={classes.greet}>
        <p className={classes.greeting}>{greeting}</p>

        <div className={classes.time}>
          <span>{formattedDate}</span>
          <span>{currentDate.toLocaleTimeString()}</span>
        </div>
      </div>
      <Center onClick={handleDropdown}>
        {showDropdown ? (
          <IoClose className={classes.icon} />
        ) : (
          <FaBars className={classes.icon} />
        )}
      </Center>

      {showDropdown && <VStack className={classes.dropdown}>
        <Link to="Billing">
          <HStack className={classes.menu}>
            <Center className={classes.menuicon}>
              <RequestQuoteOutlinedIcon />
            </Center>
            <Text>Billing</Text>
          </HStack>
        </Link>
        <Link to="Requests">
          <HStack className={classes.menu}>
            <Center className={classes.menuicon}>
              <BiMessageAdd />
            </Center>
            <Text>Requests</Text>
          </HStack>
        </Link>
        <div onClick={handleLogout}>
          <HStack className={classes.menu}>
            <Center className={classes.menuicon}>
              <MdLogout />
            </Center>
            <Text>Logout</Text>
          </HStack>
        </div>
      </VStack>}
    </div>
  );
};

export default Header;
