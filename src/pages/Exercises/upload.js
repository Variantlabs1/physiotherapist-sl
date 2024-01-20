import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export const uploadVideo=(file,data,setClicked)=>{
    const filename='exercises/'+Date.now()+file.name
    const storage=getStorage(app)
    const storageRef=ref(storage,filename)
    const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
(snapshot) => {

  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log( parseInt(progress)+"%");
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
}, (e)=>{},
async() => {

 await getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
    data.videoURL = downloadURL
    const {id,videoFile,thumbnailFile,...others} = data

    await updateDoc(doc(db,"exercises",data.id),others)
    setClicked(false)

  }).catch((err)=>console.log(err));
}
);
}

export const uploadThumbnail= async (file,data,setClicked)=>{
    
   
    const filename='exercises/'+Date.now()+file.name
    const storage=getStorage(app)
    const storageRef=ref(storage,filename)
    const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
(snapshot) => {

  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log( parseInt(progress)+"%");
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

  getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
    data.thumbnailURL = downloadURL
    const {id,videoFile,thumbnailFile,...others} = data
   
    await updateDoc(doc(db,"exercises",data.id),others)
    setClicked(false)

}).catch((err)=>console.log(err));
}
);
}

export const uploadAll= async (img,video,data,setClicked)=>{
    
  const filename='exercises/'+Date.now()+img.name
  const storage=getStorage(app)
  const storageRef=ref(storage,filename)
  const uploadTask = uploadBytesResumable(storageRef, img);

uploadTask.on('state_changed', 
(snapshot) => {
const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
console.log( parseInt(progress)+"%");
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
getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {

  data.thumbnailURL = downloadURL
  const filename='exercises/'+Date.now()+video.name
  const storage=getStorage(app)
  const storageRef=ref(storage,filename)
  const uploadTask = uploadBytesResumable(storageRef, video);

uploadTask.on('state_changed', 
(snapshot) => {

const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
console.log( parseInt(progress)+"%");
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
}, (e)=>{},
() => {

 getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
  data.videoURL = downloadURL
  const {id,videoFile,thumbnailFile,...others} = data
 
  await updateDoc(doc(db,"exercises",data.id),others)
  setClicked(false)

}).catch((err)=>console.log(err));
}
);

}).catch((err)=>console.log(err));
}
);
}

