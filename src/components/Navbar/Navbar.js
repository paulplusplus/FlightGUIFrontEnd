import React, {useContext, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {LoginContext} from '../../contexts/LoginContext';


const Navbar = (props) => {
    
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [sidelink, setSidelink] = useState(true);

    function handleClick(e){
        e.preventDefault();
        setLoggedIn({status: false, username: '', CustId: '', Email: ''});
        //props.history.push("/");
    }
    
    return (
        <nav>
            <Link to="/" onClick={() => setSidelink(true)}><img src={require('./img/globe128.png')} alt="Home"></img></Link>
            <ul className={sidelink ? "nav-links" : "nav-links nav-active"}>
                <Link className='link' to="/"><li onClick={() => setSidelink(!sidelink)}>Home</li></Link>
                <Link className='link' to="/flights" onClick={() => setSidelink(!sidelink)}><li>Flights</li></Link>
                <Link className='link' to="/airports" onClick={() => setSidelink(!sidelink)}><li>Airports</li></Link>
                <Link className='link' to="/airlines" onClick={() => setSidelink(!sidelink)}><li>Airlines</li></Link>
                <Link className='link' to={loggedIn.status ? "/reservations" : "/login"} onClick={() => setSidelink(!sidelink)}><li>{loggedIn.status ? "Your reservations" : "Login/Register Here"}</li></Link>
                {loggedIn.status ? <Link className='link' to="/customer" onClick={() => setSidelink(!sidelink)}><li>{loggedIn.username}</li></Link> : <p>Please login</p>}
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

