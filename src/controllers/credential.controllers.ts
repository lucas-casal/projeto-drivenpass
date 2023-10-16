import httpStatus from "http-status";
import { credentialService } from "../services/credential.service";
import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication.middleware";

const create = async (req: AuthenticatedRequest, res: Response) => {
    const {userId} = req;
    const {body} = req;
    const result = await credentialService.create(userId, body)

    res.status(httpStatus.CREATED).send(result)
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

const deleteOne = async (req: AuthenticatedRequest, res: Response) => {
    const {credentialId} = req.params;
    const {userId} = req;

    const credential = await credentialService.deleteOne(Number(credentialId), userId)
console.log(`"${credential.title}" excluída com sucesso`)
    res.status(httpStatus.OK).send(`"${credential.title}" excluída com sucesso`)
}
export const credentialController = {
    create,
    getAll,
    getOne,
    deleteOne

}