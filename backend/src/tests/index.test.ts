import request from "supertest";
import {Ticket} from "~/models/TicketModel";
import {TicketService} from "~/services/TicketService";
import server from "~~/src";

let ticket1: Ticket
let ticket2: Ticket
let ticket3: Ticket

beforeEach(async () => {
    ticket1 = new Ticket(1, "Test1", "ceci est le test 1", "à faire")
    ticket1 = new Ticket(2, "Test2", "ceci est le test 2", "à faire")
    ticket1 = new Ticket(3, "Test3", "ceci est le test 3", "à faire")

    await TicketService.create(ticket1)
    await TicketService.create(ticket2)
    await TicketService.create(ticket3)
});

afterEach(async () => {
    await TicketService.delete(1)
    await TicketService.delete(2)
    await TicketService.delete(3)
});

test("get one ticket", async () => {
    const response = await request(server).get("/tickets/1");
    expect(response.body).toEqual(ticket1);
    expect(response.status).toEqual(200)
    server.close()
});

test("get all tickets", async () => {
    const response = await request(server).get("/tickets");
    expect(response.body).toEqual([ticket1, ticket2, ticket3]);
    expect(response.status).toEqual(200)
    server.close()
});

test("update ticket", async () => {
    const response = await request(server).put("/tickets/1");
    expect(response.text).toEqual("Ticket updated");
    expect(response.status).toEqual(200)
    server.close()
});

test("delete ticket", async () => {
    const response = await request(server).delete("/tickets/1");
    expect(response.text).toEqual("Ticket deleted");
    expect(response.status).toEqual(200)
    server.close()
});

test("create ticket", async () => {
    const response = await request(server).post("/tickets").send({
        id: 4,
        title: "Test4",
        description: "ceci est le test 4",
        status: "à faire"
    });
    expect(response.text).toEqual("Ticket created");
    expect(response.status).toEqual(200)

    await TicketService.delete(4)

    server.close()
});