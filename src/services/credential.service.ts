import { errors } from "errors/errors"
import { cryptr } from "helpers"
import { credentialRepository } from "repositories/credential.repository"

////////////////////////////////////////////////////////
export type createBody = {
    title: string,
    url: string,
    username: string,
    password: string,
    userId?: number
}
////////////////////////////////////////////////////////
const create = async (userId: number, body: createBody) => {
    const {title, url, username, password} = body

    const titles: string[] = await credentialRepository.findByUserId(userId)
    if(titles.indexOf(title) >= 0) throw errors.conflictError(title)

    const hash = cryptr.encrypt(password)
    
    const credential = await credentialRepository.create({userId, title, url, username, password: hash})

    return credential
}   
export const credentialService = {
    create
}
