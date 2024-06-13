import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/Auth/auth.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from '../config';
import { User } from '../modules/Auth/auth.model';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {

            const token = req.headers.authorization

            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED, 'You are not authorized'
                )
            }

            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string
            ) as JwtPayload


            const { role, userId } = decoded;

            // checking if the user is exist
            const user = await User.findById(userId);

            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You are not authorized!'
                )
            }
            next()
        }
    )
}

export default auth