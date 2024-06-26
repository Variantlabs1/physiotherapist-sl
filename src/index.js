import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { AuthProvider } from "./components/data_fetch/authProvider";
import ReactGA from "react-ga";
// require('dotenv').config();
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
