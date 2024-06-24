import React, { useContext, useEffect, useState } from "react";
import styles from "./ClientsRequest.module.scss";
import ClientRequestFetcher from "../../components/data_fetch/clientRequestFetcher"; // Adjust the path
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  serverTimestamp,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from "../../components/data_fetch/authProvider";
import styled from "styled-components";
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import useDate from "../../components/useDate";
import { FaSearch } from "react-icons/fa";

const ClientsRequest = () => {
  const date = useDate();
  const { user } = useContext(AuthContext);
  const [clients, setClients] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filteredClients, setFilteredClients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    newlyAdded: false,
    newlyAddedLast: false,
  });
  const [loading, setLoading] = useState(true);

  const handleClientsFetched = (fetchedClients) => {
    setLoading(false);
    setClients(fetchedClients);
    setFilteredClients(fetchedClients);
  };

  const findDocumentId = async (userID) => {
    // console.log(userID);
    try {
      const usersRef = collection(db, "Users");
      const q = query(usersRef, where("userId", "==", userID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        return userDocRef.id; // Get the document ID
      } else {
        console.log("Client document not found for userID", userID);
        return null;
      }
    } catch (error) {
      console.error("Error finding document ID:", error);
      return null;
    }
  };

  const handleAcceptClient = async (userID) => {
    const documentId = await findDocumentId(userID);
    if (documentId) {
      try {
        const q = query(
          collection(db, "physiotherapist"),
          where("physiotherapistId", "==", user.uid)
        );
        const getPhysio = await getDocs(q);

        const physioRef = getPhysio.docs[0].ref;

        await updateDoc(physioRef, {
          clientsList: arrayUnion({
            clientAcceptedOn: Timestamp.now(),
            clientId: userID,
          }),
        });
        const userDocRef = doc(db, "Users", documentId);
        await updateDoc(userDocRef, { verified: true });
        //  update the clients list field in  the physiotherapist document
        console.log("Client accepted successfully!");
        setRefreshKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error("Error accepting client:", error);
      }
    } else {
      console.log(documentId);
    }
  };

  const handleDeclineClient = async (userID) => {
    const documentId = await findDocumentId(userID);
    if (documentId) {
      try {
        const userDocRef = doc(db, "Users", documentId);
        await updateDoc(userDocRef, { referralCode: "" });
        console.log("Client declined successfully!");
        setRefreshKey((prevKey) => prevKey + 1);
      } catch (error) {
        console.error("Error declining client:", error);
      }
    }
  };
  const sortData = () => {
    const sortOptionsKeys = Object.keys(sortOptions);
    const selectedSortOptions = sortOptionsKeys.filter(
      (option) => sortOptions[option]
    );
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
    <div className={styles.rootExercises}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p>Client's Requests</p>
        </div>
        <Center fontWeight="500" className={styles.date}>
          {date}
        </Center>
      </div>

      <div className={styles.container}>
        <ClientRequestFetcher
          key={refreshKey}
          onClientsFetched={handleClientsFetched}
        />
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
                    <p>New Requests First</p>
                  </Flex>
                  <Flex className={styles.dropDownContent}>
                    <input
                      type="checkbox"
                      name="newlyAddedLast"
                      checked={sortOptions.newlyAddedLast}
                      onChange={handleSortChange}
                    />
                    <p>Old Requests First</p>
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
          <div className={styles.listContainer}>
            {filteredClients.length > 0
              ? filteredClients.map((client) => (
                  <div className={styles.card} key={client.userID}>
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.profilePicture}
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=8"
                        alt={client.userName}
                      />

                      <div className={styles.infoDiv}>
                        <Flex className={styles.info}>
                          <p className={styles.name}>{client.userName}</p>
                          <p>{client.userEmail}</p>
                        </Flex>
                        <div className={styles.info1}>
                          <p>{client.accCreated}</p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.buttons}>
                      <div
                        className={styles.accept}
                        onClick={() => handleAcceptClient(client.userId)}
                      >
                        Accept
                      </div>
                      <div
                        className={styles.decline}
                        onClick={() => handleDeclineClient(client.userId)}
                      >
                        Decline
                      </div>
                    </div>
                  </div>
                ))
              : !loading && <Title>No Requests! </Title>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsRequest;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
  width: 100%;
  margin-top: 150px;
  color: #0d1dac;
`;
