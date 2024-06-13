import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { BookingService } from "./booking.service"

const createBooking = catchAsync(
    async (req: Request, res: Response) => {
        const result = await BookingService.createBookingIntoDB(req.body)

        res.status(200).json({
            success: true,
            message: 'Booking created successfully',
            data: result
        })
    }
)

const getAdminAllBookings = catchAsync(
    async (req: Request, res: Response) => {
        const result = await BookingService.getAdminAllBookingsFromDB()

        res.status(200).json({
            success: true,
            message: 'All bookings retrieved successfully',
            data: result
        })
    }
)


const getUserAllBookings = catchAsync(
    async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const result = await BookingService.getUserBookingsFromDB(token)

        res.status(200).json({
            success: true,
            message: 'All bookings retrieved successfully',
            data: result
        })
    }
)

export const BookingController = {
    createBooking,
    getAdminAllBookings,
    getUserAllBookings
}