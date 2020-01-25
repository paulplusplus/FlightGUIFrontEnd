import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [created, setCreated] = useState(false);

    const updateUsername = (e) => {
        setUsername(e.target.value);
    }
    const updateEmail = (e) => {
        setEmail(e.target.value);
        //console.log(e.target.value);
    }
    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    async function registerUser(){
        //We need to make a fetch request to server
        try{
            const request = await fetch('api/customers/register', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    UserName: `${username}`,
                    Email: `${email}`,
                    Password: `${password}`})
            });
            const json = await request.json();
            if(request.ok){
                //customer made, do something here  
                console.log(json);
                setCreated(true);   
            }
        } catch(err) {
            console.log(err);
        }
    }
    return (
        <div className="login">
            <h1>Register here</h1>
            <form onSubmit={registerUser}>
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
            
                <button type="submit" disabled={!(username && email && password)}>Submit</button>
            </form>
            <div className="regbox">
                <p>Your information will never be sold to anyone.</p>
                <p>You will have to login again after creating an account.</p>
            </div>
            {(created ? <Redirect to={"/login"} /> : null)}
        </div>
    )
}

export default Register;
