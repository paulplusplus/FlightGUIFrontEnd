import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'; //Link back to previous airport page


const AirportDetail = (props) => {
    useEffect(() => {
        getDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const {airport} = props.location.state; //We need to remember to call this exactly as it is in the previous page when we link here.
    const [resp, setResp] = useState(false); //Check if results are back
    const [from, setFrom] = useState([]);
    const [to, setTo] = useState([]);

    async function getDetails(){
        //Fetch all flights to/from this airport
        try{
            const request = await fetch(`/api/flights/airport/${airport}`); //Passes AirportName to backend, such as JFK
            const json = await request.json();
            if(request.ok){
                console.log(json);
                var flightto = [];
                var flightfrom = [];
                json.forEach(flight => {
                    if(flight.Origin === airport){
                        flightfrom.push(flight);
                    }
                    if(flight.Destination === airport){
                        flightto.push(flight);
                    }
                });
                setTo(flightto);
                setFrom(flightfrom);
                setResp(true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <div>
            <h1>{airport}</h1>
            <h2>{`Flights to ${airport}`}</h2>
            {resp ? to.map((flight) => 
                <div className="item-div" key={flight.FlightID}>
                    <p>FlightID: {flight.FlightID}</p>
                    <p>Airline: {flight.AirlineName}</p>
                    <p>Origin: {flight.Origin}</p>
                    <p>Destination: {flight.Destination}</p>
                    <p>Fare: {flight.Fare}</p>
                    <p>Date: {flight.FlightDate}</p>
                    <p>Time of departure: {flight.DepartureTime}</p>
                    <p>Estimated flight time: {flight.FlightTime}</p>
                    <br />
                </div>) : <p>No flights</p>}

                <h2>{`Flight from ${airport}`}</h2>
            {resp ? from.map((flight) => 
                <div className="item-div" key={flight.FlightID}>
                    <p>FlightID: {flight.FlightID}</p>
                    <p>Airline: {flight.AirlineName}</p>
                    <p>Origin: {flight.Origin}</p>
                    <p>Destination: {flight.Destination}</p>
                    <p>Fare: {flight.Fare}</p>
                    <p>Date: {flight.FlightDate}</p>
                    <p>Time of departure: {flight.DepartureTime}</p>
                    <p>Estimated flight time: {flight.FlightTime}</p>
                    <br />
                </div>) : <p>No flights</p>}
            <div className="item-div"><Link to='/airports' className='link'>Go back</Link></div>
        </div>
    )
}

export default AirportDetail;

//Here, we'll request all flights where either to or from is this airport.
//We made a choice to use names like 'JFK' instead of an AirportID.
//So, we should send the name as a parameter.


//Origin, Destination



/* <Link className='link' to={{
                    pathname: `/flights/${flight.FlightID}`,
                    state: {
                        flight: flight
                    }
            }}>{`Flight from ${flight.Origin} to ${flight.Destination}`}</Link> */