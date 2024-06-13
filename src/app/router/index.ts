import { Router } from "express";
import { RoomRoutes } from "../modules/room/room.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { SlotRoutes } from "../modules/slot/slot.route";

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
        path: '/slots',
        route: SlotRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router