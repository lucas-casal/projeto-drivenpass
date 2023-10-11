import supertest from 'supertest';
import { database } from 'config/database';
import { describe } from 'node:test';
import { server } from 'index';

beforeAll(async () => {
  await database.connect();
});

beforeEach(async () => {
  await database.clean();
});

describe('criação de usuário', () => {
  it ('should return 400 if email is not valid', async () => {
    const user = {
      email: 'lucas',
      password: '123456'
    }

    const {status} = await server.post('/users/sign-in').send(user)

    expect(status).toBe(400)

  })
  it ('should return 201 if there is no problem', async () => {
    const user = {
      email: 'lucas@gmail.com',
      password: '123456'
    }

    const {status, body} = await server.post('/users/sign-in').send(user)

    expect(status).toBe(201)
    expect(body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      email: expect.any(String)
    }))
  })

})