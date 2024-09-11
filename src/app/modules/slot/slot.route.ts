import express from 'express'
import { slotController } from './slot.controller'
import validateRequest from '../../middlewares/validateRequest'
import { slotValidation } from './slot.validation'
// import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/',
    // auth('admin'),
    validateRequest(slotValidation.slotValidationSchema),
    slotController.createSlot
)

router.get('/availability',
    slotController.getAvailableAllSlots
)

router.patch('/:id',
    validateRequest(slotValidation.UpdateSlotValidationSchema),
    slotController.updatedSlots
)

router.delete('/:id',
    slotController.deleteSlot
)

export const SlotRoutes = router