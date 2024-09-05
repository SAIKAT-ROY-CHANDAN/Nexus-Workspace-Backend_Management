/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Schema, model } from "mongoose";
import { TUser } from "./auth.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

export const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String },
    role: {
        type: String,
        enum: ['admin', 'user'],
        message: '{VALUE} is not a valid user'
    },
    address: { type: String },
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            return ret;
        }
    },
    toObject: {
        transform(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
})

userSchema.pre('save', async function (next) {
    const user = this
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
})

export const User = model<TUser>('User', userSchema)