import { prisma } from "config/database"
import { createBody } from "services/credential.service"

const deleteByCredentialId = async (id: number) => {
    await prisma.credential.delete({
        where: {id}
    })
}
const findByCredentialId = async (id: number) => {
    const credential = await prisma.credential.findFirst({
        where: {id}
    })

    return credential
}

const findByUserId = async (userId: number) => {
    const result = await prisma.credential.findMany({
        where: {userId}
    })

    return result
}

const create = async (data: createBody) => {
    const result = await prisma.credential.create({
        data: {
            username: data.username,
            password: data.password,
            url: data.url,
            userId: data.userId,
            title: data.title
        }
    })

    return result
}

export const credentialRepository = {
    create,
    findByUserId,
    findByCredentialId,
    deleteByCredentialId
}
