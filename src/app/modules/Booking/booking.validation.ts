import { z } from "zod";

const createBookingSchema = z.object({
    body: z.object({
        date: z.string().date(),
        slots: z.array(z.string()),
        room: z.string(),
        user: z.string(),
    })
})

export const bookingValidation = {
    createBookingSchema
}