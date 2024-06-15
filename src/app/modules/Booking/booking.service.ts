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

    const result = await Booking.create(booking)
    return result
}

const getAdminAllBookingsFromDB = async () => {
    const result = await Booking.find()
    return result
}


const getUserBookingsFromDB = async (payload: any) => {
    const token = payload.split(' ')[1];

    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
    ) as JwtPayload

    const { userId } = decoded

    const result = await Booking.find({ 'user._id': userId }).select('-user');
    return result
}


const adminUpdateBookingFromDB = async (id: string, payload: Partial<TBooking>) => {
 
    const result = await Booking.findByIdAndUpdate(id, payload, { new: true });

    if(!result){
        throw new AppError(httpStatus.NOT_FOUND, "Booking not Found")
    }

    const transformedResult = {
        _id: result._id.toString(),
        date: new Date(result.date).toISOString().split('T')[0], 
        slots: result.slots.map(slot => slot._id.toString()), 
        totalAmount: result.totalAmount,
        room: result.room._id.toString(), 
        user: result.user._id.toString(),
        isConfirmed: result.isConfirmed,
        isDeleted: result.isDeleted
    };

    console.log(transformedResult);

    return transformedResult
}

const deleteBookingFromDB = async (id: string) => {
    const result = await Booking.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    )

    if(!result){
        throw new AppError(httpStatus.NOT_FOUND, "Booking not Found")
    }

    const transformedResult = {
        _id: result._id.toString(),
        date: new Date(result.date).toISOString().split('T')[0], 
        slots: result.slots.map(slot => slot._id.toString()), 
        totalAmount: result.totalAmount,
        room: result.room._id.toString(), 
        user: result.user._id.toString(),
        isConfirmed: result.isConfirmed,
        isDeleted: result.isDeleted
    };

    console.log(transformedResult);

    return transformedResult
}


export const BookingService = {
    createBookingIntoDB,
    getAdminAllBookingsFromDB,
    getUserBookingsFromDB,
    adminUpdateBookingFromDB,
    deleteBookingFromDB
}