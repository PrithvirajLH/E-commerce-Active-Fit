import React, {useState,useEffect} from 'react'
import Navbar from './Navbar'
import Products from './Products'
import Banner from './Banner'
import {auth,db} from '../firebaseConfigs/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import ProductSlider from './Some-Product-Components/ProductSlider'
import './Home.css'

const Home = () => {
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
  //if ( loggeduser) { console.log(loggeduser[0].Email)}

  return (
    <div>
        <Navbar/>
        <Banner/>
        <div className='slider-head'><p>Limited Time Deals</p></div>
        <ProductSlider type={'Mens'}/>
        <ProductSlider type={'womens'}/>
    </div>
  )
}

export default Home