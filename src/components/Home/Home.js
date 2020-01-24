import React, {useContext} from 'react';
import {LoginContext} from '../../contexts/LoginContext';

const Home = () => {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    return (
        <div>
            <h1>{loggedIn.status ? `Welcome back, ${loggedIn.username}` : 'Welcome to FlightApp'}</h1>
            <div className="pictures"><img src={'../../../logo512.png'}></img></div>
        </div>
    )
}

export default Home;
