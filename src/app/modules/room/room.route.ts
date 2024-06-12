import express from 'express'
import { RoomController } from './room.controller'

const router = express.Router()

router.post('/',
    RoomController.createRoom
)


export const RoomRoutes = router;