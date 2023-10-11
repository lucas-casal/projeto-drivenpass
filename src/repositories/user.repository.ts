import { prisma } from "config/database"

const create = async (email: string, password: string) => {
    const result = await prisma.user.create({
        data:{
            email,
            password
        }
    })
    
    return result
}
export const userRepository = {
    create
}