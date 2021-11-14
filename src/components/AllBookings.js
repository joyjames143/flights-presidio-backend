import React, {useState,useEffect} from 'react'
import Axios from "axios"
import {Link } from "react-router-dom";

const BookingsHelper = ({id}) => {
    const [flightName ,setFlightName] = useState("")
    const [fromLocation ,setFromLocation] = useState("")
    const [toLocation ,setToLocation] = useState("")
    const [date ,setDate] = useState("")
    const [fare ,setFare] = useState(0)
    

    useEffect(() => {
        Axios.get(`https://flights-presedio-backend.herokuapp.com/getparticularflight/${id}`).then((response)=>{
            console.log(response)
            setFlightName(response.data.name)
            setFromLocation(response.data.from)
            setToLocation(response.data.to)
            setDate(response.data.date.slice(0,10))
            setFare(response.data.fare)
        })
    }, [])
    return(
        <>
            <td>{flightName}</td> 
            <td>{fromLocation}</td> 
            <td>{toLocation}</td> 
            <td>{date}</td> 
            <td>{fare}</td>
        </>
    )
}

export default function AllBookings() {
    const[bookingsList,setBookingsList] = useState([])
    const[updatehelper,setupdatehelper] = useState(0) 
    useEffect(() => {
        async function fetchData() {
            const response = await Axios.get("https://flights-presedio-backend.herokuapp.com/getallbookingsinfo")
            setBookingsList(response.data)
            console.log(response)
        }
        fetchData();
    }, [updatehelper])

    const deleteList = (id,password) => {
        var answer = prompt("Please enter your password:");
        if (answer === password) {
            Axios.delete(`https://flights-presedio-backend.herokuapp.com/deleteparticularbooking/${id}`)
            setupdatehelper(updatehelper+1)
        }else{
            window.alert("wrong password")
        }
    }

    return (
        <div className="main-page-div">
            <h1>ALL BOOKINGS</h1>
            <div>
                <button><h1><Link to="/">Home</Link></h1></button>
            </div>
            <br/><br/>
            <div className="table-arrangement">
                <table> 
                    <thead>
                        <tr> 
                            <th>USER NAME</th>
                            <th>FLIGHT NAME</th> 
                            <th>FROM</th> 
                            <th>TO</th> 
                            <th>DATE</th> 
                            <th>FARE</th> 
                        </tr> 
                    </thead>
                    {bookingsList.map((val,idx)=>{
                        return (
                            <tbody key={idx}>
                                <tr>    
                                    <td><h2>{val.name}</h2></td>
                                    <BookingsHelper id={val.travelsid}/>
                                    <td><button onClick={()=>deleteList(val._id,val.password)}>cancel ticket</button></td> 
                                </tr> 
                            </tbody> 
                        )
                    })} 
                </table>
            </div>
        </div>
    )
}
