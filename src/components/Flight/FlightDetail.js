import React, {useContext, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {LoginContext} from '../../contexts/LoginContext';

const FlightDetail = (props) => {
    const {flight, link} = props.location.state;
    //const [loggedIn, setLoggedIn] = useContext(LoginContext);
    const [loggedIn] = useContext(LoginContext);
    const [reserved, setReserved] = useState(false);

    async function reserveFlight(e){
        e.preventDefault();
        try{
            const request = await fetch('/api/reservations/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CustID: loggedIn.CustId,
                    FlightID: flight.FlightID,
                    GuiSearch: 1
                })
            });
            const json = request.json();
            console.log(json);
            if(request.ok){
                setReserved(true);
            } else {
                console.log("fail");
                console.log(request.status);
                setReserved('error');
            }
            
        } catch (err) {
           console.error(err);
        }
    }

    async function removeReservation() {
        //Remove the customer's reservation
        var body = {CustID: loggedIn.CustId, FlightID: flight.FlightID};
        //Now, we Fetch delete
        try{
            const req = await fetch('/api/reservations/', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(body)
            });
            const json = await req.json();
            console.log(json);
            setReserved('deleted');
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div>
            <h2>Flight Information</h2>
            <div className="item-div">
            <p>FlightID: {flight.FlightID}</p>
                <p>Airline: {flight.AirlineName}</p>
                <p>Origin: {flight.Origin}</p>
                <p>Destination: {flight.Destination}</p>
                <p>Fare: {flight.Fare}</p>
                <p>Date: {flight.FlightDate}</p>
                <p>Time of departure: {flight.DepartureTime}</p>
                <p>Estimated flight time: {flight.FlightTime}</p>
                <br />
                {link ? <p className='link' onClick={removeReservation}>Remove Reservation</p> : null}
                {(loggedIn.status && !link)? <button onClick={reserveFlight}>Reserve this flight</button> : null}
                {(!loggedIn.status) ?  <Link className='link' to={'/flights'}>Go back</Link> : null}
                {reserved ? <Redirect to={"/reservations"}></Redirect> : null}
            </div>
            {link ? <div className="item-div"><Link className='link' to={'/reservations'}>Go back</Link></div>: null}
            {(loggedIn.status && !link) ? <div className="item-div"><Link className='link' to={'/flights'}>Go back</Link></div>: null}
        </div>
    )
}

export default FlightDetail;
//'airportdet'

/*<p>FlightID: {props.FlightID}</p>
                <p>Airline: {props.AirlineName}</p>
                <p>Origin: {props.Origin}</p>
                <p>Destination: {props.Destination}</p>
                <p>Fare: {props.Fare}</p>
                <p>Date: {props.FlightDate}</p>
                <p>Time of departure: {props.DepartureTime}</p>             
                <p>Estimated props time: {props.FlightTime}</p>             <button onClick={reserveFlight}>Reserve this flight</button>
                <br />*/