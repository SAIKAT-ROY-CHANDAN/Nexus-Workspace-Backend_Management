import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { userBookingService } from "./userBooking.service"

const getUserAllBookings = catchAsync(
    async (req: Request, res: Response) => {
        const token = req.headers.authorization
        const result = await userBookingService.getUserBookingsFromDB(token)

        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No Data Found',
                data: result
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'User bookings retrieved successfully',
                data: result
            })
        }
    }
)

export const userBookingController = {
    getUserAllBookings
}
