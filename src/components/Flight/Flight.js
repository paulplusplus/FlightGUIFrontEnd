import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const Flight = () => {
    useEffect(() => {
        getFlights();
    },[]);
    const [flights, setFlights]= useState();

   async function getFlights(){
        try{
            const data = await fetch('/api/flights');
        const json = await data.json();
        setFlights(json);
        console.log(json);
        //return true;
        } catch (err) {
            console.err(err);
            //return false;
        }
        //{(getFlights ? flights.map((flight) => <p>flight.AirlineName</p>) : <h4>There are no flights.</h4>)}
        
    }

    return (
        <div>
            <h1>Flights</h1>
            
            {(flights ? flights.map((flight) => <div key={flight.FlightID}><Link to={{
                pathname: `/flights/${flight.FlightID}`,
                state: {
                    flight: flight
                }
            }}>{`Flight from ${flight.Origin} to ${flight.Destination}`}</Link>
                
            </div>) : <h4>There are no flights.</h4>)}
        </div>
    )
}

//<p key={flight.FlightID}>{flight.AirlineName}</p>
export default Flight;

/*import React, { Component } from "react";

class Flight extends Component {
    constructor(props){
        super(props);
        this.state = {
            flights: ''
        };
    }

    render() {
        return(
            <div>
                <h1>Flights</h1>
                {getFlights}
            </div>

        )
    }
} */

/* {flights.map((flight) => {
    return (<h1 key={item.id}><Link to={`/shop/${item.id}`}>{item.name}</Link></h1>);
})
}  */

/*
<p>FlightID: {flight.FlightID}</p>
                <p>Airline: {flight.AirlineName}</p>
                <p>Origin: {flight.Origin}</p>
                <p>Destination: {flight.Destination}</p>
                <p>Fare: {flight.Fare}</p>
                <p>Date: {flight.FlightDate}</p>
                <p>Time of departure: {flight.DepartureTime}</p>
                <p>Estimated flight time: {flight.FlightTime}</p>
                <br />
*/