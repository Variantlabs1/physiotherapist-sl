import { useEffect, useState } from "react";
import classes from "./FormCheck.module.scss";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {  getDoc, doc, onSnapshot,} from "firebase/firestore";
import { db } from "../../firebase";
const images = [
    "https://images.pexels.com/photos/4058411/pexels-photo-4058411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6111621/pexels-photo-6111621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const FormCheck = ({clientId, onBackClick }) => {
    const musclesArray = ["Hands", "Legs", "Hip Flexors"];
    const [imageSrc, setImageSrc] = useState('');
    const [data,setData] = useState({})

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date);
    };

    const imageLink =
        "https://images.pexels.com/photos/6453414/pexels-photo-6453414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";



        useEffect(() => {
            const unsubscribe = onSnapshot(doc(db, "Form Check Tool", clientId), (docSnapshot) => {
              if (docSnapshot.exists()) {
                setData(docSnapshot.data());
              } else {
                // Handle the case where the document doesn't exist
                // setData(null);
                console.log("no data")
              }
            });
        
            // Cleanup function to unsubscribe when the component is unmounted or clientId changes
            return () => unsubscribe();
          }, [clientId]);

  useEffect(() => {
    // Create an Image element
    const img = new Image();

    // Set the src attribute with the data URL
    img.src = "data:image/jpg;base64," + data.skeleton_image;

    // Wait for the image to load
    img.onload = () => {
      // Update the image source state
      setImageSrc(img.src);
    //   console.log(img.src)
    };

    // Clean up the event listener when the component unmounts
    return () => {
        img.onload = null;
      };
  }, [data]);

  console.log(data);

    return (
        <div className={classes.exerciseDetailsContainer}>

            <div className={classes.header}>
                <div className={classes.exerciseTitle}>
                    <p>Form Check</p>
                </div>

                <div className={classes.buttons} onClick={onBackClick}>
                    <div className={classes.button}>
                        <p>Back</p>
                    </div>
                </div>
            </div>

            <div className={classes.container}>
                <div className={classes.top}>
                    <div className={classes.left}>
                        <div className={classes.thumbnailContainer}>
                            {/* <img
                                className={classes.thumbnailImage}
                                src={imageSrc?imageSrc:imageLink}
                                alt="Exercise Thumbnail"
                            /> */}
                                <Carousel useKeyboardArrows={true} renderIndicator={() => null}>
                            {images.map((URL, index) => (
                                <div className={classes.frame}>
                                    <img
                                        alt="exercises"
                                        src={URL}
                                        key={index}
                                    />
                                    {/* <h2>TEST</h2> */}
                                   <div className={classes.musclesList}>
                                    <h3 className={classes.musclesInvolved}>Muscle Involved:</h3>
                                    <h2 className={classes.musclesInvolved}>{data.muscles_involved?data.muscles_involved[index]:'No data'}</h2>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                        </div>
                    </div>

                    <div className={classes.right}>
                        <div className={classes.calendar}>
                            <DayPicker 
                                selected={selectedDate}
                                onDayClick={handleDateChange}
                                // format="MMMM DD, YYYY"
                            />
                        </div>
                        {selectedDate && (
                            <p>You selected {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        )}
                        <div className={classes.details}>
                            {/* <div className={classes.musclesInvolvedContainer}>
                                <div className={classes.musclesInvolvedTitle}>
                                    <p>Muscles Involved</p>
                                </div>
                                <div className={classes.musclesList}>
                                    {data.muscles_involved?.length>0?
                                    data.muscles_involved?.map((muscles, index) => (
                                        <div
                                            key={index}
                                            className={classes.musclesInvolved}
                                        >
                                            <p >{muscles}</p>

                                        </div>
                                    )):
                                    <p  className={classes.musclesInvolved}>No data available</p>
                                    }
                                </div>
                            </div> */}
                            <div className={classes.accuracyContainer}>
                                <div className={classes.accuracyTitle}>
                                    <p>Accuracy</p>
                                </div>
                                <div className={classes.accuracyList}>
                                    <div className={classes.accuracy}>
                                        {data.Accuracy?
                                        <p>{data.Accuracy.split('').slice(0,5)} %</p>
                                      : <p>No data available</p>
                                    }
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.bottom}>
                    <div className={classes.box}>
                        {/* <Carousel useKeyboardArrows={true}>
                            {images.map((URL, index) => (
                                <div className="slide">
                                    <img
                                        alt="exercises"
                                        src={URL}
                                        key={index}
                                    />
                                </div>
                            ))}
                        </Carousel> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormCheck;
