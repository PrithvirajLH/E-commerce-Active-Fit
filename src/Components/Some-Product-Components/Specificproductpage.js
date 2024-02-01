import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import {useParams} from 'react-router-dom'
import { auth,db } from '../../firebaseConfigs/firebaseConfig';
import { doc,getDoc,collection,query,where,getDocs, addDoc } from 'firebase/firestore';
import './Specificproductpage.css'
import ProductSlider from './ProductSlider';

const Specificproductpage = () => {
    const{producttype,id}=useParams();
    const [product,setProduct]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    const [errorMsg, setErrorMsg]=useState('');


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
              };
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



    function GetCurrentProduct(){
        useEffect(()=>{
            const getProduct = async()=>{
                const docRef=doc(db,`products-images${producttype.toUpperCase()}`,id);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
            };
            getProduct();
        },[]);
        return product
    }

    GetCurrentProduct();
    let p=product;
    let overallltax = 10/100;
    let overcommission = 10/100;
    let extraforfun = 10/100;
    let mrp=parseFloat(p.price);
    mrp = Math.round(mrp+ overallltax*mrp + overcommission*mrp + extraforfun+mrp);
    const salesprice=Math.round(mrp-extraforfun*mrp);

    const addtocart=()=>{
      if(loggeduser){
        addDoc(collection(db,`cart-${loggeduser[0].uid}`),{
          product,quantity:1
        }).then(()=>{
          setSuccessMsg("Product added to cart")
        }).catch((error)=>{setErrorMsg(error.essage)});
      }
      else{
        setErrorMsg("You need to login first")
      }
    }
  

  return (
    <div>
        <Navbar/>
        {product?<div className='myprod-container'>
            <div className='prod-img-cont'>
            <img src={product.productimage} height={250}/>
            </div>
            
            <div className='prod-data'>
                <p className='prod-head'>{product.producttitle} </p>
                <div className='specific-price-container'>
                  <p className='mrp'>Price: <p className='rate'>${mrp}</p></p>
                  <p className='salesprice'>Discount Price: <p className='rate'>${salesprice}</p></p>
                  <p className='yousave'>You Save:$ {mrp-salesprice} </p>
                </div>
                <p className='prod-details-head'>Details</p>
                <p className='prod-description'>{product.description}</p>

                <div className='row-cont'>
                  <div className='warranty-replacement'>
                    <div className='cod'>
                    <div className='img-circle'>
                      <img src='https://img.freepik.com/free-vector/cash-delivery-concept_23-2148798392.jpg?size=626&ext=jpg&ga=GA1.1.1719847028.1705526128&semt=ais'/>
                    </div>
                    <p>Cash on Delivery</p>
                  </div>
                  <div className='cashback'>
                    <div className='img-circle'>
                      <img src='https://img.freepik.com/free-vector/e-shopping-cartoon-web-icon-online-store-cashback-service-money-returning-financial-refund-idea-return-investment-internet-income_335657-2312.jpg?w=740&t=st=1705864119~exp=1705864719~hmac=448cea9daf1bc7da6dd14da2f86d08effdbfbe768f7d4112a6fcdc701880e87f'/>
                    </div>
                    <p>Cashback Guarantee</p>
                  </div>
                  <div className='replacement'>
                    <div className='img-circle'>
                      <img src='https://img.freepik.com/premium-vector/10-days-go-timer-vector-symbol-color-style_824631-843.jpg?w=1060'/>
                    </div>
                    <p>10 Days Replacement</p>
                  </div>
                  </div>
                  <div className='buy-cart'>
                    <button className='btn'>Buy Now</button>
                    <button className='btn' onClick={addtocart}>Add to Cart</button>
                  </div>
                </div>

                {successMsg && <>
                  <div className='success-msg'>{successMsg}</div>
                </>}
                {errorMsg && <>
                  <div className='error-msg'>{errorMsg}</div>
                </>}



            </div>

            </div> : <div>Loading...</div>}
            <p className='prod-details-head2'>Similar Items</p>
            <ProductSlider type={producttype}></ProductSlider>
    </div>
  )
}

export default Specificproductpage