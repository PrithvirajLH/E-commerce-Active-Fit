import React from 'react'
import './Sliderproductcard.css';
import {Link} from 'react-router-dom';

const Sliderproductcard = (product) => {
  let p =product.product;
  let overallltax = 10/100;
  let overcommission = 10/100;
  let extraforfun = 10/100;
  let mrp=parseFloat(p.price);
  mrp = Math.round(mrp+ overallltax*mrp + overcommission*mrp + extraforfun+mrp);
  const salesprice=Math.round(mrp-extraforfun*mrp);
  return (
    <div className="mini-product-container">
      <div className='mini-img-container'>
        <img src={p.productimage} alt='..' />
      </div>

      <div className='mini-product-details'>
        <p className='mini-producttitle'>{p.producttitle}</p>

        <div className='mini-price-container'>
             <p className='mrp'>Price: <p className='rate'>${mrp}</p></p>
             <p className='salesprice'>Discount Price: <p className='rate'>${salesprice}</p></p>
             <p className='yousave'>You Save:$ {mrp-salesprice} </p>
           </div>
           <a href={`/product/${p.producttype}/${p.id}`}>
           <button className='showmore-btn'>Show more &gt;</button>
           </a>
      </div>
    </div>
  )
}

export default Sliderproductcard