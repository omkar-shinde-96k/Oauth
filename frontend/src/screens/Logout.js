

import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
function Logout() {
    let navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("jwt");
        navigate("/"); 
    }, [])
    return (
        <div>

        </div>
    )
}

export default Logout
