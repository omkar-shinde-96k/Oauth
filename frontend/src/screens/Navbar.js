import React from 'react'
import { 
    Link
} from "react-router-dom"; 

export function Navbar({ user }) {

    const Logout = () => {
        fetch("http://localhost:3000/logout");
        localStorage.removeItem("jwt");
    }


    return (
        <div>

            <Link to="/" > Home</Link> &nbsp;

            <Link to="/users">Users</Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            {user ? <a href="/" onClick={Logout}>Logout</a> : <Link to="/login">login</Link>}

        </div>
    )
}

