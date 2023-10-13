import { prisma } from '../config/database';

export type SessionUncheckedInput = {
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
  console.log('find ' + token)
  const session = await prisma.session.findFirst({
    where: {
      token,
    },
  });

  const sessions = await prisma.session.findMany({});

  console.log(sessions)
  return session;
}

export const authenticationRepository = {
  createSession,
  findSession,
};