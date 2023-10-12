import { Request, Response } from 'express'
import httpStatus from 'http-status';
import { userService } from '../services/user.service';
const create = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const user = await userService.create(email, password)

    res.status(httpStatus.CREATED).send(user)
}

const login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const user = await userService.login(email, password)

    res.status(httpStatus.OK).send(user)
}

export const userController = {
    create,
    login
}