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
    }

    return (
        <div>
            <h1>Flights</h1>
            
            {(flights ? flights.map((flight) => <div className="item-div" key={flight.FlightID}><Link className='link' to={{
                pathname: `/flights/${flight.FlightID}`,
                state: {
                    flight: flight
                }
            }}>{`Flight from ${flight.Origin} to ${flight.Destination}`}</Link>
                
            </div>) : <h4>There are no flights.</h4>)}
        </div>
    )
}

export default Flight;
