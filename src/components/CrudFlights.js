import React,{useState,useEffect} from 'react'
import Axios from "axios"
import {Link } from "react-router-dom";
import "../styles/FlightSearch.css"

export default function CrudFlights() {
    const [flightName ,setFlightName] = useState("")
    const [fromLocation ,setFromLocation] = useState("")
    const [toLocation ,setToLocation] = useState("")
    const [date ,setDate] = useState(new Date())
    const [fare ,setFare] = useState(null)

    const[flightsList,setFlightsList] = useState([])
    const[updatehelper,setupdatehelper] = useState(0)

    useEffect(() => {
        Axios.get("https://flights-presedio-backend.herokuapp.com/getallflightsinfo").then((response)=>{
            setFlightsList(response.data)
            console.log(response)
        })
    }, [updatehelper])

    const addToList = () => {
        if (flightName !=="" && fromLocation !=="" && toLocation !== "" && date !== new Date() && fare!==0){
            Axios.post("https://flights-presedio-backend.herokuapp.com/postflightinfo",{
                flightName:flightName,
                fromLocation:fromLocation,
                toLocation:toLocation,
                date:date,
                fare:fare
            })
            setupdatehelper(updatehelper+1)
            setFlightName("")
            setFromLocation("")
            setToLocation("")
            setDate(new Date())
            setFare(0)
        } 
        
    }

    const deleteList = (id) => {
        var answer = window.confirm("you sure wanna delete it ?");
        if (answer) {
            Axios.delete(`https://flights-presedio-backend.herokuapp.com/deleteparticularflight/${id}`)
            setupdatehelper(updatehelper+1)
        }
    }

    return ( 
        <div className="main-page-div">
            <h1>MANAGE FLIGHTS</h1>
            <div>
                <button><h1><Link to="/">Home</Link></h1></button>
            </div>
            <br/>
            <form onSubmit={(e)=>e.preventDefault()}>
            <input required onChange={(e)=>{setFlightName(e.target.value)}}   value={flightName}   type="text"     placeholder="flight name"></input>
            <input required onChange={(e)=>{setFromLocation(e.target.value)}} value={fromLocation} type="text"     placeholder="from"></input>
            <input required onChange={(e)=>{setToLocation(e.target.value)}}   value={toLocation}   type="text"     placeholder="to"></input>
            <input required onChange={(e)=>{setDate(e.target.value)}}         value={date}         type="date"     placeholder="date"></input>
            <input required onChange={(e)=>{setFare(e.target.value)}}         value={fare}         type="number"   placeholder="fare"></input>
            <div>
                <button type="submit" onClick={addToList}> submit </button> 
            </div>
            </form>
            
            <h1>flights List</h1>
            <div className="table-arrangement">
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
                                    <td><button><Link to="/editflight" state={{ 
                                                                                    flightID: flight._id
                                                                            }}
                                                >edit</Link></button></td> 
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
