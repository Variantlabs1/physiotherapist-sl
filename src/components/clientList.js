import styled from "@emotion/styled";
import classes from "../styles/ClientList.module.scss";
import ClientFetcher from "./data_fetch/clientFetcher";
import { useState } from "react";

const defaultUrl =
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=8";

const ClientList = () => {
    const [clients, setClients] = useState([]);

    const handleClientsFetched = (fetchedClients) => {
        setClients(fetchedClients);
    };

    // console.log(clients)


    return (
        <div className={classes.rootClientlist}>
            <div className={classes.heading}>
                <span className={classes.head}>Clients List</span>

                <div className={classes.button}>
                    <span>View All</span>
                </div>
            </div>

            {/* Fetch the data of the clients */}
            <ClientFetcher onClientsFetched={handleClientsFetched} />

            <Table>
                    <Top>
                        <div>Avatar</div>
                        <p>Name</p>
                        <p>Age</p>
                        <p>Weight</p>
                        <p>Gender</p>
                        <p>phone no</p>
                        {/* <th>Exercises</th> */}
                    </Top>
                    {clients?.length>0?
                    clients.map((client, index) => {
                        return (
                            <Row key={index}>
                                <div className={classes.profilePic}>
                                    <img
                                        src={defaultUrl}
                                        alt={client.userName}
                                    />
                                </div>
                                <p>{client.userName}</p>
                                <span>{client.userDOB?client.userDOB.split("/").slice(0,3).join("/"):"No data"}</span>
                                <p>{client.userWeight?parseInt(client.userWeight):"No data"}</p>
                                <p>{client.userGender?client.userGender:"No data"}</p>
                                <p>{client.phone?client.phone:"No data"}</p>
                                {/* <td>{val.exercise}</td> */}
                            </Row>
                        );
                    }):
                    <h2>No Clients!</h2>
            
                    }
            </Table>
        </div>
    );
};

export default ClientList;

const Table = styled.div`
 display: flex;
 flex-direction: column;
 width: 100%;
 margin-top: 10px;
 &>h2{
    text-align: center;
    margin-top: 65px;
 }
`

const Top = styled.div`
 display: flex;
 color: #4661be;

 justify-content: space-between;
 &>p{
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18%;
    font-size: 17px;
 }
`

const Row = styled.div`
 display: flex;
 justify-content: space-between;
align-items: center;
&>p{
 display: flex;
 width: 18%;
 justify-content: center;

}
&>span{
    font-size: 13px;
}
`
