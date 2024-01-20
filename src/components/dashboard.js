import classes from "../styles/Dashboard.module.scss";
import LeftChart from "./LeftChart";
import Chart from "./chart";
import ClientList from "./clientList";
// import ExerciseFetcher from "./data_fetch/exerciseFetcher";
import Exercises from "./exercises";
import WelcomeCard from "./welcomeCard";

const Dashboard = (props) => {
    return (
        <div className={classes.rootMain}>
            <div className={classes.left}>
                    <WelcomeCard />

                <div className={classes.graphs}>

                    <div className={classes.leftGraph}> 
                        <LeftChart/>
                    </div>

                    <div className={classes.rightGraph}>
                        <Chart />
                    </div>
                
                </div>

                    <ClientList />
            </div>

            <div className={classes.right}>
                <div className={classes.exercises}>
                    <Exercises />
                </div>
            </div>
            </div>
    );
};

export default Dashboard;
