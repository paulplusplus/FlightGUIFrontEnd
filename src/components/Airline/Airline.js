import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const Airline = () => {
    useEffect(() => {
        getAirlines();
    }, []);
    const [airlines, setAirlines] = useState();

    async function getAirlines(){
        try{
            const data = await fetch('/api/airlines');
            const json = await data.json();
            setAirlines(json);
            console.log(json);
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Airlines</h1>
            {(airlines ? airlines.map((airline) => <div className="item-div" key={airline.AirlineID}>
                <Link className='link' to={{
                pathname: `/airlines/${airline.AirlineID}`,
                state: {
                    airline: airline
                }
            }}>{airline.AirlineName}
            
            </Link></div>) : <h4>There were no airlines found.</h4>)}
        </div>
    )
}

export default Airline;


