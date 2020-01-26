import React, {useContext, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {LoginContext} from '../../contexts/LoginContext';


const Navbar = (props) => {
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [sidelink, setSidelink] = useState(false);
    function handleClick(e){
        e.preventDefault();
        setLoggedIn({status: false, username: '', CustID: ''});
        //props.history.push("/");
    }
    
    return (
        <nav>
            <img src={require('./img/globe128.png')} alt="Home"></img>
            <ul className={sidelink ? "nav-links" : "nav-links nav-active"}>
                <Link className='link' to="/"><li>Home</li></Link>
                <Link className='link' to="/flights"><li>Flights</li></Link>
                <Link className='link' to="/airports"><li>Airports</li></Link>
                <Link className='link' to="/airlines"><li>Airlines</li></Link>
                <Link className='link' to={loggedIn.status ? "/reservations" : "/login"}><li>{loggedIn.status ? "Your reservations" : "Login/Register Here"}</li></Link>
                <p>{loggedIn.status ? loggedIn.username : 'Please login'}</p>
                {loggedIn.status ? <li onClick={handleClick}>Log out</li> : <Redirect to={"/"}></Redirect>}
            </ul>
            <div className={sidelink ? "hamburger" : "hamburger toggle"} onClick={() => setSidelink(!sidelink)}>
                <div className="burg1"></div>
                <div className="burg2"></div>
                <div className="burg3"></div>
            </div>
        </nav>
    )
}

export default Navbar;


//nav-links