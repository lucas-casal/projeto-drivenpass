import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { userFactory } from './user.factory';

const generateToken = async (user?: User) => {
    const incomingUser = user || (await userFactory.create());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);
  
    return token;
}

export const sessionFactory = {
    generateToken
}

