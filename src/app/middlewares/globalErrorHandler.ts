import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import AppError from "../errors/AppError";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something Went Wrong';
    let errorSources: TErrorSource = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources
    }else if (err instanceof AppError) {
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