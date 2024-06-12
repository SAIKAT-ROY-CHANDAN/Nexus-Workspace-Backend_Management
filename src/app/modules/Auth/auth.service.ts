import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./auth.interface";
import { User } from "./auth.model";
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)
    return result
}

const loginUserIntoDB = async (payload: Partial<TUser>) => {
    const { email, password } = payload;

    if (!email || !password) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Email and password are required');
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found')
    }

    const isPasswordCorrect = await bcrypt.compare(password as string, user.password);

    if (!isPasswordCorrect) {
        throw new AppError(httpStatus.FORBIDDEN, 'Your Password is Incorrect')
    }

    const jwtPayload = {
        userId: user._id.toString(),
        role: user.role
    }
    console.log(jwtPayload);

    const token = createToken(jwtPayload, config.jwt_access_token as string)

    return { user, token }
}

export const AuthService = {
    createUserIntoDB,
    loginUserIntoDB
}