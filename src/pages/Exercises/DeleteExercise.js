import React, { useState } from "react";
import { motion } from "framer-motion";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "./DeleteExercise.module.scss";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function DeletePhysio({
  id,
  exercises,
  setExercises,
  isOpenDelete,
  toggleDeleteModal,
}) {
  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteDoc(doc(db, "exercises", id));
      setExercises(exercises.filter((e) => e.id !== id));
    } catch (e) {
      console.log(e);
    }
    toggleDeleteModal(e);
  };
  return (
    <div>
      <DeleteOutlineOutlinedIcon
        htmlColor="#362f69"
        className={styles.dot}
        onClick={toggleDeleteModal}
      />
      {isOpenDelete && (
        <div className={styles.recheckDelete}>
          <div>
            <h3>Delete Exercise</h3>
            <hr></hr>
            <p>Are you sure? You can't undo this action afterwards.</p>
          </div>
          <div className={styles.buttonDelete}>
            <div className={styles.bottoncover}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className={styles.cancel}
                onClick={toggleDeleteModal}
              >
                Cancel
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                className={styles.delete}
                onClick={handleDelete}
              >
                Delete
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
