import { userController } from "../controllers/user.controller";
import { Router } from "express";
import { validateBody } from "../middlewares/validation.middleware";
import { userSchemas } from "../schemas/user.schemas";

export const userRouter = Router()

userRouter
    .post('/sign-in', validateBody(userSchemas.create), userController.create)
