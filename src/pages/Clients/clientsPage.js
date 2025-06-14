import React, { useState } from "react";
import styles from "./ClientsPage.module.scss";
import ClientFetcher from "../../components/data_fetch/clientFetcher";
import useDate from "../../components/useDate";
import { FaSearch } from "react-icons/fa";
import {
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ImageComponent from "../Chat/components/ImageConponent";

const ClientsPage = () => {
  const date = useDate();
  const Navigate = useNavigate();
  const [clients, setClients] = useState([]);
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
    console.log("Fetched clients in ClientsPage:", fetchedClients); // Debug log
    setLoading(false);
    setClients(fetchedClients);
    setFilteredClients(fetchedClients);
  };

  const parseDate = (dateString) => {
    if (!dateString) return new Date("1970-01-01");
    const parts = dateString.split("/");
    if (parts.length !== 3) return new Date("1970-01-01");
    const [day, month, year] = parts;
    return new Date(`${month} ${day}, ${year}`);
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
          sortedData.sort((a, b) =>
            a.userName?.localeCompare(b.userName)
          );
          break;
        default:
          break;
      }
    });

    setFilteredClients(sortedData);
  };

  const handleSortChange = (event) => {
    const { name, checked } = event.target;
    const updatedSortOptions = { ...sortOptions };

    if (checked) {
      updatedSortOptions[name] = true;
      Object.keys(updatedSortOptions).forEach((option) => {
        if (option !== name) updatedSortOptions[option] = false;
      });
    } else {
      updatedSortOptions[name] = false;
    }

    setSortOptions(updatedSortOptions);
  };

  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (!searchValue) {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter((client) =>
        client.userName?.toLowerCase().includes(searchValue)
      );
      setFilteredClients(filtered);
    }
  };

  const handleSortApply = () => {
    sortData();
    setShowDropdown(false);
  };

  return (
    <div className={styles.rootClients}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p>Clients Listing</p>
        </div>
        <Center fontWeight="500">{date}</Center>
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
              onClick={() => setShowDropdown((prev) => !prev)}
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

        <div className={styles.container}>
          <ClientFetcher onClientsFetched={handleClientsFetched} />
          {loading ? (
            <Box minH="60vh">
              <Center>
                <Spinner
                  color="#0d30ac"
                  size="xl"
                  position="relative"
                  zIndex={15}
                />
              </Center>
            </Box>
          ) : (
            <div className={styles.listContainer}>
              {filteredClients.length === 0 ? (
                <Center w="100%" p={10}>
                  <Text>No clients found.</Text>
                </Center>
              ) : (
                filteredClients.map((client) => {
                  console.log("Rendering client:", client); // Debug log
                  return (
                    <div
                      className={styles.card}
                      key={client.userId || Math.random()}
                    >
                      <div className={styles.imageContainer}>
                        {client.userProfilePhoto ? (
                          <img
                            src={client.userProfilePhoto}
                            alt={client.userName || "Client"}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover"
                            }}
                            onError={(e) => {
                              console.log("Image failed to load in ClientsPage:", client.userProfilePhoto);
                              e.target.src = require("../../assets/vectorProfile.png");
                            }}
                            onLoad={() => {
                              console.log("Image loaded successfully in ClientsPage:", client.userProfilePhoto);
                            }}
                          />
                          // Alternative: Use ImageComponent if direct img doesn't work
                          // <ImageComponent imagePath={client.userProfilePhoto} />
                        ) : (
                          <img
                            src={require("../../assets/vectorProfile.png")}
                            alt={client.userName || "Client"}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover"
                            }}
                          />
                        )}
                      </div>

                      <div className={styles.textContainer}>
                        <div className={styles.username}>
                          <p>{client.userName || "Unnamed"}</p>
                        </div>

                        <div
                          className={styles.buttons}
                          onClick={() => Navigate(`${client.userId || ""}`)}
                        >
                          <p>View</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;