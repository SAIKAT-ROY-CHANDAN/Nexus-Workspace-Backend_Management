/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Booking } from "../Booking/booking.model";
import { initiatePayment } from "./payment.utils";

const processPayment = async (bookingIds: string[], user: any) => {
    let totalAmount = 0;
    const bookings = [];

    for (const bookingId of bookingIds) {
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            throw new AppError(httpStatus.NOT_FOUND, `Booking with ID ${bookingId} not found`);
        }

        bookings.push(booking);

        totalAmount += booking.totalAmount ?? 0;
    }

    if (totalAmount === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Total amount is zero. No payment required.");
    }

    const transactionId = `TXN-${Date.now()}`;

    const paymentSession = await initiatePayment(bookings, user, transactionId, totalAmount);
    console.log("Payment initiated: ", paymentSession);

    if (paymentSession.result === 'true') {
        for (const booking of bookings) {
            await Booking.findByIdAndUpdate(booking._id, {
                paymentStatus: "paid",
                transactionId
            });
        }

        return {
            paymentUrl: paymentSession.payment_url,
            transactionId,
            totalAmount,
            bookingIds
        };
    } else {
        throw new AppError(httpStatus.PAYMENT_REQUIRED, "Payment initiation failed.");
    }
};



// import { verifyPayment } from "./payment.utils";

// const confirmationService = async (transactionId: string, status: string) => {
//     const verifyResponse = await verifyPayment(transactionId);
//     console.log(verifyResponse);

//     let result;
//     let message = "";

//     if (verifyResponse && verifyResponse.pay_status === 'Successful') {
//         result = await Slot.findOneAndUpdate({ transactionId }, {
//             paymentStatus: 'Paid'
//         });
//         message = "Successfully Paid!"
//     }
//     else {
//         message = "Payment Failed!"
//     }

//     const filePath = join(__dirname, '../../../views/confirmation.html');
//     let template = readFileSync(filePath, 'utf-8')

//     template = template.replace('{{message}}', message)

//     return template;
// }

export const paymentServices = {
    // confirmationService
    processPayment
}