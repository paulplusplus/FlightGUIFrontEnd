import React, {useState, useContext} from 'react';
import {LoginContext} from '../../contexts/LoginContext';
import {Redirect} from 'react-router-dom';

const ModifyCust = () => {

    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [modified, setModified] = useState(false);

    function updateUsername(e){
        setUsername(e.target.value);
    }

    function updateEmail(e){
        setEmail(e.target.value);
    }

    function updatePassword(e){
        setPassword(e.target.value);
    }
    
    async function modifyUser(e){
        e.preventDefault();
        var send = {};
        var un = loggedIn.username;
        var em = loggedIn.Email;

        if(username){
            send.UserName = username;
            un = username;
        }
        if(email){
            send.Email = email;
            em = email;
        }
        if(password){
            send.Password = password;
        }
        //Now, we can run the fetch PUT request
        try{
            const req = await fetch(`/api/customers/${loggedIn.CustId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(send)
            });
            const json = await req.json();
            console.log(json);
            setLoggedIn({status: true, username: un, CustId: loggedIn.CustId, Email: em});
            setModified(true);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <div className="login">
            <h1>Modify your details</h1>
            <form onSubmit={modifyUser}>
                <div className="input">
                    <h4>Username</h4>
                    <input type="text" name="username" value={username} onChange={updateUsername}></input>
                </div>
                <div className="input">
                    <h4>Email</h4>
                    <input type="email" name="email" value={email} onChange={updateEmail}></input>
                </div>
                <div className="input">
                    <h4>Password</h4>
                    <input type="password" name="password" value={password} onChange={updatePassword}></input>
                </div>
            
                <button type="submit">Submit</button>
            </form>
            <div className="regbox">
                <p>Only enter details you wish to change</p>
                
            </div>
            {(modified ? <Redirect to={"/"} /> : null)}
        </div>
        </div>
    )
}

export default ModifyCust;
