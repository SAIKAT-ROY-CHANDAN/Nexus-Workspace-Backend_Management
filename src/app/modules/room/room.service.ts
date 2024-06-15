import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TRoom } from "./room.interface";
import { Room } from "./room.model";

const createRoomIntoDB = async (payload: TRoom) => {
    const result = await Room.create(payload)
    return result
}

const getRoomsFromDB = async () => {
    const result = await Room.find()

    if (result.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, "No Data Found")
    }

    return result
}

const getSingleRoomFromDB = async (id: string) => {
    const result = await Room.findById(id)

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "No Data Found")
    }

    return result
}

const updateSingleRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
    const result = await Room.findByIdAndUpdate(
        id,
        payload,
        { new: true, runValidators: true }
    )

    return result
}

const deleteSingleRoomFromDB = async (id: string) => {
    const result = await Room.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    )

    return result
}



export const RoomService = {
    createRoomIntoDB,
    getRoomsFromDB,
    getSingleRoomFromDB,
    updateSingleRoomIntoDB,
    deleteSingleRoomFromDB
}