import styled from "@emotion/styled";
import classes from "../styles/ClientList.module.scss";
import ClientFetcher from "./data_fetch/clientFetcher";
import { useState } from "react";
import { Center } from "@chakra-ui/react";

const defaultUrl =
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=8";

const ClientList = () => {
    const [clients, setClients] = useState([]);

    const handleClientsFetched = (fetchedClients) => {
        setClients(fetchedClients);
    };

    function calculateAge(dateOfBirthString) {
        // Parse the date string
        const dobArray = dateOfBirthString.split('/');
        const dobMonth = dobArray[1];
        const dobDay = parseInt(dobArray[0], 10);
        const dobYear = parseInt(dobArray[2], 10);
      
        // Convert month name to a numeric value
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const dobMonthNumeric = monthNames.indexOf(dobMonth);
      
        // Create a Date object
        const dob = new Date(dobYear, dobMonthNumeric, dobDay);
      
        // Calculate the age
        const currentDate = new Date();
        let age = currentDate.getFullYear() - dob.getFullYear();
      
        // Adjust age if the birthday hasn't occurred yet this year
        if (
          currentDate.getMonth() < dob.getMonth() ||
          (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
        ) {
          age--;
        }
      
        return age;
      }
      


    return (
        <div className={classes.rootClientlist}>
            <div className={classes.heading}>
                <span className={classes.head}>Clients List</span>

                <div className={classes.button}>
                    <span>View All</span>
                </div>
            </div>

            {/* Fetch the data of the clients  */}
            <ClientFetcher onClientsFetched={handleClientsFetched} />

            <div className={classes.table} style={{ overflow: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                            {clients?.length>0?
                                clients.map((client, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className={classes.profilePic}>
                                                <img
                                                    src={defaultUrl}
                                                    alt={client.userName}
                                                />
                                            </td>
                                            <td>{client.userName}</td>
                                            <td>{client.userDOB?calculateAge(client.userDOB):"No data"}</td>
                                            {/* <td>{client.userDOB?client.userDOB.split("/").slice(0,3).join("/"):"No data"}</td> */}
                                            <td>{client.userWeight?parseInt(client.userWeight):"No data"}</td>
                                            <td>{client.userGender?client.userGender:"No data"}</td>
                                            <td>{client.phone?client.phone:"No data"}</td>
                                        </tr>
                                    );
                                }):
                            <h2>No Clients!</h2>
                        
                            }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientList;

