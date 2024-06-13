import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { bookingValidation } from './booking.validation'
import { BookingController } from './Booking.controller'

const router = express.Router()

router.post('/',
    validateRequest(bookingValidation.createBookingSchema),
    BookingController.createBooking
)

router.get('/',
    BookingController.getAdminAllBookings
)

router.get('/my-bookings',
    BookingController.getUserAllBookings
)

export const BookingRoutes = router