import { Request, Response } from "express";
import { RoomService } from "./room.service";
import catchAsync from "../../utils/catchAsync";

const createRoom = catchAsync(async (req: Request, res: Response) => {
    const result = await RoomService.createRoomIntoDB(req.body)

    res.status(200).json({
        success: true,
        message: 'Room added successfully',
        data: result
    })

})

const getRooms = catchAsync(async (req: Request, res: Response) => {
    const result = await RoomService.getRoomsFromDB();

    res.status(200).json({
        success: true,
        message: 'Rooms retrieved successfully',
        data: result
    })
})

const getSingleRoom = catchAsync(async (req: Request, res: Response) => {
    const result = await RoomService.getSingleRoomFromDB(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Rooms retrieved successfully',
        data: result
    })
})

const updateSingleRoom = catchAsync(async (req: Request, res: Response) => {
    const result = await RoomService.updateSingleRoomIntoDB(req.params.id, req.body);

    res.status(200).json({
        success: true,
        message: 'Room updated successfully',
        data: result
    })
})

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
    const result = await RoomService.deleteSingleRoomFromDB(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Room deleted successfully',
        data: result
    })
})


export const RoomController = {
    createRoom,
    getRooms,
    getSingleRoom,
    updateSingleRoom,
    deleteRoom
}