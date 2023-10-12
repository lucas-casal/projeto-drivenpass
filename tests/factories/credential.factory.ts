import {faker} from '@faker-js/faker';
import { prisma } from '../../src/config/database';
import { createBody } from 'services/credential.service';
import { cryptr } from 'helpers';
import { userFactory } from './user.factory';
export const createCredential = async (params: Partial<createBody> = {})=> {
  const incomingPassword = params.password || faker.internet.password(6);
  const username = params.username || faker.internet.userName();
  const userId = params.userId || (await userFactory.create()).id
  const title = params.title || faker.animal.bear();
  const url = params.url || faker.internet.url()

  const hashedPassword = await cryptr.encrypt(incomingPassword);

  const credential = await prisma.credential.create({
    data: {
      title: title,
      username: username,
      password: hashedPassword,
      userId: userId,
      url: url
    }});

  return credential;
}
