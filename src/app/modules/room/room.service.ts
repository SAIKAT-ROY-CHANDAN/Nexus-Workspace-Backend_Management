import { TRoom } from "./room.interface";
import { Room } from "./room.model";

const createRoomIntoDB = async (payload: TRoom) => {
    const result = await Room.create(payload)
    return result
}

const getRoomsFromDB = async () => {
    const result = await Room.find()
    return result
}

const getSingleRoomFromDB = async (id: string) => {
    const result = await Room.findById(id)
    console.log(result);
    return result
}

export const RoomService = {
    createRoomIntoDB,
    getRoomsFromDB,
    getSingleRoomFromDB
}