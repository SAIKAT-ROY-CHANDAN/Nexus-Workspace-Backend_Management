import { Router } from "express";
import { RoomRoutes } from "../modules/room/room.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { BookingRoutes } from "../modules/Booking/booking.route";
import { UserBookingRoutes } from "../modules/userBooking/userBooking.route";
import { PaymentRoutes } from "../modules/payment/payment.route";


const router = Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/rooms',
        route: RoomRoutes
    },
    {
        path: '/payment',
        route: PaymentRoutes
    },
    {
        path: '/slots',
        route: SlotRoutes
    },
    {
        path: '/bookings',
        route: BookingRoutes
    },
    {
        path: '/',
        route: UserBookingRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router