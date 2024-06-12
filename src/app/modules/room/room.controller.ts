import { Request, Response } from "express";
import { RoomService } from "./room.service";

const createRoom = async (req: Request, res: Response) => {
    try {
        const result = await RoomService.createRoomIntoDB(req.body)

        res.status(200).json({
            success: true,
            message: 'You have successfully created a room',
            data: result
        })
    } catch (error) {
        throw new Error('Can not create The room')
    }

}

export const RoomController ={
    createRoom
}