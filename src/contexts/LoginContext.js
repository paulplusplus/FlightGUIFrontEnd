import React, { useState, createContext, useEffect } from 'react';

export const LoginContext = createContext();

export const LoginProvider = (props) => {
    useEffect(() => {
        const data = localStorage.getItem("login-status");
        if(data){
            setLoggedIn(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("login-status", JSON.stringify(loggedIn));
    })

    const [loggedIn, setLoggedIn] = useState({
        status: false,
        username: ''
    });

    return(
        <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
            {props.children}
        </LoginContext.Provider>
    )
    
}