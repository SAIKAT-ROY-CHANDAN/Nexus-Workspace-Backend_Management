import { Router } from "express";
import { AuthController } from "./auth.controller";
import { userValidation } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
    '/signup',
    validateRequest(userValidation.userValidationSchema),
    AuthController.createUser
)

router.post(
    '/login',
    AuthController.loginUser
)

export const AuthRoutes = router