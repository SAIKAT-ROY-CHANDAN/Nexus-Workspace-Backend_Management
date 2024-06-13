import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

export const bookingSchema = new Schema<TBooking>({
    date: {type: Date, required:true},
    slots: {type: [Schema.Types.ObjectId], required: true, ref:'Slot'},
    room: {type: Schema.Types.ObjectId, required: true, ref: 'Room'},
    user: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
})

export const Booking = model<TBooking>('Booking', bookingSchema)