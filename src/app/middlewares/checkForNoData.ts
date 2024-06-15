import { Request, Response, NextFunction } from 'express';

const checkForNoData = (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.data === null || (Array.isArray(res.locals.data) && res.locals.data.length === 0)) {
        return res.status(404).json({
            success: false,
            message: "No data found"
        });
    }
    next();
};

export default checkForNoData
