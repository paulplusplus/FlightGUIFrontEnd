import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {LoginContext} from '../../contexts/LoginContext';


const AirlineFlights = (props) => {
    useEffect(() => {
        flightByAirline();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [loggedIn] = useContext(LoginContext);
    const {airline} = props.location.state;
    const [resp, setResp] = useState();

    async function flightByAirline(){
        try{
            const req = await fetch(`/api/flights/${airline.AirlineID}`);
            const json = await req.json();
            if(req.ok){
                setResp(json); //We have a response, now put into state
            }
        } catch (err) {
            console.log(err);
        }
    }
    

    return (
        <div>
            <h2>Flights for {airline.AirlineName}</h2>
            {resp ? resp.map((flight) =>  
                <div key={flight.FlightID} className="item-div">
                    <p>FlightID: {flight.FlightID}</p>
                    <p>Airline: {flight.AirlineName}</p>
                    <p>Origin: {flight.Origin}</p>
                    <p>Destination: {flight.Destination}</p>
                    <p>Fare: {flight.Fare}</p>
                    <p>Date: {flight.FlightDate}</p>
                    <p>Time of departure: {flight.DepartureTime}</p>
                    <p>Estimated flight time: {flight.FlightTime}</p>
                    <br />
                    {loggedIn.status ? <Link className='link' to={{
                    pathname: `/flights/${flight.FlightID}`,
                    state: {
                        flight: flight
                    }
                }}>Reserve here</Link>  : <p>Log in to reserve</p>}
                    
                </div>
            ) : <h4>No flights for this airline.</h4>}
            <div className="item-div"><Link className='link' to={'/airlines'}>Go back</Link></div>
        </div>
    )
}

export default AirlineFlights;

