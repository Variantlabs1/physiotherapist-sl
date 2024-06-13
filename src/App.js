import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";

import Home from "./pages/Home/home";
import Signup from "./pages/SignUp/signup";
import ReactGA from "react-ga";
import "./App.css";
import PasswordReset from "./pages/Login/PasswordReset";
import { useEffect, useContext } from "react";
import { AuthContext } from "./components/data_fetch/authProvider";
import Dashboard from "./components/dashboard";
import ClientsRequest from "./pages/ClientsRequest/clientsRequest";
import Settings from "./pages/Settings/settings";
import MainChats from "./pages/Chat/mainChats";
import Billing from "./pages/payment/Billing";
import MainExercises from "./pages/Exercises/mainExercises";
import Login from "./pages/Login/login";
import Chats from "./pages/Chat/chats";
import AssignExercises from "./pages/Clients/assignExercises";
import ClientsPage from "./pages/Clients/clientsPage";
import ClientDetails from "./pages/Clients/clientDetails";
import LandingPage from "./pages/LandingPage/LandingPage";
import About from "./pages/LandingPage/About";
import Terms from "./pages/LandingPage/Terms";
import Privacy from "./pages/LandingPage/Privacy";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/home" />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Clients" element={<ClientsPage />} />
          <Route path="Clients/:id" element={<ClientDetails />} />
          <Route
            path="/Clients/:id/assignedExercise"
            element={<AssignExercises />}
          />
          <Route path="Exercises" element={<MainExercises />} />
          <Route path="/Chat" element={<MainChats />} />
          <Route path="/Chat/:id" element={<Chats />} />
          <Route path="Billing" element={<Billing />} />
          <Route path="Requests" element={<ClientsRequest />} />
          <Route path="Profile" element={<Settings />} />
        </Route>
        <Route path="home" element={<LandingPage />} />
        <Route path="about" element={<About />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route
          path="login"
          element={!user ? <Login /> : <Navigate to="/Dashboard" />}
        />
        <Route
          path="signup"
          element={!user ? <Signup /> : <Navigate to="/Dashboard" />}
        />
        <Route path="password-recovery" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
