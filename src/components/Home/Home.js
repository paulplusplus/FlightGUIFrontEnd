import React, {useContext} from 'react';
import {LoginContext} from '../../contexts/LoginContext';

const Home = () => {
    //const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [loggedIn] = useContext(LoginContext);
    return (
        <div className="home-screen">
            <h1>{loggedIn.status ? `Welcome back, ${loggedIn.username}` : 'Welcome to FlightApp'}</h1>
            <div className="pictures"><img alt="home" src={'../../../icons/icon-192x192.png'}></img></div>
        </div>
    )
}

export default Home;
