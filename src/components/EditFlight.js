import React, {useState,useEffect} from 'react'
import { useLocation } from "react-router-dom";
import Axios from "axios"
import {Link } from "react-router-dom";

export default function EditFlight() {
    const [flightName ,setFlightName] = useState("")
    const [fromLocation ,setFromLocation] = useState("")
    const [toLocation ,setToLocation] = useState("")
    const [date ,setDate] = useState("")
    const [fare ,setFare] = useState(0)

    const location = useLocation()
    const {flightID} = location.state

    useEffect(() => {
        Axios.get(`https://flights-presedio-backend.herokuapp.com/getparticularflight/${flightID}`).then((response)=>{
            console.log(response)
            setFlightName(response.data.name)
            setFromLocation(response.data.from)
            setToLocation(response.data.to)
            setDate(response.data.date.slice(0,10))
            setFare(response.data.fare)
        })
    }, [])

    const updateList = (id) => {
        if (flightName !=="" && fromLocation !=="" && toLocation !== "" && date !== new Date() && fare!==0){
            Axios.put("https://flights-presedio-backend.herokuapp.com/updateflightinfo",{
                id :id,
                flightName:flightName,
                fromLocation:fromLocation,
                toLocation:toLocation,
                date:date,
                fare:fare,
            })
            
        } 
        
    }

    return (
        <div className="main-page-div">
            <h1>EDIT PARTICULAR FLIGHT DETAIL</h1>
            <br/>
            <div>
                <button><h1><Link to="/">Home</Link></h1></button>
                <button><h1><Link to="/crudflights">create/update flights</Link></h1></button>
            </div>
            <br/>
            <h1>update flight details</h1>
            <form onSubmit={(e)=>e.preventDefault()}>
                <input required onChange={(e)=>{setFlightName(e.target.value)}}   value={flightName}   type="text"     placeholder="flight name"></input>
                <input required onChange={(e)=>{setFromLocation(e.target.value)}} value={fromLocation} type="text"     placeholder="from"></input>
                <input required onChange={(e)=>{setToLocation(e.target.value)}}   value={toLocation}   type="text"     placeholder="to"></input>
                <input required onChange={(e)=>{setDate(e.target.value)}}         value={date}         type="date"     placeholder="date"></input>
                <input required onChange={(e)=>{setFare(e.target.value)}}         value={fare}         type="number"   placeholder="fare"></input>
                <div>
                <br/>
                    <button type="submit" onClick={()=>updateList(flightID)}><Link to="/crudflights">submit</Link></button> 
                </div>  
            </form>
        </div>
    )
}
