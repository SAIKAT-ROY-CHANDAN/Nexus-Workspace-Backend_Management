import { z } from "zod";

const userValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1).max(255),
        email: z.string().email().max(255),
        password: z.string().min(8).max(255),
        phone: z.string().max(20),
        role: z.enum(['admin', 'user']),
        address: z.string().min(1).max(255)
    })
})

export const userValidation = {
    userValidationSchema
}