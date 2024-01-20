import classes from "../styles/WelcomeCard.module.scss";

const WelcomeCard = (props) => {
    return (
        <div className={classes.rootWelcomeCard}>
            <div className={classes.left}>
                <p className={classes.heading}>Welcome Back</p>

                <p className={classes.subText}>
                    Here are your important tasks, updates and alerts. Have a
                    nice day!
                </p>
            </div>
            <div className={classes.right}>
                <img
                    src="https://png.pngtree.com/png-vector/20220517/ourmid/pngtree-kid-in-emergency-room-2d-vector-isolated-illustration-png-image_4660249.png"
                    alt="welcome"
                ></img>
            </div>
        </div>
    );
};

export default WelcomeCard;
