import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TBooking } from "./booking.interface";
import { Room } from "../room/room.model";
import { User } from "../Auth/auth.model";
import { Slot } from "../slot/slot.model";
import { Booking } from "./booking.model";

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
        throw new AppError(httpStatus.NOT_FOUND, "Slots not found in the database");
    }


    const invalidSlots = slotRecords.filter(slot => !slot.room.equals(room));
    if (invalidSlots.length > 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Slots do not belong to this specified room");
    }

    slotRecords.forEach(slot => {
        slot.isBooked = true;
    });

    const totalAmount = roomRecord.pricePerSlot * slotRecords.length

    const booking = {
        date,
        slots: slotRecords,
        room: roomRecord,
        user: userRecord,
        totalAmount,
    }

    const createdBooking = await Booking.create(booking);

    return createdBooking;
}


const getAdminAllBookingsFromDB = async () => {
    const result = await Booking.find({ isDeleted: { $ne: true } });
    return result;
};


const getPaymentCompleteBookingsFromDB = async () => {
    const result = await Booking.find({
        isDeleted: { $ne: true },
        paymentStatus: 'paid'
    });
    return result;
};


const adminUpdateBookingFromDB = async (id: string, payload: Partial<TBooking>) => {
    
    const result = await Booking.findByIdAndUpdate(id, payload, { new: true });
    
    if (!result) {
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
    
    // console.log(transformedResult);
    
    return transformedResult
}

const deleteBookingFromDB = async (id: string) => {
    const result = await Booking.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    )
    
    if (!result) {
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
    
    // console.log(transformedResult);
    
    return transformedResult
}

const confirmBookingAndRejectBookingStatusIntoDB = async (id: string, status: string) => {
    const validStatuses = ["confirmed", "unconfirmed"];
    if (!validStatuses.includes(status)) {
        return { success: false, message: "Invalid status. Must be 'confirmed' or 'unconfirmed'" };
    }
    
    // Update the booking status
    const booking = await Booking.findByIdAndUpdate(
        id,
        { isConfirmed: status },
        { new: true, runValidators: true }
    );
    
    if (!booking) {
        return { success: false, message: "Booking not found" };
    }
    
    return { success: true, message: `Booking ${status} successfully`, booking };
    
}


export const BookingService = {
    createBookingIntoDB,
    getAdminAllBookingsFromDB,
    // getUserBookingsFromDB,
    adminUpdateBookingFromDB,
    deleteBookingFromDB,
    confirmBookingAndRejectBookingStatusIntoDB,
    getPaymentCompleteBookingsFromDB
}



    // const getUserBookingsFromDB = async (payload: any) => {
    //     const token = payload.split(' ')[1];
    
    //     const decoded = jwt.verify(
    //         token,
    //         config.jwt_access_secret as string
    //     ) as JwtPayload
    
    //     const { userId } = decoded
    
    //     const result = await Booking.find({ 'user._id': userId }).select('-user');
    //     return result
    // }




    // const createBookingIntoDB = async (payload: TBooking) => {
    //     const { date, slots, room, user } = payload
    
    //     if (!user) {
    //         throw new AppError(httpStatus.NOT_FOUND, "User not found")
    //     }
    
    //     if (!room) {
    //         throw new AppError(httpStatus.NOT_FOUND, "Room not found")
    //     }
    
    //     const userRecord = await User.findById(user)
    
    //     if (!userRecord) {
    //         throw new AppError(httpStatus.NOT_FOUND, "User not found in database");
    //     }
    
    //     const roomRecord = await Room.findById(room)
    
    //     if (!roomRecord) {
    //         throw new AppError(httpStatus.NOT_FOUND, "Room not found in database");
    //     }
    
    //     const slotRecords = await Slot.find({ _id: { $in: slots } });
    //     if (slotRecords.length !== slots.length) {
    //         throw new AppError(httpStatus.NOT_FOUND, "Slots not found in the database");
    //     }
    
    
    //     const invalidSlots = slotRecords.filter(slot => !slot.room.equals(room));
    //     if (invalidSlots.length > 0) {
    //         throw new AppError(httpStatus.BAD_REQUEST, "Slots do not belong to this specified room");
    //     }
    
    //     slotRecords.forEach(slot => {
    //         slot.isBooked = true;
    //     });
    
    //     const totalAmount = roomRecord.pricePerSlot * slotRecords.length
    //     const transactionId = `TXN-${Date.now()}`;
    
    //     const booking = {
    //         transactionId,
    //         date,
    //         slots: slotRecords,
    //         room: roomRecord,
    //         user: userRecord,
    //         totalAmount
    //     }
    
    //     await Booking.create(booking)
    
    //     for (const slot of slotRecords) {
    //         await Slot.findByIdAndUpdate(slot._id, { isBooked: true });
    //     }
    
    //     const paymentSession = await initiatePayment(booking)
    //     console.log(paymentSession);
    //     return paymentSession
    // }