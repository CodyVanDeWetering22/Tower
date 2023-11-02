import { dbContext } from "../db/DbContext.js"

class TicketsService {
    async getMyEventTickets(userId) {
        const tickets = await dbContext.Ticket.find({ accountId: userId }).populate('event')

        return tickets
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile')
        return ticket
    }
    async getEventTickets(eventId) {
        const tickets = await dbContext.Ticket.find({ eventId: eventId })
        return tickets
    }
}



export const ticketsService = new TicketsService()