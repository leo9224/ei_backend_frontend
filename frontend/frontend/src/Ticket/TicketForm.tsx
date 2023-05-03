import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {IconSubmit} from "../Icons/Icons";
import './CrudForm.css'
import {Ticket} from "../models/TicketModel";

type CrudFormElements = {
    [key: string]: any
}

function TicketForm() {
    const {id} = useParams();
    //const {t} = useTranslation();
    const navigate = useNavigate();
    const [ticket, setTicket] = React.useState<Ticket | undefined>(undefined)
    const [ticketIds, setTicketIds] = React.useState<number[]>([])


    React.useEffect(() => {
        if (id !== undefined)
            fetch(process.env.REACT_APP_API_ENDPOINT + "/tickets/" + id)
                .then(response => response.json())
                .then(data => setTicket(data))
    }, [id])

    React.useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + "/tickets")
            .then(response => response.json())
            .then(data => {
                const ids: number[] = []
                data.map((data: Ticket) => {
                    return ids.push(data.id)
                })
                setTicketIds(ids)
            })
    }, [])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const jsonBody: CrudFormElements = {
            id: parseInt((event.currentTarget.elements[0] as HTMLInputElement).value),
            title: (event.currentTarget.elements[1] as HTMLInputElement).value,
            description: (event.currentTarget.elements[2] as HTMLInputElement).value
        }
        const body = JSON.stringify(jsonBody)

        if (ticket !== undefined) {
            if (jsonBody.id in ticketIds && jsonBody.id !== ticket.id) {
                window.alert("Id already used !")
                return
            }
        } else {
            if (jsonBody.id in ticketIds) {
                window.alert("Id already used !")
                return
            }
        }

        if (ticket === undefined) {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: body
            }

            fetch(process.env.REACT_APP_API_ENDPOINT + "/tickets", requestOptions)
                .then(response => response)
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: body
            }

            fetch(process.env.REACT_APP_API_ENDPOINT + "/tickets/" + id, requestOptions)
                .then(response => response)
        }

        navigate("/tickets")
    }

    return (
        <form id={"crudForm"} onSubmit={onSubmit}>
            <label htmlFor={"id"}>{"Id"}</label>
            <input type={"number"} id={"id"} name={"id"} required={true} defaultValue={ticket?.id}/>

            <label htmlFor={"title"}>{"Title"}</label>
            <input type={"text"} id={"title"} name={"title"} required={true} defaultValue={ticket?.title}/>

            <label htmlFor={"description"}>{"Description"}</label>
            <input type={"text"} id={"description"} name={"description"} required={false}
                   defaultValue={ticket === undefined || ticket.description === null ? undefined : ticket.description}/>

            <button type="submit">{IconSubmit}</button>
        </form>
    )
}

export default TicketForm