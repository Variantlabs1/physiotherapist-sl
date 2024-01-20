import React from "react";

import styles from "../styles/InputControl.module.css";

function InputControl(props) {
    return (
        <div className={styles.container}>
            {props.label && <label>{props.label}</label>}
            <input type="text" {...props} />
        </div>
    );
}

export default InputControl;
