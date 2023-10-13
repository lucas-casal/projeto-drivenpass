import { cleanDb, database } from 'config/database';
import { init, server } from 'index';
import { userFactory } from '../factories/user.factory';
import { credentialFactory } from '../factories/credential.factory';
import { sessionFactory } from '../factories/session.factory';
import { faker } from '@faker-js/faker';


beforeAll(async () => {
  await init();
  await cleanDb()
});

beforeEach(async () => {
  await database.cleanDb();
});
afterAll(async () => {
  await database.cleanDb();
});

describe('criação de credencial', () => {
  describe( 'erros', () => {
    it ('should return 400 if url is not valid', async () => {
      const user = await userFactory.create()
      const token = await sessionFactory.generateToken(user)
      const session = await sessionFactory.create({token, userId: user.id})

      const password = faker.internet.password(6);
      const username = faker.internet.userName();
      const title = faker.animal.rabbit();
      const url = 'oi'
      const credential = {password, username, title, url}


      const {status} = await server.post('/credentials/register').set('Authorization', `Bearer ${session.token}`).send(credential)

      expect(status).toBe(400)
    })

    it ('should return 401 if is not logged in', async () => {
      const user = await userFactory.create()
      const credential = await credentialFactory.generateCredential()

      const {status} = await server.post('/credentials/register').set('Authorization', `Bearer ${0}`).send(credential)
      expect(status).toBe(401)
    })
  })

  describe('acerto', () => {
    it ('should return 201 if there is no problem', async () => {
      const user = await userFactory.create()


      const token = await sessionFactory.generateToken(user)
      const session = await sessionFactory.create({token, userId: user.id})

      const credential = await credentialFactory.generateCredential()

      const {status, body} = await server.post('/credentials/register').set('Authorization', `Bearer ${session.token}`).send(credential)

      expect(status).toBe(201)
      expect(body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
        url: expect.any(String),
        userId: expect.any(Number)
      }))
    })
  })


})

////////////////////////////////////////////////////////////
describe('buscar credenciais', () => {
  describe( 'erros', () => {
    it ('should return 401 if is not logged in', async () => {
      const user = await userFactory.create()
      const token = await sessionFactory.generateToken(user)

      const {status} = await server.get('/credentials').set('Authorization', `Bearer ${token}`)

      expect(status).toBe(401)
    })
  })

  describe('acerto', () => {
    it ('should return 200 if there is no problem', async () => {
      const user = await userFactory.create()
      const token = await sessionFactory.generateToken(user)
      const session = await sessionFactory.create({token, userId: user.id})

      const credential = await credentialFactory.createCredential(user.id)
      console.log(credential)
      const {status, body} = await server.get('/credentials').set('Authorization', `Bearer ${session.token}`)

      expect(status).toBe(200)
      expect(body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
          url: expect.any(String),
          userId: expect.any(Number)
        })
      ])
    )
    })
  })


})

describe('buscar credencial específica', () => {
  describe( 'erros', () => {
    it ('should return 401 if is not logged in', async () => {
      const user = await userFactory.create()
      const token = await sessionFactory.generateToken(user)
      const credential = await credentialFactory.createCredential(user.id)
      const {status} = await server.get(`/credentials/${credential.id}`).set('Authorization', `Bearer ${token}`)

      expect(status).toBe(401)
    })
    it ('should return 401 if is not the owner', async () => {
      const userA = await userFactory.create()
      const userB = await userFactory.create()
      const token = await sessionFactory.generateToken(userA)
      const credential = await credentialFactory.createCredential(userB.id)
      const {status} = await server.get(`/credentials/${credential.id}`).set('Authorization', `Bearer ${token}`)

      expect(status).toBe(401)
    })
  })

  describe('acerto', () => {
    it ('should return 200 if there is no problem', async () => {
      const user = await userFactory.create()
      const token = await sessionFactory.generateToken(user)
      const session = await sessionFactory.create({token, userId: user.id})

      const credential = await credentialFactory.createCredential(user.id)
      console.log(credential)
      const {status, body} = await server.get(`/credentials/${credential.id}`).set('Authorization', `Bearer ${session.token}`)

      expect(status).toBe(200)
      expect(body).toEqual(expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
          url: expect.any(String),
          userId: expect.any(Number)
        }))
    })
  })


})
