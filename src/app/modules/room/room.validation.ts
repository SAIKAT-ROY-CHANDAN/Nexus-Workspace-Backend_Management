import { z } from 'zod';

const roomValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        roomNo: z.number().int().positive({ message: 'Room number must be greater than 0' }),
        floorNo: z.number().int().positive({ message: 'Floor number must be greater than 0' }),
        capacity: z.number().int().min(1, { message: 'Capacity must be at least 1' }),
        pricePerSlot: z.number().min(0, { message: 'Price per slot cannot be negative' }),
        amenities: z.array(z.string()),
        isDeleted: z.boolean().optional().default(false)
    })
});

export const roomValidation = {
    roomValidationSchema
} 
