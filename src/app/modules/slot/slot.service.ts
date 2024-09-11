import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import { minutesToTime, timeMinutes } from "./slot.utils";
import { Room } from "../room/room.model";

const createSlotIntoDB = async (payload: TSlot) => {

    const { room, date, startTime, endTime } = payload;

    const startMinutes = timeMinutes(startTime)
    const endMinutes = timeMinutes(endTime)
    const totalDuration = endMinutes - startMinutes

    if (totalDuration < 0) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'End Time must be after start time')
    }

    const roomRecord = await Room.findById(room)

    if (!roomRecord) {
        throw new AppError(httpStatus.NOT_FOUND, 'Room is not found')
    }

    const numberOfSlots = Math.floor(totalDuration) / 60

    const slots = [];
    for (let i = 0; i < numberOfSlots; i++) {
        const slotStartTime = minutesToTime(startMinutes + i * 60);
        const slotEndTime = minutesToTime(startMinutes + (i + 1) * 60);

        const slot = {
            room,
            date,
            startTime: slotStartTime,
            endTime: slotEndTime,
        };

        const createdSlot = await Slot.create(slot);
        slots.push(createdSlot);
    }

    return slots;
}

const getAvailableAllSlotsFromDB = async (query: Record<string, unknown>) => {

    const { date, roomId } = query

    // const filter: Record<string, unknown> = {};
    const filter: Record<string, unknown> = {
        isBooked: false,
        isDeleted: false
    };

    if (date) {
        filter.date = date;
    }

    if (roomId) {
        filter.room = roomId;
    }


    const result = await Slot.find(filter).populate('room')
    return result
}

const updateSlotsFromDB = async (id: string, updateData: Partial<TSlot>) => {

    const existingSlot = await Slot.findById(id);
    if (!existingSlot) {
        throw new Error("Slot not found.");
    }

    if (existingSlot.isBooked) {
        throw new Error("Cannot update a booked slot.");
    }

    if (updateData.startTime && updateData.endTime) {
        const { startTime, endTime } = updateData;

        const conflictingSlots = await Slot.find({
            room: existingSlot.room,
            date: existingSlot.date,
            _id: { $ne: id },
            $or: [
                {
                    startTime: { $lt: endTime, $gte: startTime }
                },
                {
                    endTime: { $gt: startTime, $lte: endTime }
                },
                {
                    startTime: { $lte: startTime },
                    endTime: { $gte: endTime }
                }
            ]
        });

        if (conflictingSlots.length > 0) {
            throw new Error("Time conflict with another slot.");
        }
    }

    const updatedSlot = await Slot.findOneAndUpdate(
        { _id: id },
        { startTime: updateData.startTime, endTime: updateData.endTime },
        { new: true }
    );
    console.log(updatedSlot);

    return updatedSlot;
}

const deleteSlotFromDB = async (id: string) => {
    const existingSlot = await Slot.findById(id);

    if (!existingSlot) {
        throw new Error("Slot not found.");
    }

    if (existingSlot.isDeleted) {
        throw new Error("Slot is already deleted.");
    }

    const updatedSlot = await Slot.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );

    return updatedSlot;
};

export const slotService = {
    createSlotIntoDB,
    getAvailableAllSlotsFromDB,
    updateSlotsFromDB,
    deleteSlotFromDB
}