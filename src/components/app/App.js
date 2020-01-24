import React from 'react';
//import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import './App.css';
import Navbar from '../Navbar/Navbar';
import Flight from '../Flight/Flight';
import Airport from '../Airport/Airport';
import Airline from '../Airline/Airline';
import Home from '../Home/Home';
import Reservation from '../Reservation/Reservation';
import Login from '../Login/Login';
import {LoginProvider} from '../../contexts/LoginContext';


function App() {
  return (
    <LoginProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/flights" component={Flight} />
          <Route path="/airlines" component={Airline} />
          <Route path="/airports" component={Airport} />
          <Route path="/reservations" component={Reservation} />
        </div>
      </Router>
    </LoginProvider>
  );
}

function Hello(props){
  return(
    <h1>Hello {props.title}</h1>
  )
}
export default App;
