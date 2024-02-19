import classes from "../styles/SideBar.module.scss";
import { MdSpaceDashboard, MdChatBubble } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiRun, BiMessageAdd } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Profile from "./profile";

const SideBar = ({ handleOptionClick }) => {
    const location = useLocation();
    const segments = location.pathname.split('/');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);


    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 430);
        };
    
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Remove event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    //Array of items
    const sidebarItems = [
        {
            icon: (
                <MdSpaceDashboard
                    size={35}
                    color={segments[1] === 'Dashboard' || isMobile ? "#0D30AC" : "white"}
                />
            ),
            text: "Dashboard",
        },
        {
            icon: (
                <FaUserGroup
                    size={35}
                    color={segments[1] === "Clients" || isMobile ? "#0D30AC" : "white"}
                />
            ),
            text: "Clients",
        },
        {
            icon: (
                <BiRun
                    size={35}
                    color={segments[1] === "Exercises" || isMobile  ? "#0D30AC" : "white"}
                />
            ),
            text: "Exercises",
        },
        {
            icon: (
                <MdChatBubble
                    size={35}
                    color={segments[1] === "Chat" || isMobile  ? "#0D30AC" : "white"}
                />
            ),
            text: "Chat",
        },
        {
            icon: (
                <BiMessageAdd
                    size={35}
                    color={segments[1] === "Requests" || isMobile  ? "#0D30AC" : "white"}
                />
            ),
            text: "Requests",
        },
        {
            icon: (
                <RequestQuoteOutlinedIcon fontSize="large"
                    size={35}
                    htmlColor={segments[1] === "Billing" || isMobile  ? "#0D30AC" : "white"}
                />
            ),
            text: "Billing",
        },
        {
            icon: (
                <IoMdSettings
                    size={35}
                    color={segments[1] === "Profile" || isMobile  ? "#0D30AC" : "white"}
                />
            ),
            text: "Profile",
        },
    ];

    return (
        <div className={classes.rootSidebar}>
            <div className={classes.sidebar}>
            {sidebarItems
                    .filter(item => !isMobile || (item.text !== 'Requests' && item.text !== 'Billing'))
                    .map((item, index) => (
                        <Link
                            to={`/${item.text}`}
                            key={index}
                            className={
                                segments[1] === item.text
                                    ? classes.selectedOption
                                    : ""
                            }
                        >
                            {isMobile && item.text === "Profile" ? <Profile /> :
                            <div className={classes.icon}>{item.icon}</div>}
                            {!isMobile && <div className={classes.option}>
                                    <span>{item.text}</span>
                                </div>}
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default SideBar;
