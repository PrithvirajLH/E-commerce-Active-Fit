import React, {useState,useEffect} from 'react'
import { auth,db, storage } from '../firebaseConfigs/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { collection,getDocs,query,where,addDoc,updateDoc } from 'firebase/firestore';
import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom'
import './AddProduct.css'
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';


const AddProduct = () => {
    const [producttitle,setProductTitle]=useState("");
    const [producttype,setProductType]=useState("");
    const [keySpecs,setKeySpecs]=useState("");
    const [description,setDescription]=useState("");
    const [type,setType]=useState("");
    const [customersupport,setCustomerSupport]=useState("");
    const [price,setPrice]=useState("");
    const [productimage,setProductImage]=useState("");

    const [imageError,setImageError]=useState("");
    const [successMsg,setSuccessMsg]=useState("");
    const [uploadError,setUploadError]=useState("");

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

      const handleAddProduct = (e)=>{
        e.preventDefault();
        const storageRef = ref(storage,`product-images${producttype.toUpperCase()}/${Date.now()}`);
        //console.log(storageRef._location.path);

        uploadBytes(storageRef,productimage)
        .then(()=>{
          getDownloadURL(storageRef).then(url=>{
           addDoc(collection(db,`products-images${producttype.toUpperCase()}`),{
            producttitle,
            producttype,
            type,
            description,
            customersupport, 
            price,
            productimage:url
           }) 
          })
        })
      }

      const types= ['image/jpg','image/jpeg','image/png','image/PNG'];
      const handleProductImg = (e)=>{
        e.preventDefault();
        let selectedFile = e.target.files[0];
        if(selectedFile){
          if(selectedFile && types.includes(selectedFile.type)){
            setProductImage(selectedFile);
            setImageError('');
          }
          else{
            setProductImage('null');
          setImageError('Please select a valid image file type(jpg.png,jpeg)');
          }
        }
        else{
          setImageError('Please select our file'); 
          }
      }
      const loggeduser = GetCurrentUser();
  return (
    <div>
        <Navbar/>
        {loggeduser && loggeduser[0].Email=="chinnuhulgur@gmail.com" ?
        <div className='addprod-container'>
            <form className='addprod-form' onSubmit={handleAddProduct}>
                <p>Add data</p>
                {successMsg && <div className='success-msg'>{successMsg}</div>}
                {uploadError && <div className='error-msg'>{uploadError}</div>}
                 <label>Product Title</label>
                 <input type='text' onChange={(e)=>{setProductTitle(e.target.value)}} placeholder='Product Title'/>

                 <label>Product Type</label>
                 <input type='text' onChange={(e)=>{setProductType(e.target.value)}} placeholder='Product Type'/>


                 <label>Type</label>
                 <input type='text' onChange={(e)=>{setType(e.target.value)}} placeholder='...'/>

                 <label>Image</label>
                 <input type='file' onChange={handleProductImg} />
                 {imageError&&<>
                 <div className='error-msg'>{imageError}</div>
                 </>}

                 <label>Key Specifications</label>
                 <textarea onChange={(e)=>{setKeySpecs(e.target.value)}} placeholder='Enter some key specifications'> </textarea>


                 <label>Description</label>
                 <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder='Describe your Product in breif'> </textarea>

                 <label>Price Without Tax</label>
                 <input type='text' onChange={(e)=>{setPrice(e.target.value)}} placeholder='Enter price without tax'/>

                 <label>Customer Support</label>
                 <input type='text' onChange={(e)=>{setCustomerSupport(e.target.value)}} placeholder='Customer Support Email, Phone or Address'/>

                 <button type='submit'>Add</button>


            </form>
        </div>:<div>You don't have access</div>
    }
    </div>
  )
}

export default AddProduct