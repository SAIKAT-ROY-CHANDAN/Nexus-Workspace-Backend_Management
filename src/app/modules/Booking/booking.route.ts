import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { bookingValidation } from './booking.validation'
import auth from '../../middlewares/auth'
import { BookingController } from './booking.controller'

const router = express.Router()

router.post('/',
    auth('user'),
    validateRequest(bookingValidation.createBookingSchema),
    BookingController.createBooking
)

router.get('/',
    auth('admin'),
    BookingController.getAdminAllBookings
)

router.patch('/:id',
    auth('admin'),
    BookingController.updateBooking
)

router.patch('/status/:id',
    auth('admin'),
    BookingController.confirmBookingAndRejectBookingStatus
)

// router.get('/my-bookings',
//     auth('user'),
//     BookingController.getUserAllBookings
// )

router.delete('/:id',
    auth('admin'),
    BookingController.deleteBooking
)

export const BookingRoutes = router