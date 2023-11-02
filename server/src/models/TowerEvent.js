import { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
    {

        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        name: { type: String, required: true, maxLength: 300 },
        description: { type: String, required: true, maxLength: 700 },
        coverImg: { type: String, required: true, maxLength: 500 },
        location: { type: String, required: true, maxLength: 300 },
        capacity: { type: Number, required: true, maxLength: 300 },
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, default: false },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }

    },
    { timestamps: true, toJSON: { virtuals: true } }

)
TowerEventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})