import {TicketRepository} from "~/repositories/TicketRepository";
import {Ticket} from "~/models/TicketModel";

const ticketRepository = new TicketRepository()

export class TicketService{
    static async findAll() {
        return await ticketRepository.findAll()
    }

    static async findById(id: number) {
        return await ticketRepository.findById(id)
    }

    static async create(ticket: Ticket) {
        await ticketRepository.create(ticket)
    }

    static async delete(id: number) {
        if (await this.findById(id) !== null)
            await ticketRepository.delete(id)
    }

    static async update(id: number, body: any) {
        await ticketRepository.update(id, body)
    }
}