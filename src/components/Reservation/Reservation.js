import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';


const Reservation = () => {

    useEffect(() => {
        getReservation();
    },[]);

    const [reservations, setReservations] = useState();
    

    async function getReservation(){
        const reserve = await fetch('/api/reservations');
        const json = await reserve.json();
        if(reserve.ok){
            console.log(json);
            setReservations(json);
        } else {
            //setReservation(<h4> An error occurred</h4>);
            console.error("error");
        }
        
    }

    return (
        <div>
            <h1>Reservations</h1>
            {reservations ? reservations.map((reserv) => <div key={reserv.FlightID} className="item-div"><Link className='link' to={{  
                pathname: `/flights/${reserv.FlightID}`,
                state: {
                    flight: reserv,
                    link: "reservepath"
                }
            }}>{`Flight from ${reserv.Origin} to ${reserv.Destination}`}</Link></div>) : <h4>You have no reservations</h4>}
        </div>
    )
}

export default Reservation;

/* {(flights ? flights.map((flight) => <div key={flight.FlightID}><Link to={{
    pathname: `/flights/${flight.FlightID}`,
    state: {
        flight: flight
    }
}}>{`Flight from ${flight.Origin} to ${flight.Destination}`}</Link>
    
</div>) : <h4>There are no flights.</h4>)} */
