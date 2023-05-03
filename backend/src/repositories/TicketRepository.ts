import {Ticket} from "~/models/TicketModel";
import {PrismaClient} from "@prisma/client";

const prisma_client = new PrismaClient()

export class TicketRepository{
    async findAll() {
        let tickets: Ticket[] = []

        const tickets_json = await prisma_client.ticket.findMany()

        for (let ticket_json of tickets_json) {
            const id = ticket_json['id']
            const title = ticket_json['title']
            const description = ticket_json['description']
            const status = ticket_json['status']

            tickets.push(new Ticket(id,title,description,status))
        }

        return tickets;
    }

    async findById(id: number) {
        const ticket_json = await prisma_client.ticket.findUnique({
            where: {
                id: id,
            }
        })

        if (ticket_json !== null) {
            const id = ticket_json['id']
            const title = ticket_json['title']
            const description = ticket_json['description']
            const status = ticket_json['status']

            return new Ticket(id,title,description,status)
        }

        return null
    }

    async create(ticket: Ticket) {
        await prisma_client.ticket.create({
            data: {
                id: ticket.id,
                title: ticket.title,
                description: ticket.description,
                status: ticket.status
            }
        })
    }

    async delete(id: number) {
        await prisma_client.ticket.delete({
            where: {
                id: id,
            }
        })
    }

    async update(id: number, body: any) {
        await prisma_client.ticket.update({
            where: {
                id: id,
            },
            data: body,
        })
    }
}