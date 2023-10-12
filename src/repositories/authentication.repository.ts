import { prisma } from '../config/database';

type SessionUncheckedInput = {
    token: string,
    userId: number
}

const createSession = async (data: SessionUncheckedInput) => {
  const session = await prisma.session.create({
    data,
  });

  return session
}

const findSession = async (token: string) => {
  const session = await prisma.session.findFirst({
    where: {
      token,
    },
  });

  return session;
}

export const authenticationRepository = {
  createSession,
  findSession,
};