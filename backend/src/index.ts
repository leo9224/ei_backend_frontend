import express = require('express')
import body_parser = require('body-parser')
import {TicketService} from "~/services/TicketService";
import {Ticket} from "~/models/TicketModel";

const app = express()
const port = process.env.API_PORT
const cors = require('cors');
let corsOptions = {
    origin: 'http://localhost:3001' // Compliant
};

app.disable("x-powered-by");
app.use(cors(corsOptions))

app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))

app.get('/tickets', async (request, response) => {
    response.send(await TicketService.findAll())
})

app.get('/tickets/:id', async (request, response) => {
    const ticket_id = parseInt(request.params.id);

    response.send(await TicketService.findById(ticket_id))
})

app.put('/tickets/:id', async (request, response) => {
    const ticket_id = parseInt(request.params.id);

    await TicketService.update(ticket_id, request.body)

    response.send("Ticket updated")
})

app.post('/tickets', async (request, response) => {
    const id = request.body.id
    const title = request.body.title
    const description = request.body.description
    const status = request.body.status

    await TicketService.create(new Ticket(id, title, description, status))

    response.send("Ticket created")
})

app.delete('/tickets/:id', async (request, response) => {
    const ticket_id = parseInt(request.params.id);

    await TicketService.delete(ticket_id)

    response.send("Ticket deleted")
})

const server = app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})

export default server