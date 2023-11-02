import { Schema } from "mongoose";

export const TicketSchema = new Schema({
    eventId: { type: Schema.Types.ObjectId, ref: 'TowerEvent', required: true },
    accountId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },

},
    { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

TicketSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'TowerEvent',
    justOne: true
})