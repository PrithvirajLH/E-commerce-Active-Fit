import React, {useState,useEffect} from 'react'
import { storage,auth,db } from '../firebaseConfigs/firebaseConfig';
import { collection,getDocs,query,where,doc,updateDoc } from 'firebase/firestore';
import Navbar from './Navbar'
import './UserProfile.css'


const UserProfile = () => {
  function GetCurrentUser(){
    const [user,setUser]= useState('');
    const usersCollectionRef = collection(db,"users");

    useEffect(()=>{
      auth.onAuthStateChanged(userlogged=>{
        if(userlogged){
          const getUsers = async ()=>{
            const q = query (collection(db,"users"),where("uid","==",userlogged.uid));
            //console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
          }
          getUsers();
        }
        else{
          setUser(null);
        }
      })
    },[])
    return user

  }
  const loggeduser = GetCurrentUser();
  if ( loggeduser) { console.log(loggeduser[0].Email)}



  return (
    <div>
        <Navbar/>
        <div className='userprofile-outercontainer'>
          { loggeduser ? <div className='user-profile'>
            <p> Account Details</p>

            <div classnamme='data-row'>
              <span> Name: </span>
              <span>{loggeduser[0].Name}</span>
            </div>

            <div classnamme='data-row'>
              <span> Email: </span>
              <span>{loggeduser[0].Email}</span>
            </div>

            <div classnamme='data-row'>
              <span> Phone Number: </span>
              <span>{loggeduser[0].PhoneNumber}</span>
            </div>

            <div classnamme='data-row'>
              <span> Address: </span>
              <span>{loggeduser[0].Address}</span>
            </div>

          </div>:
          
          <div>
                You are not logged In
          </div>}
        </div>
    </div>
  )
}

export default UserProfile