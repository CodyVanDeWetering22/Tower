import { request, response } from "express";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowersEventService.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getTowerEvents)
            .get('/:eventId', this.getEventById)
            .get('/:eventId/tickets', this.getEventTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.deleteEvent)
    }
    async getEventTickets(request, response, next) {
        try {
            const eventId = request.params.eventId
            const ticket = await ticketsService.getEventTickets(eventId)
            return response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
    async deleteEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const event = await towerEventService.deleteEvent(eventId, userId)
            return response.send(event)

        } catch (error) {
            next(error)
        }
    }
    async editEvent(request, response, next) {
        try {
            const eventId = request.params.eventId
            const userId = request.userInfo.id
            const eventData = request.body

            const editedEvent = await towerEventService.editEvent(eventData, userId, eventId)
            return response.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }
    async getEventById(request, response, next) {
        try {
            const eventId = request.params.eventId
            const event = await towerEventService.getEventById(eventId)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }
    async getTowerEvents(request, response, next) {
        try {
            const query = request.query
            const events = await towerEventService.getTowerEvents(query)
            return response.send(events)
        } catch (error) {
            next(error)
        }
    }
    async createEvent(request, response, next) {
        try {
            const eventData = request.body
            const userId = request.userInfo.id
            eventData.creatorId = userId
            const event = await towerEventService.createEvent(eventData)
            return response.send(event)
        } catch (error) {
            next(error)
        }
    }
}