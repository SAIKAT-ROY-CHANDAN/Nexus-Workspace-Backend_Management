import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { slotService } from "./slot.service";

const createSlot = catchAsync(async (req: Request, res: Response) => {
    const result = await slotService.createSlotIntoDB(req.body)

    res.status(200).json({
        success: true,
        message: 'Slots created successfully',
        data: result
    })
})

const getAvailableAllSlots = catchAsync(async (req:Request, res:Response) => {
    const result = await slotService.getAvailableAllSlotsFromDB(req.query)
    res.status(200).json({
        success: true,
        message: 'Available slots retrieved successfully',
        data: result
    })
})

export const slotController = {
    createSlot,
    getAvailableAllSlots
}