import classes from "../styles/ClientList.module.scss";
import ClientFetcher from "./data_fetch/clientFetcher";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageComponent from "../pages/Chat/components/ImageConponent";

const defaultUrl =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=8";

const ClientList = () => {
  const Navigate = useNavigate();
  const [clients, setClients] = useState([]);

  const handleClientsFetched = (fetchedClients) => {
    console.log("Fetched clients:", fetchedClients); // Debug log
    setClients(fetchedClients);
  };

  function calculateAge(dateOfBirthString) {
    // Parse the date string
    const dobArray = dateOfBirthString.split("/");
    const dobMonth = dobArray[1];
    const dobDay = parseInt(dobArray[0], 10);
    const dobYear = parseInt(dobArray[2], 10);

    // Convert month name to a numeric value
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dobMonthNumeric = monthNames.indexOf(dobMonth);

    // Create a Date object
    const dob = new Date(dobYear, dobMonthNumeric, dobDay);

    // Calculate the age
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }

  return (
    <div className={classes.rootClientlist}>
      <div className={classes.heading}>
        <span className={classes.head}>Clients Lists</span>

        <div className={classes.button}>
          <span>
            <Link to="/Clients">View All</Link>
          </span>
        </div>
      </div>

      {/* Fetch the data of the clients  */}
      <ClientFetcher onClientsFetched={handleClientsFetched} />

      <div className={classes.table} style={{ overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Age</th>
              <th>Weight</th>
              <th>Gender</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {clients?.length > 0 ? (
              clients.map((client, index) => {
                console.log("Client data:", client); // Debug log
                return (
                  <tr key={client.userId || index}>
                    <td className={classes.profilePic}>
                      {client.userProfilePhoto ? (
                        <div
                          onClick={() => {
                            Navigate(`/Clients/${client.userId}`);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {/* Try direct img tag first to test if URL works */}
                          <img
                            src={client.userProfilePhoto}
                            alt={client.userName || "Client"}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover"
                            }}
                            onError={(e) => {
                              console.log("Image failed to load:", client.userProfilePhoto);
                              e.target.src = require("../assets/vectorProfile.png");
                            }}
                            onLoad={() => {
                              console.log("Image loaded successfully:", client.userProfilePhoto);
                            }}
                          />
                          {/* Alternative: Use ImageComponent if direct img doesn't work */}
                          {/* <ImageComponent imagePath={client.userProfilePhoto} /> */}
                        </div>
                      ) : (
                        <img
                          src={require("../assets/vectorProfile.png")}
                          alt={client.userName || "Client"}
                          onClick={() => {
                            Navigate(`/Clients/${client.userId}`);
                          }}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            cursor: "pointer"
                          }}
                        />
                      )}
                    </td>
                    <td>{client.userName || "No name"}</td>
                    <td>
                      {client.userDOB
                        ? calculateAge(client.userDOB)
                        : "No data"}
                    </td>
                    <td>
                      {client.userWeight
                        ? parseInt(client.userWeight)
                        : "No data"}
                    </td>
                    <td>{client.userGender || "No data"}</td>
                    <td>{client.userPhoneNumber || client.phone || "No data"}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Clients right now!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientList;