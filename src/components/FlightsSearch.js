import React,{useState} from 'react'
import {Link } from "react-router-dom";
import DeatinationSearch from './DeatinationSearch';
import NameSearch from './NameSearch';
import ViewAllFlights from './ViewAllFlights';
import "../styles/FlightSearch.css"

export default function FlightsSearch() {
    const [nameSearch , setNameSearch] = useState("")
    const [fromLocation ,setFromLocation] = useState("")
    const [toLocation ,setToLocation] = useState("")
    const [showNamesearch,setshowNamesearch] = useState(false)
    const [destination,setDestination] = useState(false)
    const [viewallflights,setViewallflights] = useState(true)

    const flightSearch = (e) => {
        e.preventDefault();
        return false 
    }

    const nameSearchfunc = () => {
        setshowNamesearch(true)
        setDestination(false)
        setViewallflights(false)
    }

    const destinationfunc = () => {
        setDestination(true)
        setshowNamesearch(false)
        setViewallflights(false)
        
    }
    const viewallflightsfunc = () => {
        setViewallflights(true)
        setshowNamesearch(false)
        setDestination(false)
    }
    return (
        <div className="main-page-div">
            <h1>HOME PAGE</h1>
            <button onClick={viewallflightsfunc}><h1>view all flights</h1></button>
            <button><h1><Link to="/crudflights">create/update flights</Link></h1></button>
            <button><h1><Link to="/allbooking">All bookings info</Link></h1></button>
            <br/><br/>
            <form onSubmit={flightSearch}>
                <div>
                    <input type="text" required onChange={(e)=>{setNameSearch(e.target.value)}} value={nameSearch} placeholder="flight name"></input>
                    <br/>
                    <button type="Submit" onClick={nameSearchfunc} >search by flight name </button>
                </div>
            </form>
            <form onSubmit={flightSearch}>
                <br/><br/>
                <div>
                    <input type="text" required onChange={(e)=>{setFromLocation(e.target.value)}} value={fromLocation} placeholder="From"></input>
                    <br/>
                    <input type="text" required onChange={(e)=>{setToLocation(e.target.value)}}   value={toLocation} placeholder="To"></input>
                    <br/>
                    <button type="Submit" onClick={destinationfunc} >search by destination </button> 
                </div>
            </form>
            <br/><br/>
            {showNamesearch?<NameSearch flightName={nameSearch}/>:""}
            {destination?<DeatinationSearch fromCity={fromLocation} ToCity={toLocation}/>:""}
            {viewallflights?<ViewAllFlights/>:""}
        </div> 
    )
}
