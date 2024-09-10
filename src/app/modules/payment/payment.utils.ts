/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const initiatePayment = async (booking: any) => {


    const response = await axios.post(process.env.PAYMENT_URL!, {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        tran_id: booking.transactionId,
        success_url: "http://www.merchantdomain.com/sucesspage.html",
        fail_url: "http://www.merchantdomain.com/failedpage.html",
        cancel_url: "http://www.merchantdomain.com/cancellpage.html",
        amount: "10.0",
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: booking.user.name,
        cus_email: booking.user.email,
        cus_add1: booking.user.address,
        cus_phone: booking.user.phone,
        cus_add2: "Mohakhali DOHS",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1206",
        cus_country: "Bangladesh",
        type: "json"
    })

    console.log(response);
    return response.data
};


export const verifyPayment = async (tnxId: string) => {
    try {
        const response = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
            params: {
                store_id: process.env.STORE_ID,
                signature_key: process.env.SIGNETURE_KEY,
                type: "json",
                request_id: tnxId
            }
        });

        return response.data;
    }
    catch (err) {
        throw new Error("Payment validation failed!")
    }
}