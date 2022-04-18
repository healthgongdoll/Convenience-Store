import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Catalog} from "./components";
import RegisterContainer  from "./components/register/RegisterContainer";
import LoginContainer  from "./components/login/LoginContainer";
import Checkout from "./components/checkout";
import Cart from "./components/cart/Cart";
import OrderReview from "./components/orderReview";
import AdminEventTable from "./components/admin/adminEventTable";
import AdminOrdersTable from "./components/admin/adminOrdersTable";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminContainer from "./components/admin/adminContainer"
import axios from "axios";
import ProtectedRoute from "./ProtectedRoute";


import { ListItemSecondaryAction } from "@mui/material";

const App = () => {

  return (
    <Router>
      <Navbar  />
      <div className="App">
        <Routes>
          <Route exact path ="/register" element={<RegisterContainer />} />
          <Route exact path ="/login" element={<LoginContainer />} />
          <Route exact path="/" element={<Catalog />}/>
          <Route exact path="/checkout" element={<Checkout/>}/>
           {/* <ProtectedRoute path = "/checkout" component = {Checkout} isAuth = {isAuthLogin} /> */}
          <Route exact path="/cart" element={<Cart/>}/>
          <Route exact path="/review" element={<OrderReview/>}/>
          <Route exact path="/admin" element={<AdminContainer/>}/>
          <Route exact path="/adminEventTable" element={<AdminEventTable/>}/>
          <Route exact path="/adminOrdersTable" element={<AdminOrdersTable/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
