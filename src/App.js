import React from 'react';
import {BrowserRouter,Routes, Route,   } from "react-router-dom";
import Login from './components/loginpage/Login';
import Home from './components/Home/Home'
import FarmerList from './components/FarmerList/FarmerList';
import DailyProductionList from './components/DailyProducationList/DailyProductionList';
import Products from './components/Products/Products';
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
        </Routes>
</BrowserRouter>
     </div>
  );
}

export default App;
