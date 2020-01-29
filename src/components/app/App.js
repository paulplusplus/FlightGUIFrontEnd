import React from 'react';
//import logo from './logo.svg';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Navbar from '../Navbar/Navbar';
import Flight from '../Flight/Flight';
import FlightDetail from '../Flight/FlightDetail';
import Airport from '../Airport/Airport';
import Airline from '../Airline/Airline';
import Home from '../Home/Home';
import Reservation from '../Reservation/Reservation';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Customer from '../Customer/Customer';
import ModifyCust from '../Customer/ModifyCust';
import AirlineFlights from '../Airline/AirlineFlights';
import {LoginProvider} from '../../contexts/LoginContext';


function App() {
  return (
    <LoginProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="page-content">
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/flights" exact component={Flight} />
            <Route path="/flights/:id" component={FlightDetail} />
            <Route path="/airlines" exact component={Airline} />
            <Route path="/airlines/:id" component={AirlineFlights} />
            <Route path="/airports" component={Airport} />
            <Route path="/reservations" component={Reservation} />
            <Route path="/register" component={Register} />
            <Route path='/customer' component={Customer} />
            <Route path='/modifycust' component={ModifyCust} />
          </div>
        </div>
      </Router>
    </LoginProvider>
  );
}

export default App;

