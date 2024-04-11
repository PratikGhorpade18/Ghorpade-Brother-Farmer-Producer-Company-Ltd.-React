import React from 'react';
import {BrowserRouter,Routes, Route,   } from "react-router-dom";
import Login from './components/loginpage/Login';
import Home from './components/Home/Home'
import FarmerList from './components/FarmerList/FarmerList';
import DailyProductionList from './components/DailyProducationList/DailyProductionList';
import Products from './components/Products/Products';
import CustomerDetails from './components/CustomerDetails/CustomerDetails';
import AllProduct from './components/AllProduct/AllProduct'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Login />} />
           <Route path="login" element={<Login />} />
           <Route path="Home" element={<Home />} />
           <Route path='FarmerList' element={<FarmerList />}/>
           <Route path='DailyProductionList' element={<DailyProductionList />}/>
           <Route path='products' element={<Products />}/>
           <Route path='CustomerDetails' element={<CustomerDetails />}/>
           <Route path='AllProduct' element={<AllProduct />}/>
        </Routes>
</BrowserRouter>
     </div>
  );
}

export default App;
