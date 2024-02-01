import React from 'react'
import './Productcontainer.css' 
import { Link } from 'react-router-dom'; 
const Productcontainer = (product) => {
  let p=product.product;
  //console.log(p);
  let overallltax = 10/100;
  let overcommission = 10/100;
  let extraforfun = 10/100;
  let mrp=parseFloat(p.price);
  mrp = Math.round(mrp+ overallltax*mrp + overcommission*mrp + extraforfun+mrp);
  const salesprice=Math.round(mrp-extraforfun*mrp);

  return (
         <div className='product-container'>
         <img src={p.productimage} />
         <div className='product-details'>
           <a href={`/product/${p.producttype}/${p.id}`}>
           <button className='producttitle'>{p.producttitle}</button>
           </a>
           <div className='price-container'>
             <p className='mrp'>Price: <p className='rate'>${mrp}</p></p>
             <p className='salesprice'>Discount Price: <p className='rate'>${salesprice}</p></p>
             <p className='yousave'>You Save:$ {mrp-salesprice} </p>
           </div>
           <a href={`/product/${p.producttype}/${p.id}`}><button className='showmore-btn'>More Details &gt;</button></a>
         </div>
       </div>
  )
}

export default Productcontainer