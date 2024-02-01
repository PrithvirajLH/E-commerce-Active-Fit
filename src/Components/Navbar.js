import React, {useState,useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Navbar.css'
import cartlogo from '../Components/assets/cart.png'
import profilelogo from '../Components/assets/profilelogo.png'
import {auth,db} from '../firebaseConfigs/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import applogo from '../Components/assets/Training.png'


const Navbar = () => {
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
    },[]);
    return user

  }
  const loggeduser = GetCurrentUser();

  const navigate = useNavigate();
  
  const handleLogout=()=>{
    auth.signOut().then(()=>{
      navigate("/login")
    })
  };

  const [cartdata,setcartdata]=useState([]);
  if (loggeduser){
    const getcartdata=async()=>{
      const cartArray = [];
      const path = `cart-${loggeduser[0].uid}`

      getDocs(collection(db,path)).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          cartArray.push({...doc.data(),id:doc.id})
        });
        setcartdata(cartArray);
      }).catch("Error error error")
    }
    getcartdata();  
    
  }

  return (
    <div>
      <div className='navbar'>
      <div className='LeftContainer'>
        <img src={applogo} height={100} />
      </div>

      <div className='RightContainer'>
        {!loggeduser && <nav>

          <Link to='/'><button>Home</button></Link>
          <Link to='/signup'><button>Register</button></Link>
          <Link to='/login'><button>Login</button></Link>

          <div className='cart-btn'>
              <Link to='/cartdata'><img src={cartlogo} alt="Cart Image"/></Link>
              <button className='cart-icon-css'>{cartdata.length}</button>
          </div>
          <Link to="/userprofile">
            <img src={profilelogo} classname='profile-icon' />
          </Link>  
        </nav>}

        {loggeduser && 
          <nav>
            <Link to='/'><button>Home</button></Link>
            {loggeduser[0].Email=="chinnuhulgur@gmail.com"?
            <Link to='/sellproduct'><button>Sell</button></Link>:<></>}
            <div className='cart-btn'>
              <Link to='/cartdata'><img src={cartlogo} alt="Cart Image"/></Link>
              <button className='cart-icon-css'>{cartdata.length}</button>
          </div>
            <Link to="/userprofile">
              <img src={profilelogo} alt='profile logo' classname='profile-icon'/>
            </Link>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
          </nav>       
        }
        
      </div>
    </div>

    <div className='product-types'>
      <a href='/product-types/mens'><button>Mens</button></a>
      <a href='/product-types/womens'><button>Womens</button></a>

    </div>
    </div>
  )
}

export default Navbar