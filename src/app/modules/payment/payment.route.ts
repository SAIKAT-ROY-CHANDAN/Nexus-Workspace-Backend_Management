import express from 'express'
import { initiatePaymentForBooking } from './payment.controller';

const router = express.Router()

router.post('/', initiatePaymentForBooking);

export const PaymentRoutes = router