import express from 'express'
import { slotController } from './slot.controller'
import validateRequest from '../../middlewares/validateRequest'
import { slotValidation } from './slot.validation'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/',
    auth('admin'),
    validateRequest(slotValidation.slotValidationSchema),
    slotController.createSlot
)

router.get('/availability',
    slotController.getAvailableAllSlots
)

export const SlotRoutes = router