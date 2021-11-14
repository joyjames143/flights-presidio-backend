import React from 'react'
import FlightsSearch from './components/FlightsSearch'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import CrudFlights from './components/CrudFlights';
import EditFlight from './components/EditFlight';
import BookingDetails from './components/BookingDetails';
import AllBookings from './components/AllBookings';

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route exact path="/"  element={<FlightsSearch/>}/>
                    <Route exact path="/crudflights" element={<CrudFlights/>}/>
                    <Route exact path="/editflight" element={<EditFlight/>}/>
                    <Route exact path="/bookingdetails" element={<BookingDetails/>}/>
                    <Route exact path="/allbooking" element={<AllBookings/>}/>
                </Routes> 
            </Router>   
            
        </div>
    )
}
