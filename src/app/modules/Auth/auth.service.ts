import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./auth.interface";
import { User } from "./auth.model";
import bcrypt from 'bcrypt'

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)
    return result
}

const loginUserIntoDB = async (payload: Partial<TUser>) => {
    const {email, password} = payload;

    const user = await User.findOne({email})

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found')
    }

    const isPasswordCorrect = await bcrypt.compare(password as string, user.password);

    if(!isPasswordCorrect){
        throw new AppError(httpStatus.FORBIDDEN, 'Your Password is Incorrect')
    }
   
    return user
}

export const AuthService = {
    createUserIntoDB,
    loginUserIntoDB
}