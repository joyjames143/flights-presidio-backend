import React from 'react'
import {Link } from "react-router-dom";
import "../styles/FlightSearch.css"

export default function AllFlightsList({flightsList}) {
    return (
        <div className="main-page-div">
            <h1>flights List</h1>
            <div>
                <table> 
                    <thead>
                        <tr> 
                            <th>No</th>
                            <th>FLIGHT NAME</th> 
                            <th>FROM</th> 
                            <th>TO</th> 
                            <th>DATE</th> 
                            <th>fARE</th> 
                        </tr> 
                    </thead>
                    {flightsList.map((flight,idx)=>{
                        return (
                            <tbody key={idx}>
                                <tr> 
                                    <td>{idx+1}</td> 
                                    <td>{flight.name}</td> 
                                    <td>{flight.from}</td> 
                                    <td>{flight.to}</td> 
                                    <td>{flight.date.slice(0,10).split("-").reverse().join("/")}</td> 
                                    <td>{flight.fare}</td>
                                    <td><button><Link to="/editflight" state={{ flightID: flight._id}}>edit</Link></button></td> 
                                    <td><button onClick={()=>deleteList(flight._id)}>delete</button></td> 
                                </tr> 
                            </tbody> 
                        )
                    })} 
                </table>
            </div>
        </div>
    )
}
