import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export async function cleanDb() {
  await prisma.credential.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}

export const database = {
  connectDb,
  disconnectDB,
  cleanDb
}