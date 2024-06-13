import express from 'express'
import { RoomController } from './room.controller'
import { roomValidation } from './room.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router()

router.post('/',
    auth('admin'),
    validateRequest(roomValidation.roomValidationSchema),
    RoomController.createRoom
)

router.get('/',
    RoomController.getRooms
)

router.get('/:id',
    RoomController.getSingleRoom
)

router.patch('/:id',
    auth('admin'),
    validateRequest(roomValidation.roomUpdateValidationSchema),
    RoomController.updateSingleRoom
)

router.delete('/:id',
    auth('admin'),
    RoomController.deleteRoom
)


export const RoomRoutes = router;