import auth from "../../middlewares/auth";
import express from 'express'
import { userBookingController } from "./userBooking.controller";


const router = express.Router()


router.get('/my-bookings',
    auth('user'),
    userBookingController.getUserAllBookings
)

export const UserBookingRoutes = router