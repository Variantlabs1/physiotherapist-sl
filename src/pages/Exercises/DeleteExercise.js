import React, { useContext } from "react";
import { motion } from "framer-motion";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import styles from "./DeleteExercise.module.scss";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../../components/data_fetch/authProvider";

export default function DeletePhysio({ id, isOpenDelete, toggleDeleteModal }) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { user } = useContext(AuthContext); // Get the user context

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      // Construct the document reference using the user's ID
      const exerciseRef = doc(db, `physiotherapist/${user?.uid}/exercises`, id); // id should be the Exercise_Name
      await deleteDoc(exerciseRef);
      queryClient.invalidateQueries(["exercises"]);
      toast({
        title: `Exercise deleted successfully`,
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting exercise:", error);
      toast({
        title: "Something went wrong!",
        status: "error",
        isClosable: true,
      });
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
            <hr />
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
