import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getstorage} from './firebase';
const Upload = async (file) => {

    const storageRef = ref(getstorage, `${Date()} + t + ${file.name}`);  
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            reject("Something went wrong!" + error.code);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });

    }
export default Upload;