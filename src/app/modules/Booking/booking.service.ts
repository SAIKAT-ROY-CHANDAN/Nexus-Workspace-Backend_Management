import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { Room } from "../room/room.model";
import { User } from "../Auth/auth.model";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";
import config from "../../config";
import jwt, { JwtPayload } from 'jsonwebtoken'

const createBookingIntoDB = async (payload: TBooking) => {
    const { date, slots, room, user } = payload

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    }

    if (!room) {
        throw new AppError(httpStatus.NOT_FOUND, "Room not found")
    }

    const userRecord = await User.findById(user)

    if (!userRecord) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found in database");
    }

    const roomRecord = await Room.findById(room)

    if (!roomRecord) {
        throw new AppError(httpStatus.NOT_FOUND, "Room not found in database");
    }

    const slotRecords = await Slot.find({ _id: { $in: slots } });

    if (slotRecords.length !== slots.length) {
        throw new AppError(httpStatus.NOT_FOUND, "One or more slots not found in database");
    }

    const totalAmount = roomRecord.pricePerSlot * slotRecords.length

    const booking = {
        date,
        slots: slotRecords,
        room: roomRecord,
        user: userRecord,
        totalAmount
    }

    console.log(booking);
    const result = await Booking.create(booking)
    return result
}

const getAdminAllBookingsFromDB = async () => {
    const result = await Booking.find()
    return result
}


const getUserBookingsFromDB = async (payload: any) => {
    const token = payload.split(' ')[1];

    console.log(token);

    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
    ) as JwtPayload

    const { userId } = decoded
    console.log(decoded);

    const result = await Booking.find({ 'user._id': userId }).select('-user');
    return result
}

export const BookingService = {
    createBookingIntoDB,
    getAdminAllBookingsFromDB,
    getUserBookingsFromDB
}