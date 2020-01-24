import React, {useState, useEffect} from 'react';

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
            
            {(flights ? flights.map((flight) => <p key={flight.FlightID}>{flight.AirlineName}</p>) : <h4>There are no flights.</h4>)}
        </div>
    )
}

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
