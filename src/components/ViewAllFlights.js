import React,{useState,useEffect} from 'react'
import Axios from "axios"
import {Link } from "react-router-dom";
import "../styles/FlightSearch.css"

export default function ViewAllFlights() {
    const[flightsList,setFlightsList] = useState([])

    useEffect(() => {
        Axios.get("https://flights-presedio-backend.herokuapp.com/getallflightsinfo").then((response)=>{
            setFlightsList(response.data)
            console.log(response)
        })
    }, [])

    return (
        <div>
            <div  className="table-arrangement">
                <h2>all flights</h2>
                <table> 
                    <thead>
                        <tr> 
                            <th>FLIGHT NAME</th> 
                            <th>FROM</th> 
                            <th>TO</th> 
                            <th>DATE</th> 
                            <th>fARE</th> 
                        </tr> 
                    </thead>
                    {flightsList.map((val,idx)=>{
                        return(
                            <tbody key={idx}>
                                <tr> 
                                    <td>{val.name}</td> 
                                    <td>{val.from}</td> 
                                    <td>{val.to}</td> 
                                    <td>{val.date.slice(0,10).split("-").reverse().join("/")}</td> 
                                    <td>{val.fare}</td>
                                    <td><button><Link to="/bookingdetails" state={{ flightID: val._id}}>Book</Link></button></td> 
                                </tr>
                            </tbody> 
                        )
                    })}
                </table>
            </div>
        </div>
    )
}
