import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";



const slotSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: Boolean, required: true },
    __v: { type: Number }
}, { _id: false });

const roomSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    roomNo: { type: Number, required: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: { type: [String], required: true },
    isDeleted: { type: Boolean, required: true },
    __v: { type: Number }
}, { _id: false });

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String, required: true },
    __v: { type: Number }
}, { _id: false });

// Main Booking Schema
const bookingSchema = new Schema({
    date: { type: Date, required: true },
    slots: { type: [slotSchema], required: true },
    room: { type: roomSchema, required: true },
    user: { type: userSchema, required: true },
    totalAmount: { type: Number, required: true },
    isConfirmed: { type: String, default: "unconfirmed" },
    isDeleted: { type: Boolean, default: false },
    __v: { type: Number }
});

export const Booking = model<TBooking>('Booking', bookingSchema)