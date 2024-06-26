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

        if (result.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No Data Found',
                data: result
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'All bookings retrieved successfully',
                data: result
            })
        }
    }
)


// const getUserAllBookings = catchAsync(
//     async (req: Request, res: Response) => {
//         const token = req.headers.authorization
//         const result = await BookingService.getUserBookingsFromDB(token)

//         res.status(200).json({
//             success: true,
//             message: 'User bookings retrieved successfully',
//             data: result
//         })
//     }
// )

const updateBooking = catchAsync(
    async (req: Request, res: Response) => {

        const result = await BookingService.adminUpdateBookingFromDB(req.params.id, req.body)

        res.status(200).json({
            success: true,
            message: 'Bookings updated successfully',
            data: result
        })
    }
)

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.deleteBookingFromDB(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Booking deleted successfully',
        data: result
    })
})


export const BookingController = {
    createBooking,
    getAdminAllBookings,
    // getUserAllBookings,
    updateBooking,
    deleteBooking
}