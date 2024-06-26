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

            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED, 'You have no access to this route'
                );
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED, 'You have no access to this route'
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
                // throw new AppError(
                //     httpStatus.UNAUTHORIZED,
                //     'You have no access to this route'
                // )
                res.status(404).json({
                    success: false,
                    message: 'You have no access to this route',
                })
            }
            next()
        }
    )
}

export default auth