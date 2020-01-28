import React, {useContext} from 'react';
import {LoginContext} from '../../contexts/LoginContext';
import {Link} from 'react-router-dom';

const Customer = () => {

    const [loggedIn] = useContext(LoginContext); //Use our logged in context


    return (
        <div>
            <h1>Your information</h1>
            <div className="item-div">
            <p>Username: {loggedIn.username}</p>
            <p>Email: {loggedIn.Email}</p>
            <Link className='link' to='/'>Back</Link>
            </div>
            <div className="item-div">
                <Link className='link' to='/modifycust'>Click here to modify your information</Link>
            </div>
        </div>
    )
}

export default Customer;
