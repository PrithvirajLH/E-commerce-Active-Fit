import React, {useState} from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth,db} from '../firebaseConfigs/firebaseConfig'
import {collection,addDoc} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
import './Signup.css'
const Signup = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [phonenumber,setPhonenumber] = useState("");
    const [address,setAddress] = useState("");

    const navigate = useNavigate()

    const [errorMsg,setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            const user = userCredential.user;
            const initialcartvalue=0;
            console.log(user);

            addDoc(collection(db, "users"), {
                Name:username, Email:email, PhoneNumber:phonenumber, 
                Password:password,Cart:initialcartvalue, 
                Address:address,uid:user.uid
            }).then(()=>{
                setSuccessMsg('New user added successfully, You will now be automatically redirected to login page.')
                setUsername('')
                setPhonenumber('')
                setEmail('')
                setPassword('')
                setErrorMsg('')
                setTimeout(()=>{
                    setSuccessMsg('');
                    navigate('/login');
                },4000);
            })
            .catch((error)=>{setErrorMsg(error.message)});
        })
        .catch((error)=>{
            if(error.message == 'Firebase: Error (auth/invalid-email).')
            {
                setErrorMsg('Please fill all required fields')
            }
            if(error.message === 'Firebase: Error (auth/email-already-in-use).')
            {
                setErrorMsg('User already exists');
            }

        })
    }

  return (
    <div>
        <Navbar/>
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <p>Create Account</p>
                {successMsg&&<>
                <div className='success-msg'>
                    {successMsg}
                </div></>}
                {errorMsg&&<>
                <div className='error-msg'>
                    {errorMsg}
                    
                </div></>}
                <label>Your Name</label>
                <input type='text' placeholder='First and Last Name' onChange={(e)=>setUsername(e.target.value)}/>
                <label>Mobile Number</label>
                <input type='tel' placeholder='Mobile Number' onChange={(e)=>setPhonenumber(e.target.value)}/>
                <label>Email</label>
                <input type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
                <label>Address</label>
                <textarea placeholder='Enter your Address' onChange={(e)=>setAddress(e.target.value)}></textarea>
                <button type='submit'>Sign Up</button>
                <div>
                    <span>Already have an account ?</span>
                    <Link to='/login'>Sign In</Link>
                </div>
            </form>

        </div>
    </div>
  )
}

export default Signup