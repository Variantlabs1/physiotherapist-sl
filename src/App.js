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
import ForgotPassword from "./pages/Login/NewLogin";
import Dashboard from "./components/dashboard";
import ClientsRequest from "./pages/ClientsRequest/clientsRequest";
import Settings from "./pages/Settings/settings";
import MainChats from "./pages/Chat/mainChats";
import Billing from "./pages/payment/Billing";
import MainExercises from "./pages/Exercises/mainExercises";
import MainClients from "./pages/Clients/mainClients";
import Login from "./pages/Login/login";
import Chats from "./pages/Chat/chats";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Clients" element={<MainClients />} />
          <Route path="Exercises" element={<MainExercises />} />
          <Route path="/Chat" element={<MainChats />} />
          <Route path="/Chat/:id" element={<Chats />} />
          <Route path="Billing" element={<Billing />} />
          <Route path="Requests" element={<ClientsRequest />} />
          <Route path="Profile" element={<Settings />} />
        </Route>
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
