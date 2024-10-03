/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { Booking } from "../Booking/booking.model";

const getUserBookingsFromDB = async (payload: any) => {
    const token = payload.split(' ')[1];

    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
    ) as JwtPayload

    const { userId } = decoded

    const result = await Booking.find({ 'user._id': userId, paymentStatus: { $ne: 'paid' } }).select('-user');
    return result
}

export const userBookingService = {
    getUserBookingsFromDB
}
