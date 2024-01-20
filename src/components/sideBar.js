import classes from "../styles/SideBar.module.scss";
import { MdSpaceDashboard, MdChatBubble } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiRun, BiMessageAdd } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import { useState } from "react";

const SideBar = ({ handleOptionClick }) => {
    const [selectedOption, setSelectedOption] = useState(0);

    const handleItemClick = (index) => {
        setSelectedOption(index);
        handleOptionClick(index); // Notify the Home component of the selected option
    };

    //Array of items
    const sidebarItems = [
        {
            icon: (
                <MdSpaceDashboard
                    size={35}
                    color={selectedOption === 0 ? "#0D30AC" : "white"}
                />
            ),
            text: "Dashboard",
        },
        {
            icon: (
                <FaUserGroup
                    size={35}
                    color={selectedOption === 1 ? "#0D30AC" : "white"}
                />
            ),
            text: "Clients",
        },
        {
            icon: (
                <BiRun
                    size={35}
                    color={selectedOption === 2 ? "#0D30AC" : "white"}
                />
            ),
            text: "Exercises",
        },
        {
            icon: (
                <MdChatBubble
                    size={35}
                    color={selectedOption === 3 ? "#0D30AC" : "white"}
                />
            ),
            text: "Chat",
        },
        {
            icon: (
                <BiMessageAdd
                    size={35}
                    color={selectedOption === 4 ? "#0D30AC" : "white"}
                />
            ),
            text: "Requests",
        },
        {
            icon: (
                <RequestQuoteOutlinedIcon fontSize="large"
                    size={35}
                    htmlColor={selectedOption === 5 ? "#0D30AC" : "white"}
                />
            ),
            text: "Billing",
        },
        {
            icon: (
                <IoMdSettings
                    size={35}
                    color={selectedOption === 6 ? "#0D30AC" : "white"}
                />
            ),
            text: "Profile",
        },
    ];

    return (
        <div className={classes.rootSidebar}>
            <div className={classes.sidebar}>
                {sidebarItems.map((item, index) => (
                    <a
                        href={`/${item.text}`}
                        key={index}
                        onClick={() => handleItemClick(index)}
                        className={
                            index === selectedOption
                                ? classes.selectedOption
                                : ""
                        }
                    >
                        <div className={classes.icon}>{item.icon}</div>
                        <div className={classes.option}>
                            <span>{item.text}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
