import { errors } from "../errors/errors"
import { cryptr } from "../helpers"
import { credentialRepository } from "../repositories/credential.repository"

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

    const credentials = await credentialRepository.findByUserId(userId)
    
    const titles = []
    credentials.map(x => {
        titles.push(x.title)
    })
    
    if(titles.indexOf(title) >= 0) throw errors.conflictError(title)
    
    const hash = cryptr.encrypt(password)
    
    const credential = await credentialRepository.create({userId, title, url, username, password: hash})

    return credential
}  

const getAll = async (userId: number) => {
    const credentials = await credentialRepository.findByUserId(userId) || []
    credentials.map(async x => {
        console.log(x.password)

        x.password = await cryptr.decrypt(x.password)
        console.log(x.password)
    })
    return credentials;
}


const getOne = async (credentialId: number, userId: number) => {
    if (credentialId > 2147483647) throw errors.notFoundError('Credencial')
    
    const credential = await credentialRepository.findByCredentialId(credentialId)

    if (!credential) throw errors.notFoundError('Credencial')

    if (credential.userId !== userId) throw errors.unauthorizedError()

    credential.password = cryptr.decrypt(credential.password)

    return credential;
}

const deleteOne = async (credentialId: number, userId: number) => {
    if (credentialId > 2147483647) throw errors.notFoundError('Credencial')

    const credential = await credentialRepository.findByCredentialId(credentialId)
    if (!credential) throw errors.notFoundError('Credencial')
    if (credential.userId !== userId) throw errors.unauthorizedError()

    await credentialRepository.deleteByCredentialId(credentialId)

    return credential;
}



export const credentialService = {
    create,
    getAll,
    getOne,
    deleteOne
}
