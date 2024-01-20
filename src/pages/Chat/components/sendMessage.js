// import { useState } from "react";
// import { auth, db } from "../../../firebase";

// const SendMessage = () => {
//     const [msg, setMsg] = useState("");

//     async function sendMessage(e){
//         e.preventDefault();

//         const {uid, photoURL} = auth.currentUser;

//         await db.collection("messages").add({
//             text:msg,
//             photoURL,
//             uid,
//             createdAt: firebase.firestore.FieldValue.serverTimestamp()
//         })
//     }

//     return (
//         <form onSubmit={sendMessage}>
//             <input
//                 value={msg}
//                 placeholder="Message...."
//                 onChange={(e) => {
//                     setMsg(e.target.value);
//                 }}
//             />
//             <button type="submit">Send</button>
//         </form>
//     );
// };

// export default SendMessage;
