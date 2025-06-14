import React, { useState } from "react";
import ClientFetcher from "../../components/data_fetch/clientFetcher";
import Chats from "./chats";
import { useAuth } from "../../components/data_fetch/authProvider";
import styles from "./MainChats.module.scss";
import useDate from "../../components/useDate";
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigation } from "react-router-dom";
import ImageComponent from "./components/ImageConponent";

const MainChats = () => {
  const user = useAuth();
  // const Navigation = useNavigation();
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]); // State to hold the list of clients
  const [showChat, setShowChat] = useState(false);
  const [filteredClients, setFilteredClients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    newlyAdded: false,
    newlyAddedLast: false,
    age: false,
    alphabetical: false,
  });
  const [loading, setLoading] = useState(true);
  
  const handleClientsFetched = (fetchedClients) => {
    console.log("Fetched clients in MainChats:", fetchedClients); // Debug log
    setClients(fetchedClients);
    setFilteredClients(fetchedClients);
    setLoading(false);
  };

  // console.log(user.uID);

  const handleClientSelected = (client) => {
    setSelectedClient(client);
    setShowChat(true);
  };

  const handleBackToClientList = () => {
    setSelectedClient(null); // Clear the selectedClient to go back to the client list
    setShowChat(false);
  };
  
  const parseDate = (dateString) => {
    if (!dateString) return new Date("1970-01-01");
    // Convert date string to JavaScript Date object
    const parts = dateString.split("/");
    if (parts.length !== 3) return new Date("1970-01-01");
    const day = parseInt(parts[0]);
    const month = parts[1];
    const year = parseInt(parts[2]);
    const date = new Date(`${month} ${day}, ${year}`); // Months are 0-indexed in JavaScript Date object
    return date;
  };
  
  const sortData = () => {
    const sortOptionsKeys = Object.keys(sortOptions);
    const selectedSortOptions = sortOptionsKeys.filter(
      (option) => sortOptions[option]
    );
    if (selectedSortOptions.length === 0) {
      setShowDropdown((prev) => !prev);
      return;
    }
    // Sort data based on selected options
    const sortedData = [...clients];
    selectedSortOptions.forEach((option) => {
      switch (option) {
        case "newlyAdded":
          sortedData.sort(
            (a, b) => new Date(a.accCreated) - new Date(b.accCreated)
          );
          break;
        case "newlyAddedLast":
          sortedData.sort(
            (a, b) => new Date(b.accCreated) - new Date(a.accCreated)
          );
          break;
        case "age":
          sortedData.sort(
            (a, b) => parseDate(a.userDOB) - parseDate(b.userDOB)
          );
          break;
        case "alphabetical":
          sortedData.sort((a, b) => a.userName?.localeCompare(b.userName));
          break;
        default:
          break;
      }
    });
    // setClients(sortedData);
    setFilteredClients(sortedData);
  };

  const handleSortChange = (event) => {
    const { name, checked } = event.target;
    const updatedSortOptions = { ...sortOptions };
    if (checked) {
      // Set the selected checkbox to true
      updatedSortOptions[name] = true;

      // Deselect all other checkboxes
      Object.keys(updatedSortOptions).forEach((option) => {
        if (option !== name) {
          updatedSortOptions[option] = false;
        }
      });
    } else {
      // If the checkbox is being unchecked, set its state to false
      updatedSortOptions[name] = false;
    }
    setSortOptions(updatedSortOptions);
  };

  const handleSearchInputChange = (event) => {
    if (!event.target.value) {
      setFilteredClients(clients);
    } else {
      const filteredClients = clients.filter((client) =>
        client.userName?.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredClients(filteredClients);
    }
  };

  const handleSortApply = () => {
    sortData();
    setShowDropdown((prev) => !prev);
  };

  return (
    <div className={styles.rootChats}>
      <div className={styles.container}>
        <div>
          <ClientFetcher onClientsFetched={handleClientsFetched} />
          <div className={styles.header}>
            <div className={styles.title}>
              <p>Clients List</p>
            </div>
          </div>
          <div className={styles.outerContainer}>
            <div className={styles.searchBarNotificationContainer}>
              <div className={styles.searchBarContainer}>
                <div className={styles.searchIconContainer}>
                  <FaSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className={styles.searchInput}
                  onChange={handleSearchInputChange}
                />
              </div>
              <Center className={styles.notificationIconContainer}>
                <Text
                  color="white"
                  cursor="pointer"
                  onClick={() => {
                    setShowDropdown((prev) => !prev);
                  }}
                >
                  Sort
                </Text>
                {showDropdown && (
                  <VStack className={styles.dropDown}>
                    <Flex className={styles.dropDownContent}>
                      <input
                        type="checkbox"
                        name="newlyAdded"
                        checked={sortOptions.newlyAdded}
                        onChange={handleSortChange}
                      />
                      <p>Newly Added First</p>
                    </Flex>
                    <Flex className={styles.dropDownContent}>
                      <input
                        type="checkbox"
                        name="newlyAddedLast"
                        checked={sortOptions.newlyAddedLast}
                        onChange={handleSortChange}
                      />
                      <p>Newly Added Last</p>
                    </Flex>
                    <Flex className={styles.dropDownContent}>
                      <input
                        type="checkbox"
                        name="age"
                        checked={sortOptions.age}
                        onChange={handleSortChange}
                      />
                      <p>Age Young to Old</p>
                    </Flex>
                    <Flex className={styles.dropDownContent}>
                      <input
                        type="checkbox"
                        name="alphabetical"
                        checked={sortOptions.alphabetical}
                        onChange={handleSortChange}
                      />
                      <p>Alphabetical</p>
                    </Flex>
                    <hr />
                    <div>
                      <Button
                        variant="outline"
                        className={styles.button}
                        onClick={handleSortApply}
                      >
                        Apply
                      </Button>
                    </div>
                  </VStack>
                )}
              </Center>
            </div>
            {loading && (
              <Center>
                <Spinner
                  color="#0d30ac"
                  size="xl"
                  position="absolute"
                  top="50%"
                  zIndex={15}
                />
              </Center>
            )}
            <div className={styles.cardsContainer}>
              {filteredClients.map((client, index) => {
                console.log("Rendering client in MainChats:", client); // Debug log
                return (
                  <div key={client.userId || index} className={styles.card}>
                    <div className={styles.imageContainer}>
                      {client.userProfilePhoto ? (
                        <img
                          src={client.userProfilePhoto}
                          alt={client.userName || "Client"}
                          className={styles.profilePicture}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover"
                          }}
                          onError={(e) => {
                            console.log("Image failed to load in MainChats:", client.userProfilePhoto);
                            e.target.src = require("../../assets/vectorProfile.png");
                          }}
                          onLoad={() => {
                            console.log("Image loaded successfully in MainChats:", client.userProfilePhoto);
                          }}
                        />
                        // Alternative: Use ImageComponent if direct img doesn't work
                        // <ImageComponent
                        //   imagePath={client.userProfilePhoto}
                        //   className={styles.profilePicture}
                        // />
                      ) : (
                        <img
                          src={require("../../assets/vectorProfile.png")}
                          alt={client.userName || "Client"}
                          className={styles.profilePicture}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            objectFit: "cover"                          }}
                        />
                      )}
                    </div>

                    <div className={styles.textContainer}>
                      <div className={styles.username}>
                        <p>{client.userName || "Unnamed"}</p>
                      </div>

                      <div className={styles.buttons}>
                        <Link to={`/Chat/${client.userId}`}>Chat</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChats;