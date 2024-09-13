/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TRoom } from "./room.interface";
import { Room } from "./room.model";

const createRoomIntoDB = async (payload: TRoom) => {
    const result = await Room.create(payload)
    return result
}

const getRoomsFromDB = async (queryParams: any) => {
    const { search, capacity, price, sort } = queryParams;
    console.log(queryParams);
    const query: any = { isDeleted: false };

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            // { description: { $regex: search, $options: 'i' } }
        ];
    }

    if (capacity) {
        query.capacity = { $gte: capacity };
    }

    if (price && price.min !== undefined && price.max !== undefined) {
        query.pricePerSlot = { $gte: price.min, $lte: price.max };
    }

    const sortQuery: any = {};
    if (sort === 'priceAsc') {
        sortQuery.pricePerSlot = 1;
    } else if (sort === 'priceDesc') {
        sortQuery.pricePerSlot = -1;
    }


    console.log('Query Object:', query);
    console.log('Sort Object:', sortQuery)

    const result = await Room.find(query).sort(sortQuery);

    if (result.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
    }

    return result;
};

// const getRoomsFromDB = async () => {
//     const result = await Room.find({ isDeleted: false });

//     if (result.length === 0) {
//         throw new AppError(httpStatus.NOT_FOUND, "No Data Found")
//     }

//     return result
// }

const getSingleRoomFromDB = async (id: string) => {
    const result = await Room.findOne({ _id: id, isDeleted: false });
    // const result = await Room.findById(id)

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