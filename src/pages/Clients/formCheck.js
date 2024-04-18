import { useEffect, useState } from "react";
import classes from "./FormCheck.module.scss";
import "react-day-picker/dist/style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { PiPlayCircleLight } from "react-icons/pi";

import { Box, Center, Flex, Text, Button, VStack } from "@chakra-ui/react";
import video from "../../assets/push_up.mp4";
import useDate from "../../components/useDate";
import { FaSearch } from "react-icons/fa";

const FormCheck = ({ clientId, onBackClick }) => {
  const date = useDate();
  const [resultData, setResultsData] = useState([]);
  const [filteredResultData, setFilteredResultsData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    newlyAdded: false,
    newlyAddedLast: false,
  });
  useEffect(() => {
    const getFormCheckData = async () => {
      // const q = query(collection(db,"Form Check Tool"),where('userId',"==",clientId))
      try {
        const userDocRef = doc(db, "Form Check Tool", clientId);

        // Reference to the 'results' subcollection for the specified user
        const resultsCollectionRef = collection(userDocRef, "results");

        // Get all documents in the 'results' subcollection for the specified user
        const resultsQuerySnapshot = await getDocs(resultsCollectionRef);

        const resultsDataArray = resultsQuerySnapshot.docs.map((resultDoc) =>
          resultDoc.data()
        );
        console.log(resultsDataArray);
        setResultsData(resultsDataArray);
        setFilteredResultsData(resultsDataArray);
      } catch (error) {
        console.error("Error getting documents:", error);
      }
    };

    // Cleanup function to unsubscribe when the component is unmounted or clientId changes
    getFormCheckData();
  }, [clientId]);

  const loadVideo = () => {
    // Assuming the video file is in the 'videos' directory

    // Create a new tab with the video
    const newTab = window.open("", "_blank");

    // Write the video element to the new tab
    newTab.document.write(`
                <video width="100%" height="100%" controls>
                    <source src="${video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `);
  };

  const handleSearchInputChange = (event) => {
    if (!event.target.value) {
      setFilteredResultsData(resultData);
    } else {
      const filteredData = resultData.filter((data) =>
        data.exercise.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredResultsData(filteredData);
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
    const sortedData = [...resultData];
    selectedSortOptions.forEach((option) => {
      switch (option) {
        case "newlyAdded":
          sortedData.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "newlyAddedLast":
          sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        default:
          break;
      }
    });
    // setClients(sortedData);
    setFilteredResultsData(sortedData);
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
  const handleSortApply = () => {
    sortData();
    setShowDropdown((prev) => !prev);
  };
  return (
    <div className={classes.exerciseDetailsContainer}>
      <div className={classes.heading}>
        <div className={classes.title}>
          <p>Form Check</p>
        </div>
        <Center fontWeight="500">{date}</Center>
      </div>
      <div className={classes.outerContainer}>
        <div className={classes.searchBarNotificationContainer}>
          <div className={classes.searchBarContainer}>
            <div className={classes.searchIconContainer}>
              <FaSearch size={20} />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={classes.searchInput}
              onChange={handleSearchInputChange}
            />
          </div>
          <div className={classes.button} onClick={onBackClick}>
            <p>Back</p>
          </div>
          <Center className={classes.notificationIconContainer}>
            <Text
              color="white"
              onClick={() => {
                setShowDropdown((prev) => !prev);
              }}
            >
              Sort
            </Text>
            {showDropdown && (
              <VStack className={classes.dropDown}>
                <Flex className={classes.dropDownContent}>
                  <input
                    type="checkbox"
                    name="newlyAdded"
                    checked={sortOptions.newlyAdded}
                    onChange={handleSortChange}
                  />
                  <p>Newly Added First</p>
                </Flex>
                <Flex className={classes.dropDownContent}>
                  <input
                    type="checkbox"
                    name="newlyAddedLast"
                    checked={sortOptions.newlyAddedLast}
                    onChange={handleSortChange}
                  />
                  <p>Newly Added Last</p>
                </Flex>
                <hr />
                <div>
                  <Button
                    variant="outline"
                    className={classes.button}
                    onClick={handleSortApply}
                  >
                    Apply
                  </Button>
                </div>
              </VStack>
            )}
          </Center>
        </div>

        <div className={classes.container}>
          {filteredResultData.map((data, index) => (
            <Flex key={index} className={classes.card}>
              <div className={classes.tag}>
                <p className={classes.exerciseName}>{data.exercise}</p>

                <div className={classes.title}>Muscles Involved</div>
                <div className={classes.musclesInvolved}>
                  {data["Muscles Involved"]
                    .split(",")
                    .map((muscle, muscleIndex) => (
                      <Text key={muscleIndex} className={classes.musclesName}>
                        {muscle.trim()}
                      </Text>
                    ))}
                </div>
              </div>
              <div className={classes.playButton}>
                <div onClick={loadVideo} target="_blank" rel="noreferrer">
                  <PiPlayCircleLight className={classes.icon} />
                  <p>Play</p>
                </div>
              </div>
            </Flex>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormCheck;
