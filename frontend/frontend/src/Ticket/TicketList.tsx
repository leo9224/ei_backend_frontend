import React from "react";
import {Link} from "react-router-dom";
import {Ticket} from "../models/TicketModel";
import {IconAdd} from "../Icons/Icons";
import TicketActions from "./TicketActions";

function TicketList() {
    //const {t} = useTranslation();
    const [tickets, setTickets] = React.useState<Ticket[]>([])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/tickets")
            .then(response => response.json())
            .then(data => setTickets(data))
    }, [])

    return (
        <div className={"ticketListContainer"}>
            <div className={"addButtonContainer"}>
                <Link to={"new"}>
                    <button type={"button"}>{IconAdd}</button>
                </Link>
            </div>
            <table>
                <thead>
                <tr>
                    <th>{"Id"}</th>
                    <th>{"Title"}</th>
                    <th>{"Description"}</th>
                    <th>{"Status"}</th>
                    <th>{"Actions"}</th>
                </tr>
                </thead>
                <tbody>
                {tickets.sort((a, b) => a.id - b.id).map((ticket) => {
                    return (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.title}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.status}</td>
                            <td>
                                <TicketActions ticket={ticket}/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default TicketList