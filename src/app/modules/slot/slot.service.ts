import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";
import { minutesToTime, timeMinutes } from "./slot.utils";

const createSlotIntoDB = async (payload: TSlot) => {

    const { room, date, startTime, endTime } = payload;

    const startMinutes = timeMinutes(startTime)
    const endMinutes = timeMinutes(endTime)
    const totalDuration = endMinutes - startMinutes

    if (totalDuration < 0) {
        throw new AppError(httpStatus.NOT_ACCEPTABLE, 'End Time must be after start time')
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

    const filter: Record<string, unknown> = { isBooked: false };


    if (date) {
        filter.date = date;
    }

    if (roomId) {
        filter.room = roomId;
    }

    const result = await Slot.find(filter).populate('room')
    return result
}

export const slotService = {
    createSlotIntoDB,
    getAvailableAllSlotsFromDB
}