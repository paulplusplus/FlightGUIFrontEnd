import React, {useState, useContext} from 'react';
import {LoginContext} from '../../contexts/LoginContext';
import {Redirect, Link} from 'react-router-dom';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const updateLogin = (e) => {
        setLogin(e.target.value);
        //console.log(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
        //console.log(e.target.value);
    }
    const output = async (e) => {
        try{
            e.preventDefault();
            //const resp = await fetch('/api');
            //const json = await resp.json();
            
            //console.log(json);
            let myRe = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
            if(myRe.test(login)){
                //If the regex matches, an email was provided
                
                const response = await fetch('/api/customers/auth', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({Email: `${login}`,
                    Password: `${password}`})
                });
                const json = await response.json();
                
                //console.log(response.status);
                if(response.status == 200){
                    //console.log("SuccessEmail");
                    setLoggedIn({status: true, username: `${json.UserName}`, CustID: `${json.CustID}`});
                } else {
                    //console.log("ErrorEmail");
                    setLogin('');
                    setPassword('');
                }
            } else {
                //If no regex match, a username was provided
                const response = await fetch('/api/customers/auth', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({UserName: `${login}`,
                    Password: `${password}`})
                });
                
                const json = await response.json();
                //console.log(json);
                //console.log(response.status);
                if(response.status == 200){
                    setLoggedIn({status: true, username: `${json.UserName}`, CustID: `${json.CustID}`});
                    //console.log("SuccessUsename");
                } else{
                    setLogin('');
                    setPassword('');
                    //console.log("ErrorEmail");
                } 
            }
            
        } catch(err){
            console.error(err);
        }
        
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={output}>
                <div className="input">
                    <h4>Username or Email</h4>
                    <input type="text" name="login" value={login} onChange={updateLogin}></input>
                </div>
                <div className="input">
                    <h4>Password</h4>
                    <input type="password" name="password" value={password} onChange={updatePassword}></input>
                </div>
            
                <button type="submit" disabled={!(login && password)}>Submit</button>
            </form>
            <div className="bottom-link">
                <Link to={"/register"}>Sign up here</Link>
                <a>Forgot password?</a>
            </div>
            {(loggedIn.status ? <Redirect to={"/"} /> : null)}
        </div>
    )
}

export default Login;
