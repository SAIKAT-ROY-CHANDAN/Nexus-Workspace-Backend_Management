import { Types } from "mongoose"

export type TBooking = {
    date: Date,
    slots: Types.ObjectId[],
    room: Types.ObjectId,
    user: Types.ObjectId
}