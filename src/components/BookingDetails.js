import React, {useState,useEffect} from 'react'
import { useLocation } from "react-router-dom";
import Axios from "axios"
import {Link } from "react-router-dom";

export default function BookingDetails() {
    const [name ,setName] = useState("")
    const [password ,setPassword] = useState("")
    
    const location = useLocation()
    const {flightID} = location.state
    
    const [flightid ,setFlightid] = useState(flightID)

    const addToList = () => {
        Axios.post("https://flights-presedio-backend.herokuapp.com/postbookinginfo",{
            name:name,
            password:password,
            flightid:flightid,
        })
    }


    return (
        <div className="main-page-div">
            <div>
                <button><h1><Link to="/">cancel booking</Link></h1></button>
            </div>
            <br/><br/>
            <form onSubmit={(e)=>e.preventDefault()}>
                <input required onChange={(e)=>{setName(e.target.value)}}   value={name}       type="text" placeholder="name"></input>
                <input required onChange={(e)=>{setPassword(e.target.value)}} value={password} type="text" placeholder="passwword"></input>
                <div>
                    <button type="submit" onClick={addToList}><Link to="/allbooking">submit</Link> </button> 
                </div> 
                {console.log(flightid)}
            </form>
        </div> 
    )
}
