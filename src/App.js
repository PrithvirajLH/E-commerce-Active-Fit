import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import pgFOF from './Components/pgFOF';
import Cart from './Components/Cart';
import UserProfile from'./Components/UserProfile';
import AddProduct from './Components/AddProduct';
import Allproductpage from './Components/Some-Product-Components/Allproductpage';
import Specificproductpage from './Components/Some-Product-Components/Specificproductpage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/home' element={<Home/>} />
        <Route exact path='/signup' element={<Signup/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/cart' element={<Cart/>} />
        <Route exact path='/userprofile' element={<UserProfile/>} />
        <Route exact path='/sellproduct' element={<AddProduct/>} />
        <Route exact path="/product-types/mens" element={<Allproductpage type={'Mens'}/>} />
        <Route exact path="/product-types/womens" element={<Allproductpage type={'Womens'}/>} />
        <Route path="/product/:producttype/:id" element={<Specificproductpage />}/>
        <Route exact path='/cartdata' element={<Cart/>} />
        <Route path="*" element={<pgFOF/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
