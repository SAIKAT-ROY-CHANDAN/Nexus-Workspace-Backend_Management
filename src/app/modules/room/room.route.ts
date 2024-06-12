import express from 'express'
import { RoomController } from './room.controller'
import { roomValidation } from './room.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router()

router.post('/',
    validateRequest(roomValidation.roomValidationSchema),
    RoomController.createRoom
)

router.get('/',
    RoomController.getRooms
)

router.get('/:id',
    RoomController.getSingleRoom
)


export const RoomRoutes = router;