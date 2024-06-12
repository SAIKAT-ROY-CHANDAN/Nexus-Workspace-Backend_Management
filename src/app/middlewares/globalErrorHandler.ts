import { ErrorRequestHandler } from "express";
import AppError from "../errors/AppError"
import { TErrorSource } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something Went Wrong';
    let errorSources: TErrorSource = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]

    if (err instanceof AppError) {
        statusCode = err?.statusCode
        message = err?.message
        errorSources = [
            {
                path: '',
                message: err.message,
            }
        ]
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,

        stack: err?.stack

    })
}

export default globalErrorHandler