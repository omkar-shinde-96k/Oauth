import React, { useState, useEffect } from 'react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import { Login } from './screens/Login'
import { Users } from './screens/Users';
import Logout from './screens/Logout';

const Home = () => {
  return (
    <div>
      <h1>welcome </h1>
    </div>
  )
}

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const getUser = () => {
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
          setUser("app compo user", resObject.user);
          console.log(resObject.token);

          if (!localStorage.getItem("jwt")) {
            localStorage.setItem('jwt', resObject.token);
          }

        })
        .catch((err) => {
          console.log("Error : ", err);
        });
    };
    getUser(); 
  }, [])

  return (
    <>

      <BrowserRouter>

        <Link to="/">Home</Link> &nbsp;
        <Link to="/login">login</Link> &nbsp;
        <Link to="/users">Users</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/logout">Logout</Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={user ? <Users /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
