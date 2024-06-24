import React, { useEffect, useState } from "react";
import styles from "./ClientsPage.module.scss";
import ClientFetcher from "../../components/data_fetch/clientFetcher"; // Adjust the path
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import useDate from "../../components/useDate";
import { FaSearch } from "react-icons/fa";
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
    setLoading(false);
    setClients(fetchedClients);
    setFilteredClients(fetchedClients);
  };
  // useEffect(() => {
  //   if (clientDocId) {
  //     const getClient = async () => {
  //       const client = await getDoc(doc(db, "Users", clientDocId));
  //       client.exists() && onSelectClient(client.data());
  //     };
  //     getClient();
  //   }
  // }, [clientDocId]);

  const parseDate = (dateString) => {
    // Convert date string to JavaScript Date object
    const parts = dateString.split("/");
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
    console.log(selectedSortOptions);
    if (!selectedSortOptions) {
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
          sortedData.sort((a, b) => a.userName.localeCompare(b.userName));
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
        client.userName.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredClients(filteredClients);
    }
  };

  const handleSortApply = () => {
    sortData();
    setShowDropdown((prev) => !prev);
  };
  return (
    <div className={styles.rootClients}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p>Clients List</p>
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
        <div className={styles.container}>
          {/* Render the ClientFetcher component to fetch data */}
          <ClientFetcher onClientsFetched={handleClientsFetched} />
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
          {/* Render the clients */}
          <div className={styles.listContainer}>
            {filteredClients.map((client) => (
              <div className={styles.card} key={client.userId}>
                <div className={styles.imageContainer}>
                  <img
                    className={styles.profilePicture}
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=8"
                    alt={client.userName}
                  />
                </div>

                <div className={styles.textContainer}>
                  <div className={styles.username}>
                    <p>{client.userName}</p>
                  </div>

                  <div
                    className={styles.buttons}
                    onClick={() => Navigate(`${client.userId}`)}
                    // onClick={() => onSelectClient(client)}
                  >
                    <p>View</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
