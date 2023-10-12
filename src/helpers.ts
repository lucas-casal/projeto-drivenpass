import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import Cryptr from "cryptr"

export const cryptr = new Cryptr(process.env.CRYPTR, {encoding: 'base64', pbkdf2Iterations: Number(process.env.CRYPTR_ITERATIONS), saltLength: Number(process.env.CRYPTR_SALT)}
)

const generateToken = async (user?: User) => {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
    return token;
}

export const helper = {
    generateToken
}

