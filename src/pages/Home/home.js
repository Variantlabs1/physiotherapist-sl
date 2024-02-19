import classes from "./Home.module.scss";
import Header from "../../components/header";
import Profile from "../../components/profile";
import SideBar from "../../components/sideBar";
import { MdLogout } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../components/data_fetch/authProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { VStack } from "@chakra-ui/react";

function Home(props) {
    //For signout option
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);
    const [userData, setUserData] = useState('');
    const {user} = useContext(AuthContext);

    var show = true;
    // if(userData.age){
    //     console.log(userData.age);
    // };
    console.log(userData);
    if(userData){
        show = userData.accountStatus;
    }

    useEffect(() => {
        if (user) {
            // Ensure the user is signed in before fetching data
            const fetchData = async () => {
                try {
                    const q = query(collection(db,"physiotherapist"),where("physiotherapistId","==",user.uid))
                    const res = await getDocs(q)
                    
                    setUserData(res.docs[0].data())
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    // Handle the error here or show an error message to the user
                }
            };

            fetchData();
        }
    }, [user]); 
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

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                
                // Logout successful, navigate to the login page
                navigate("/login"); // Assuming your login page route is '/login'
            })
            .catch((error) => {
                // Handle any errors that occurred during logout
                console.log("Logout Error:", error);
            });
    };


    return (
        <div className="App">
            {!isMobile ? 
            <div className={classes.root}>
                <div className={classes.left}>
                    <div className={classes.profile}>
                        <AuthProvider>
                            <Profile />
                        </AuthProvider>
                    </div>

                    <div className={classes.sideBar}>
                        <SideBar />
                    </div>

                    <div className={classes.logout}>
                        <div className={classes.button} onClick={handleLogout}>
                            <div className={classes.icon}>
                                <MdLogout size={35} color="#0D30AC" />
                            </div>
                            <div className={classes.option}>
                                <span>Log Out</span>
                            </div>
                        </div>
                    </div>
                </div>


                <div className={classes.right}>
                    <div className={classes.top}>
                        <Header />
                    </div>
                    <div className={classes.bottom}>
                        {/* {pathname==="default-exercises"?<DefaultExercises/>:selectedOption !== null &&
                            componentMap[selectedOption]} */}
                              <Outlet />
                    </div>
                </div>
            </div>
            :
            <div>
                <VStack>
                    <Header />
                    <Outlet />
                    <SideBar />
                {!show && <div className={classes.warningpopup}> 
                <div className={classes.content}>
                    <h1>Access Denied</h1>
                    <div className={classes.logout}>
                        <div className={classes.button} onClick={handleLogout}>
                            <div className={classes.icon}>
                                <MdLogout size={35} color="white" />
                            </div>
                            <div className={classes.option}>
                                <span>Log Out</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
                </VStack>
            </div>}
            {!show && <div className={classes.warningpopup}> 
                <div className={classes.content}>
                    <h1>Access Denied</h1>
                    <div className={classes.logout}>
                        <div className={classes.button} onClick={handleLogout}>
                            <div className={classes.icon}>
                                <MdLogout size={35} color="white" />
                            </div>
                            <div className={classes.option}>
                                <span>Log Out</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Home;
