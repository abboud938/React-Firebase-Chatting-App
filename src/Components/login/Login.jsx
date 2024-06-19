import './Login.css';
import {useState} from 'react';
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc , doc} from 'firebase/firestore';
import { auth  , db } from "../../lib/firebase";
import  Upload  from "../../lib/upload";


const Login = () => {
  
  const [avatar , setAvatar] = useState({
    file : '',
    url : ''
  });
  const [loading, setLoading] = useState(false);
  const handleFile = e => {
    if(e.target.files[0]){
      setAvatar({
        file : e.target.files[0] ,
        url : URL.createObjectURL(e.target.files[0])
      })
    }
  }
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const formData = new FormData(e.target);
  console.log(e.target);
  const {username , email , password} = Object.fromEntries(formData);
  console.log(Object.fromEntries(formData));
      // VALIDATE INPUTS
      if (!username || !email || !password)
        return toast.warn("Please enter inputs!");
      if (!avatar.file) return toast.warn("Please upload an avatar!");
  try {
    const res = await createUserWithEmailAndPassword(auth , email , password);
    const imgURL = await Upload(avatar.file);
    //create User Collection  In FireStore To Save User-Data in Seperated Documents
    await setDoc( doc(db ,"users" , res.user.uid) , {
      username ,
      password ,
      avatar : imgURL,
      id : res.user.uid,
      blocked : []
    } );
    //Create Chat Collection Contain Documents For Each User-Chats
    await setDoc( doc(db ,"userchats" , res.user.uid) , {
      chats : []
    } );
    toast.success(`Regesteration Done , Wellcome ${username} Sign In Please` );
  } catch (error) {
    toast.error(`Regesteration Faild , Check Your Inputs ` );
  } finally {
    setLoading(false);
  }
};

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  const formData = new FormData(e.target);
  const {email , password} = Object.fromEntries(formData);
  try {
    await signInWithEmailAndPassword(auth , email , password);
    toast.success(` Done , You Will Be Redirected To the Chatting Page` );
  } catch (error) {
    toast.error(`Signing In Faild , Please Sign Up ` );
  } finally{
    setLoading(false);
  }
};


  return(
    <div className="login">
      <div className="item">
        <h2>Wellcome Back</h2>

        <form onSubmit={handleLogin} name='loginForm'>
          <input type='text' placeholder='Email' name='email'/>
          <input type='text' placeholder='Password' name='password'/>
          <button disabled={loading}>{loading ? "Loading" : "Sign In"}</button>
        </form>

      </div>
      <div className="separator"></div>
      <div className='item'>
        <h2>Register New Account</h2>

        <form onSubmit={handleSubmit} name='signupForm'>
          <label htmlFor='file'>Upload your image
            <img src = {avatar.url || './avatar.png'} alt=""/>
          </label>
          <input type='file' id='file' style={{display:"none"}} onChange={handleFile}/>
          <input type='text' placeholder='UserName' name='username'/>
          <input type='email' placeholder='Email' name='email' />
          <input type='text' placeholder='Password' name='password'/>
          <button disabled={loading} >{loading ? "Loading" : "Sign Up"}</button>
        </form>

      </div>
    </div>
  );
};

export default Login;
