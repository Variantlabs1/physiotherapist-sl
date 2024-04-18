import React, { useState } from "react";
import ClientsPage from "./clientsPage";
import ClientDetails from "./clientDetails";
import { useLocation } from "react-router-dom";

const MainClients = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientDetails, setShowClientDetails] = useState(false);
  const location = useLocation();
  const clientDocId = location.search.split("=")[1];

  //To set the selected Client
  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setShowClientDetails(true);
  };

  // Function to go back to client list
  const handleBackToList = () => {
    setSelectedClient(null);
    setShowClientDetails(false);
  };

  return (
    <div >
      {showClientDetails ? (
        <ClientDetails
          client={selectedClient}
          clientDocId={clientDocId}
          onBackToList={handleBackToList} // Pass the function to go back
        />
      ) : (
        <ClientsPage
          clientDocId={clientDocId}
          onSelectClient={handleClientSelect}
        />
      )}
    </div>
  );
};

export default MainClients;
