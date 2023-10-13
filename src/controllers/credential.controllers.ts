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

const getAll = async (req: AuthenticatedRequest, res: Response) => {
    const {userId} = req;

    const credentials = await credentialService.getAll(userId)

    res.status(httpStatus.OK).send(credentials)
}

const getOne = async (req: AuthenticatedRequest, res: Response) => {
    const {credentialId} = req.params;
    const {userId} = req;

    const credential = await credentialService.getOne(Number(credentialId), userId)

    res.status(httpStatus.OK).send(credential)
}
export const credentialController = {
    create,
    getAll,
    getOne
}