import { prisma } from '../config/database';

type SessionUncheckedInput = {
    token: string,
    userId: number
}

async function createSession(data: SessionUncheckedInput) {
  return prisma.session.create({
    data,
  });
}

async function findSession(token: string) {
  return prisma.session.findFirst({
    where: {
      token,
    },
  });
}

export const authenticationRepository = {
  createSession,
  findSession,
};