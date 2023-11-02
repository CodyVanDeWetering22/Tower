import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventsService {
    async deleteEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId.toString() != userId) {
            throw new Forbidden('Not urs to delete')
        }
        event.isCanceled = !event.isCanceled
        await event.save()
        return event
    }
    async editEvent(eventData, userId, eventId) {
        const wantsToBeEdited = await this.getEventById(eventId)

        if (wantsToBeEdited.creatorId.toString() != userId) {
            throw new Forbidden('You can not update because it is not ur event')
        }
        wantsToBeEdited.name = eventData.name || wantsToBeEdited.name
        wantsToBeEdited.description = eventData.description || wantsToBeEdited.description

        await wantsToBeEdited.save()

        return wantsToBeEdited
    }
    async getEventById(eventId) {
        const event = await dbContext.Tower.findById(eventId).populate('ticketCount')
        if (!event) {
            throw new BadRequest(`${eventId}, is not a valid id`)
        }
        return event
    }
    async createEvent(eventData) {
        const event = await dbContext.Tower.create(eventData)
        return event
    }
    async getTowerEvents(query) {
        const events = await dbContext.Tower.find(query)
        return events
    }
}

export const towerEventService = new TowerEventsService