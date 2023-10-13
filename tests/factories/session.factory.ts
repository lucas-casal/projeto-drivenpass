import * as jwt from 'jsonwebtoken';
import { Session, User } from '@prisma/client';
import { userFactory } from './user.factory';
import { prisma } from 'config/database';

const generateToken = async (user?: User) => {
    const incomingUser = user || (await userFactory.create());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);
  
    return token;
}

const create = async (data: Omit<Session, 'id'>) => {
    const session = await prisma.session.create({
        data
    })

    const sessionA = await prisma.session.findMany({})
    console.log(sessionA)
    return session
}


export const sessionFactory = {
    generateToken,
    create
}

