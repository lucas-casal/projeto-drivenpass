import {faker} from '@faker-js/faker';
import { prisma } from '../../src/config/database';
import { createBody } from 'services/credential.service';
import { cryptr } from 'helpers';
import { userFactory } from './user.factory';

const createCredential = async (id: number, params: Partial<createBody> = {})=> {
  const incomingPassword = params.password || faker.internet.password(6);
  const username = params.username || faker.internet.userName();
  const userId = id || params.userId || (await userFactory.create()).id
  const title = params.title || faker.animal.rabbit();
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

  return {credential, incomingPassword};
}

const generateCredential = async ()=> {
  const password = faker.internet.password(6);
  const username = faker.internet.userName();
  const title = faker.animal.rabbit();
  const url = faker.internet.url()


  const credential = {
    title,
    username,
    password,
    url
  };

  return credential;
}

export const credentialFactory = {
  createCredential,
  generateCredential
}
