import React, { useState } from 'react';

export const Login = () => { 

    const facebook = async () => {
        window.open("http://localhost:3000/login/fb");
    };

    const google = async () => {

        window.open("http://localhost:5000/auth/google");
 
    };

    const github = async () => {
        window.open("http://localhost:5000/auth/github");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

            <img onClick={facebook} height={70} width={220} src="https://i.stack.imgur.com/Ar2Uo.png"></img>

            <img onClick={google} height={70} width={200} src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button.png" ></img>

            <img onClick={github} height={70} width={200} src="https://help.dropsource.com/wp-content/uploads/sites/4/2017/02/gh-login-button.png" ></img>

        </div>
    )
}
