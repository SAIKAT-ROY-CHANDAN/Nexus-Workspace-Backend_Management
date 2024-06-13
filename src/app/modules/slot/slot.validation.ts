import { z } from "zod";

const timeSchema = z.string().refine(
    (time) => {
        const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return regex.test(time);
    },
    {
        message: 'Invalid time format , expected "HH:MM" in 24 hours format',
    },
);

const slotValidationSchema = z.object({
    body: z.object({
        room: z.string(),
        date: z.string().date(),
        startTime: timeSchema,
        endTime: timeSchema
    })
})

const UpdateSlotValidationSchema = z.object({
    body: z.object({
        room: z.string().optional(),
        date: z.string().date().optional(),
        startTime: timeSchema.optional(),
        endTime: timeSchema.optional(),
    })
})

export const slotValidation = {
    slotValidationSchema,
    UpdateSlotValidationSchema
}
