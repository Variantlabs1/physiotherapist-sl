import classes from "../styles/SideBar.module.scss";
import { MdSpaceDashboard, MdChatBubble } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiRun, BiMessageAdd } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import { Link, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Profile from "./profile";

const SideBar = ({ handleOptionClick, toggleDrawer }) => {
  const location = useLocation();
  const segments = location.pathname.split("/");
  //Array of items
  const sidebarItems = [
    {
      icon: (
        <MdSpaceDashboard
          // color={segments[1] === "Dashboard" || isMobile ? "#0D30AC" : "white"}
          color={segments[1] === "Dashboard" || "white"}
        />
      ),
      text: "Dashboard",
    },
    {
      icon: <FaUserGroup color={segments[1] === "Clients" || "white"} />,
      text: "Clients",
    },
    {
      icon: <BiRun color={segments[1] === "Exercises" || "white"} />,
      text: "Exercises",
    },
    {
      icon: <MdChatBubble color={segments[1] === "Chat" || "white"} />,
      text: "Chat",
    },
    {
      icon: <BiMessageAdd color={segments[1] === "Requests" || "white"} />,
      text: "Requests",
    },
    {
      icon: (
        <RequestQuoteOutlinedIcon
          htmlColor={segments[1] === "Billing" || "white"}
        />
      ),
      text: "Billing",
    },
    {
      icon: <IoMdSettings color={segments[1] === "Profile" || "white"} />,
      text: "Profile",
    },
  ];

  return (
    <div className={classes.rootSidebar}>
      <div className={classes.sidebar}>
        {sidebarItems.map((item, index) => (
          <Link
            to={`/${item.text}`}
            onClick={toggleDrawer}
            key={index}
            className={segments[1] === item.text ? classes.selectedOption : ""}
          >
            <div className={classes.icon}>{item.icon}</div>
            <div className={classes.option}>
              <span>{item.text}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
