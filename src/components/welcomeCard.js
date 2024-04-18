import classes from "../styles/WelcomeCard.module.scss";
import useDate from "./useDate";

const WelcomeCard = (props) => {
  const formattedDate = useDate();
  return (
    <div className={classes.rootWelcomeCard}>
      <div className={classes.left}>
        <div className={classes.header}>
          <p className={classes.heading}>Welcome Back!</p>
          <div className={classes.date}>{formattedDate}</div>
        </div>

        <p className={classes.subText}>
          Here are your important tasks, updates and alerts. Have a nice day!
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;
