import React, { useState, useEffect } from 'react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Login } from './screens/Login'
import { Users } from './screens/Users';
import { Home } from './screens/Home';
import { Navbar } from './screens/Navbar';



function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    fetch("http://localhost:3000/getLoginUser", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Authorization": localStorage.getItem("jwt")
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        setUser(resObject.user);
        if (!localStorage.getItem("jwt")) {
          localStorage.setItem('jwt', resObject.token);
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
      });

  }, [])

  return (
    <BrowserRouter>

      <Navbar user={user} />    {/*  navigation links */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={user ? <Users /> : <Navigate to="/login" />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
