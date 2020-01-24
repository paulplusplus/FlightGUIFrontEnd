import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {LoginContext} from '../../contexts/LoginContext';

const Navbar = (props) => {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    function handleClick(e){
        e.preventDefault();
        setLoggedIn({status: false, username: ''});
    }
    return (
        <nav>
            <img src={require('./img/globe128.png')} alt="Home"></img>
            <ul className="nav-links">
                <Link to="/"><li>Home</li></Link>
                <Link to="/flights"><li>Flights</li></Link>
                <Link to="/airports"><li>Airports</li></Link>
                <Link to="/airlines"><li>Airlines</li></Link>
                <Link to={loggedIn.status ? "/reservations" : "/login"}><li>{loggedIn.status ? "Your reservations" : "Login/Register Here"}</li></Link>
                <li>{loggedIn.status ? loggedIn.username : 'Please login'}</li>
                {loggedIn.status ? <li onClick={handleClick}>Log out</li> : null}
            </ul>
            
        </nav>
    )
}

export default Navbar;
