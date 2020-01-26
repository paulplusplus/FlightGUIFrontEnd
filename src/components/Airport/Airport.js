import React, {useState, useEffect} from 'react'

const Airport = () => {
    useEffect(() => {
        getAirports();
    },[]);
    const [airports, setAirports]= useState();

   async function getAirports(){
        try{
            const data = await fetch('/api/airports');
        const json = await data.json();
        setAirports(json);
        console.log(json);
        } catch (err) {
            console.error(err);
        }
        //{(getFlights ? flights.map((flight) => <p>flight.AirlineName</p>) : <h4>There are no flights.</h4>)}
        
    }

    return (
        <div>
            <h1>Airport</h1>
            {(airports ? airports.map((airport) => <div className="item-div" key={airport.AirportID}><p>{airport.AirportName}</p></div>) : <h4>There were no airports found.</h4>)}
        </div>
    )
}

export default Airport;


