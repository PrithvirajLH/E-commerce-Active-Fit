import React, {useState, useEffect} from 'react'
import './Allproductpage.css'
import Productcontainer from './Productcontainer'
import Navbar from '../Navbar'
import { collection, query,onSnapshot,getDocs, QuerySnapshot, where} from 'firebase/firestore'
import { db } from '../../firebaseConfigs/firebaseConfig'

const Allproductpage = (props) => {
    const [products,setproducts]=useState([]);
    useEffect(()=>{
       const getProducts = () =>{
        const productsArray = [];
        const path = `products-images${props.type.toUpperCase()}`;
        //console.log(path);
        getDocs(collection(db,path)).then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
              productsArray.push({...doc.data(),id:doc.id})
              //console.log(doc.id,"=>",doc.data());
            })
            setproducts(productsArray)
        }).catch((error)=>{
          console.log(error.message);
        })
       };
       getProducts();
    },[]);

  return (
    <div className='allproductpage'>
        <Navbar/>
        <div className='heading'>
            <p>Top Results for {props.type}</p>
        </div>
        <div className='allproductcontainer'>
            {products.map((product)=>(
              <Productcontainer
              key={product.id}
              product={product}
              />
            ))}
          
        </div>
    </div>
  )
}

export default Allproductpage