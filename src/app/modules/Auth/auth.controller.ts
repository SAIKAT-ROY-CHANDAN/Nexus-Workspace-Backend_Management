import { Request, Response } from "express"
import { AuthService } from "./auth.service"
import catchAsync from "../../utils/catchAsync"

const createUser = catchAsync(
    async (req: Request, res: Response) => {
        const result = await AuthService.createUserIntoDB(req.body)

        res.status(200).json({
            success: true,
            message: 'User Registered successfully',
            data: result
        })
    }
)

const loginUser = catchAsync(
    async (req: Request, res: Response) => {
        const result = await AuthService.loginUserIntoDB(req.body)
        const { user, token } = result

        res.cookie('token', token, {httpOnly: true});

        res.status(200).json({
            success: true,
            message: 'User Logged in successfully',
            data: {
                token,
                user
            }
        })
    }
)

export const AuthController = {
    createUser,
    loginUser
}