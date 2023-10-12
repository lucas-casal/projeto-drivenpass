import httpStatus from "http-status";
import { credentialService } from "services/credential.service";
import { Response } from "express";
import { AuthenticatedRequest } from "middlewares/authentication.middleware";

const create = async (req: AuthenticatedRequest, res: Response) => {
    const {userId} = req;
    const {body} = req;

    const result = await credentialService.create(userId, body)

    res.status(httpStatus.CREATED).send(`"${result}" foi registrado com sucesso`)
}

export const credentialController = {
    create,
}