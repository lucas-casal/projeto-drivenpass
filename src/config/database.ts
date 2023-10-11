import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;
const connect = (): void  => {
  prisma = new PrismaClient();
}

const disconnect = async (): Promise<void> => {
  await prisma?.$disconnect();
}

const clean = async (): Promise<void> => {
  await prisma.session.deleteMany({});
  await prisma.credential.deleteMany({});
  await prisma.user.deleteMany({});
}

export const database = {
  connect,
  disconnect,
  clean
}