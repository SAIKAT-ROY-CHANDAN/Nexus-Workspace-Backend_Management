import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./auth.interface";
import { User } from "./auth.model";

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)
    return result
}

const loginUserIntoDB = async (payload: Partial<TUser>) => {
    const {email} = payload;

    const user = await User.findOne({email})

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found')
    }
   
    return user
}

export const AuthService = {
    createUserIntoDB,
    loginUserIntoDB
}