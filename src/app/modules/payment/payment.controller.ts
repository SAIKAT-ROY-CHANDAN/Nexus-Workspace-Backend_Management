import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { paymentServices } from './payment.service';

export const initiatePaymentForBooking = catchAsync(async (req: Request, res: Response) => {
    const { bookingIds } = req.body;

    const paymentResult = await paymentServices.processPayment(bookingIds.bookingIds, bookingIds.user);

    return res.status(200).json({
        success: true,
        message: 'Payment processed successfully',
        data: paymentResult
    });
}
)

