import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../../firebase";

export const handleUpload=(file,updateDoc,details,setUploaded)=>{
    
   
    const filename='physiotherapist/'+Date.now()+file.name
    const storage=getStorage(app)
    const storageRef=ref(storage,filename)
    const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
(snapshot) => {

  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  setUploaded( parseInt(progress)+"%");
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
      default:
        console.log('default')
  }
}, 
(error) => {

}, 
() => {

  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
   updateDoc({...details,profileImageURL:downloadURL})
  }).catch((err)=>console.log(err));
}
);
}