import React, { useEffect, useState } from "react";
import styles from "./ExercisesPage.module.scss"; // Replace with your CSS/SCSS module for styling
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import ExerciseFetcher from "../../components/data_fetch/exerciseFetcher";
import {
  collection,
  deleteDoc,
  doc,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import DeleteExercise from "./DeleteExercise";
import useDate from "../../components/useDate";
import { FaSearch } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import {
  Box,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

const ExercisesPage = ({
  clientId,
  onAddExercisesClick,
  onExerciseCardClick,
}) => {
  const date = useDate();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [isGrid, setIsGrid] = useState(false);
  // const [client,setClient] = useState(null)
  const [pageNumber, setPageNumber] = useState(1);
  const [direction, setDirection] = useState(null);
  const [lastDocument, setLastDocument] = useState(null);
  const [firstDocument, setFirstDocument] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);
  const [loading, setLoading] = useState(true);
  const [openDeleteExerciseId, setOpenDeleteExerciseId] = useState(null);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOptions, setSortOptions] = useState({
    newlyAdded: false,
    newlyAddedLast: false,
    alphabetical: false,
  });

  const toggleDeleteModal = (e, exerciseId) => {
    e.stopPropagation();
    setOpenDeleteExerciseId(
      exerciseId === openDeleteExerciseId ? null : exerciseId
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const getDefaultExercises = async () => {
      setLoading(true);
      try {
        //     const clientData = await getDocs(query(collection(db,"Users"),where("userId","==",clientId)))
        //    !clientData.empty && setClient(clientData.docs[0].data())

        if (pageNumber > 1 && lastDocument && firstDocument) {
          const pointer =
            direction === "next"
              ? startAfter(lastDocument)
              : endBefore(firstDocument);
          const Limit = direction === "next" ? limit(4) : limitToLast(4);

          const res = await getDocs(
            query(
              collection(db, "Default excercises"),
              Limit,
              orderBy("Exercise_Name"),
              pointer
            )
          );

          setExercises(res.docs.map((doc) => doc.data()));
          setFilteredExercises(res.docs.map((doc) => doc.data()));
          setLastDocument(res.docs[res.docs.length - 1]);
          setFirstDocument(res.docs[0]);
          // console.log(res.docs.map(doc=>(doc.data())));
        } else {
          const res = await getDocs(
            query(
              collection(db, "Default excercises"),
              limit(4),
              orderBy("Exercise_Name")
            )
          );
          setExercises(res.docs.map((doc) => doc.data()));
          setFilteredExercises(res.docs.map((doc) => doc.data()));
          setLastDocument(res.docs[res.docs.length - 1]);
          setFirstDocument(res.docs[0]);
          setLoading(false);
          // console.log(res.docs[res.docs.length - 1].data().Exercise_Name);
        }
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    clientId && getDefaultExercises();
  }, [clientId, pageNumber, direction]);

  const handleExercisesFetched = (fetchedExercises) => {
    setExercises(fetchedExercises);
    setFilteredExercises(fetchedExercises);
    setLoading(false);
  };

  const sortData = () => {
    const sortOptionsKeys = Object.keys(sortOptions);
    const selectedSortOptions = sortOptionsKeys.filter(
      (option) => sortOptions[option]
    );
    // console.log(selectedSortOptions);
    if (!selectedSortOptions) {
      setShowDropdown((prev) => !prev);
      return;
    }
    // Sort data based on selected options
    const sortedData = [...exercises];
    selectedSortOptions.forEach((option) => {
      switch (option) {
        case "newlyAdded":
          sortedData.sort(
            (a, b) =>
              new Date(a.assignedOn.seconds) - new Date(b.assignedOn.seconds)
          );
          break;
        case "newlyAddedLast":
          sortedData.sort(
            (a, b) =>
              new Date(b.assignedOn.seconds) - new Date(a.assignedOn.seconds)
          );
          break;
        case "alphabetical":
          sortedData.sort((a, b) =>
            a.Exercise_Name.localeCompare(b.Exercise_Name)
          );
          break;
        default:
          break;
      }
    });
    // setClients(sortedData);
    setFilteredExercises(sortedData);
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
      setFilteredExercises(exercises);
    } else {
      const filteredExercises = exercises.filter((exercise) =>
        exercise.Exercise_Name.toLowerCase().includes(
          event.target.value.toLowerCase()
        )
      );
      setFilteredExercises(filteredExercises);
    }
  };

  const handleSortApply = () => {
    sortData();
    setShowDropdown((prev) => !prev);
  };
  const toggleView = () => {
    setIsGrid(!isGrid);
  };

  const backHandler = () => {
    navigate(-1);
  };
  return (
    <div className={styles.rootExercises}>
      <div className={styles.header}>
        <div className={styles.title}>
          <p>All Exercises</p>
        </div>
        <Center fontWeight="500" className={styles.date}>
          {date}
        </Center>
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
          <div className={styles.buttons}>
            <Button
              className={styles.backButton}
              variant="outline"
              onClick={backHandler}
            >
              Back
            </Button>
            <Button
              variant="outline"
              className={styles.addExercise}
              onClick={onAddExercisesClick}
            >
              Add
            </Button>
            <div className={styles.toggle} onClick={toggleView}>
              {isGrid ? (
                <HiOutlineViewList className={styles.icon} />
              ) : (
                <HiOutlineViewGrid className={styles.icon} />
              )}
            </div>
            {!clientId && (
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
            )}
          </div>
        </div>

        <div className={styles.container}>
          {/* Render the ExerciseFetcher component to fetch data */}
          {!clientId && (
            <ExerciseFetcher onExercisesFetched={handleExercisesFetched} />
          )}
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

          {/* Render the exercises */}
          {clientId && (
            <div className={styles.arrow}>
              <div className={styles.pagination}>
                <button
                  disabled={!(pageNumber > 1 && pageNumber <= 60)}
                  onClick={() => {
                    setPageNumber((p) => p - 1);
                    setDirection("previous");
                  }}
                >
                  <FaChevronLeft size={20} />
                </button>
                <Center fontSize={["1rem", "1rem", "1rem", "1.2rem"]}>
                  {pageNumber}
                </Center>
                <button
                  disabled={!(pageNumber > 0 && pageNumber < 60)}
                  onClick={() => {
                    setPageNumber((p) => p + 1);
                    setDirection("next");
                  }}
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
          <div
            className={
              isGrid && clientId
                ? `${styles.gridContainer1} ${styles.gridContainer}`
                : isGrid
                ? styles.gridContainer
                : styles.listContainer
            }
          >
            {filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className={styles.card}
                onClick={() => onExerciseCardClick(exercise)}
              >
                {/* Exercise card content */}
                {!clientId && (
                  <img
                    className={styles.imageContainer}
                    src={exercise.thumbnailURL}
                    alt={""}
                  />
                )}
                <div
                  style={
                    clientId && { width: "100%", minHeight: "max-content" }
                  }
                  className={styles.textContainer}
                >
                  <div className={styles.titleBar}>
                    <h3>
                      {exercise.title ? exercise.title : exercise.Exercise_Name}
                    </h3>
                    {!clientId && (
                      <div className={styles.icon}>
                        <DeleteExercise
                          id={exercise.id}
                          isOpenDelete={exercise.id === openDeleteExerciseId}
                          toggleDeleteModal={(e) =>
                            toggleDeleteModal(e, exercise.id)
                          }
                          exercises={exercises}
                          setExercises={handleExercisesFetched}
                        />
                      </div>
                    )}
                  </div>
                  {/* <p>{exercise.description?exercise.description:exercise.Preparation}</p> */}
                  {isMobile ? (
                    <p>{exercise.Preparation.substring(0, 60)}...</p>
                  ) : (
                    <p>{exercise.Preparation.substring(0, 140)}...</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisesPage;
