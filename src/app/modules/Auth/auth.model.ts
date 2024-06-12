import { Schema, model } from "mongoose";
import { TUser } from "./auth.interface";

export const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true},
    phone: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'user'],
        message: '{VALUE} is not a valid user'
    },
    address: { type: String, required: true },
})

export const User = model<TUser>('user', userSchema)