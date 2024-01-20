import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Signup from "./pages/SignUp/signup";
import ReactGA from "react-ga";
import "./App.css";
// import LoginAdmin from "./admin/Login/adminLogin";
// import AdminHome from "./admin/Home/adminHome";
import Success from "./pages/payment/Success";
import AssignExercises from "./pages/Exercises/AssignExercises";
import PasswordReset from "./pages/Login/PasswordReset";
import { useEffect,useContext } from "react";
import { AuthContext } from "./components/data_fetch/authProvider";
import ForgotPassword from "./pages/Login/NewLogin";
import DefaultExercises from "./pages/Exercises/DefaultExercises";
import Dashboard from "./components/dashboard";
import ClientsPage from "./pages/Clients/clientsPage";
import ExercisesPage from "./pages/Exercises/exercisesPage";
import ClientsRequest from "./pages/ClientsRequest/clientsRequest";
import Settings from "./pages/Settings/settings";
import MainChats from "./pages/Chat/mainChats";
import Billing from "./pages/payment/Billing";
import MainExercises from "./pages/Exercises/mainExercises";
import MainClients from "./pages/Clients/mainClients";

    ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID )

    function App() {
        useEffect(() => {
          ReactGA.pageview(window.location.pathname + window.location.search);
        }, []);

        const {user} = useContext(AuthContext)

    // return (
    //     <div className="App">
    //         <Router>
    //             <Routes>
                  
    //                 {/* <Route path="loginadmin" element={<LoginAdmin />} /> */}
    //                 {/* <Route path="adminhome" element={<AdminHome />} /> */}
    //                 <Route path="/success"element={<Success/>} />
    //                 <Route path="/assign-exercises/:clientId" element={<AssignExercises/>}  />
    //                 <Route path="/password-recovery/email" element={<PasswordReset/>} />


    //                 <Route path="/login" element={!user ? <ForgotPassword /> : <Navigate to="/" />}/>
    //                 <Route path="/sign-up" element={!user ? <Signup /> : <Navigate to="/" />} />
    //                 <Route path="/default-exercises" element={ <Home /> } />

    //                 <Route exact path="/" element={user? <Home />: <Navigate to="/login" />} />

    //             </Routes>
    //         </Router>
    //     </div>
    // );

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const router = createBrowserRouter([
        {
          path: "/",  // This is the root path
          element:user? <Home /> : <Navigate to="/login"/> ,
          children: [
            {
              path: "Dashboard",  // Relative path to "/"
              element: <Dashboard />,
            },
            {
              path: "Clients",  // Relative path to "/"
              element: <MainClients />,
            },
            {
              path: "Exercises",  // Relative path to "/"
              element: <MainExercises />,
            },
            {
              path: "Chat",  // Relative path to "/"
              element: <MainChats />,
            },
            {
              path: "Billing",  // Relative path to "/"
              element: <Billing />,
            },
            {
              path: "Requests",  // Relative path to "/"
              element: <ClientsRequest />,
            },
            {
              path: "Profile",  // Relative path to "/"
              element: <Settings />,
            },
          ],
        },
        {
          path: "/login",
          element: !user ? <ForgotPassword /> : <Navigate to='/Dashboard'/>,
        },
        {
          path: "/sign-up",
          element: !user ? <Signup /> : <Navigate to='/Dashboard'/>,
        },
      ]);
      
      return <RouterProvider router={router} />;
      
}

export default App;
