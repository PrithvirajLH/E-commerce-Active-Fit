import React, { useState,useEffect } from 'react';
import './CartCard.css'
import { deleteDoc, doc,setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfigs/firebaseConfig';
const CartCard = (props) => {

  const [prodquantity,setProdQuantity]=useState(props.itemdata.quantity);
  let p=props.itemdata.product;
    let overallltax = 10/100;
    let overcommission = 10/100;
    let extraforfun = 10/100;
    let mrp=parseFloat(p.price);
    mrp = Math.round(mrp+ overallltax*mrp + overcommission*mrp + extraforfun+mrp);
    const salesprice=Math.round(mrp-extraforfun*mrp)*prodquantity;

   
    const increasequantity = async()=>{
      setProdQuantity(prodquantity+1);

      const itemref = doc(db,`cart-${props.userid}`,`${props.itemdata.id}`)
      await updateDoc (itemref,{
        quantity: prodquantity+1
      }).then(()=>{})
    }
    const decreasequantity = async() =>{
      if(prodquantity >=1){
        setProdQuantity(prodquantity-1);

        const itemref = doc(db,`cart-${props.userid}`,`${props.itemdata.id}`)
      await updateDoc (itemref,{
        quantity: prodquantity-1
      }).then(()=>{})
      }
    }

    const  deletecartitem = async() =>{
      await deleteDoc(doc(db,`cart-${props.userid}`, `${props.itemdata.id}`))
      .then(()=>{
        //console.log('doc deleted')
      })

    }

  return (
    <div className='cart-prod-container'>
      <div className='cart-prod-imgtitle'>
        <div className='prod-image'><img src={p.productimage}/></div>
        <div className='prod-title'>{p.producttitle}</div>

      </div>
      <div className='prodquantity-div'>
        <button onClick={increasequantity}>+</button>
        <p>{prodquantity}</p>
        <button onClick={decreasequantity}>-</button> 
      </div>
      <div className='prodprice'>${salesprice}</div>
      <button className='deletebtn' onClick={deletecartitem}>
        <img src='https://cdn-icons-png.flaticon.com/128/10065/10065140.png' alt='delete'/>
      </button>
    </div>
  )
}

export default CartCard