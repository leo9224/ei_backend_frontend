import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import TicketList from "./Ticket/TicketList";
import TicketForm from "./Ticket/TicketForm";

function App() {
    return (
        <Routes>
            <Route path="/tickets" element={<TicketList/>}/>
            <Route path="/tickets/new" element={<TicketForm/>}/>
            <Route path={"/tickets/:id/update"} element={<TicketForm/>}/>
            <Route path='*' element={<Navigate to='/tickets'/>}/>
        </Routes>
    );
}

export default App;
