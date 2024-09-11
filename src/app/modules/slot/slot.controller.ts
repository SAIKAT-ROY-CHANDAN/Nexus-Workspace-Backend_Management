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

const getAvailableAllSlots = catchAsync(async (req: Request, res: Response) => {

    const result = await slotService.getAvailableAllSlotsFromDB(req.query)

    res.status(200).json({
        success: true,
        message: 'Available slots retrieved successfully',
        data: result
    })
})

const updatedSlots = catchAsync(async (req: Request, res: Response) => {
    const result = await slotService.updateSlotsFromDB(req.params.id, req.body)

    res.status(200).json({
        success: true,
        message: 'Slot Updated successfully',
        data: result
    })
})

const deleteSlot = catchAsync(async (req: Request, res: Response) => {
    const result = await slotService.deleteSlotFromDB(req.params.id)

    res.status(200).json({
        success: true,
        message: 'Slot Deleted successfully',
        data: result
    })
})

export const slotController = {
    createSlot,
    getAvailableAllSlots,
    updatedSlots,
    deleteSlot
}