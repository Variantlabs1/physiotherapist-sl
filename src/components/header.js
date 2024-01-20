import styled from "styled-components";
import classes from "../styles/Header.module.scss";
import { useState, useEffect } from "react";

const Header = () => {
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

    return (
        <div className={classes.rootHeader}>
            <div className={classes.greet}>
                <p className={classes.greeting}>{greeting}</p>

                <div className={classes.time}>
                    <span>{formattedDate}</span>
                    <span>{currentDate.toLocaleTimeString()}</span>
                </div>
            </div>

            {/* <div className={classes.functionalities}>
                <div className={classes.search}>
                    <div className={classes.searchbar}>
                        <RiSearchLine
                            className={classes.searchIcon}
                            color="#4371CB80"
                            size={30}
                        />
                        <input type="text" placeholder="Search" />
                    </div>
                </div>

                <div className={classes.notifications}>
                    <MdNotifications size={40} color="#0d30ac" />
                </div>
            </div> */}


        </div>
    );
};

export default Header;


const Right = styled.div`
    display: flex;
    align-items: center;
    padding-right: 65px;
    gap: 30px;
`
const Input = styled.span`
    display: flex;
    align-items: center;
    background-color: white;
    gap: 5px;
    height: 40px;
    padding: 0px 15px;
    border-radius: 40px;
    &>input{
      border: none;
      width: 10vw;
      font-size: 16px;
      background-color: transparent;
      &:focus{
        outline: none;
      }
    }
`

const Notifications = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: white;
    border-radius: 50%;
`
