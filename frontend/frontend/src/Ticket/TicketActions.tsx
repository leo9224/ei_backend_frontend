import {Link, useNavigate} from "react-router-dom";
import {IconDelete, IconUpdate} from "../Icons/Icons";
import React from "react";
import {Ticket} from "../models/TicketModel";

type TicketActionsProps = {
    ticket: Ticket
}

function TicketActions({ticket}: TicketActionsProps) {
    const navigate = useNavigate();

    const onDeleteButtonClick = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        }

        fetch(process.env.REACT_APP_API_ENDPOINT + "/tickets/" + ticket.id, requestOptions)
            .then(response => response.json())

        navigate("/tickets")
        window.location.reload()
    }

    const changeTicketStatus = (status: string) => {
        const jsonBody = {
            status: status
        }
        const body = JSON.stringify(jsonBody)

        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: body
        }

        fetch(process.env.REACT_APP_API_ENDPOINT + "/tickets/" + ticket.id, requestOptions)
            .then(response => response)
    }

    const onEnCoursButtonClick = () => {
        changeTicketStatus("en cours")

        navigate("/tickets")
        window.location.reload()
    }

    const onTermineButtonClick = () => {
        changeTicketStatus("terminé")

        navigate("/tickets")
        window.location.reload()
    }

    return (
        <div>
            <button onClick={onEnCoursButtonClick}
                    style={{display: ticket.status === "à faire" ? 'inline-block' : 'none'}}>{"en cours"}</button>

            <button onClick={onTermineButtonClick}
                    style={{display: ticket.status !== "terminé" ? 'inline-block' : 'none'}}>{"terminé"}</button>

            <Link to={"/tickets/" + ticket.id + "/update"}>
                <button>{IconUpdate}</button>
            </Link>
            <button onClick={onDeleteButtonClick}
                    style={{display: ticket.status !== "terminé" ? 'inline-block' : 'none'}}>{IconDelete}</button>
        </div>
    )
}

export default TicketActions