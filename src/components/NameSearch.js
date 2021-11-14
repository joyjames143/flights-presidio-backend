import React,{useState,useEffect} from 'react'
import Axios from "axios"
import {Link } from "react-router-dom";

export default function NameSearch({flightName}) {
    const[flightsList,setFlightsList] = useState([])

    useEffect(() => {
        Axios.get("https://flights-presedio-backend.herokuapp.com/getallflightsinfo").then((response)=>{
            setFlightsList(response.data)
            console.log(response)
        })
    }, [])

    return (
        <div>
            <div className="table-arrangement">
                <h1>result by flight name</h1>
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
                                {(val.name === flightName)?
                                <tr> 
                                    <td>{val.name}</td> 
                                    <td>{val.from}</td> 
                                    <td>{val.to}</td> 
                                    <td>{val.date.slice(0,10).split("-").reverse().join("/")}</td> 
                                    <td>{val.fare}</td>
                                    <td><button><Link to="/bookingdetails" state={{ flightID: val._id}}>Book</Link></button></td> 
                                </tr> :""}
                            </tbody> 
                        )
                    })}
                </table>
            </div>
        </div>
    )
}
