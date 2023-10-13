import { cleanDb, database } from 'config/database';
import { init, server } from 'index';
import { userFactory } from '../factories/user.factory';
beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await database.cleanDb();
});





describe('criação de usuário', () => {
  describe( 'erros', () => {
    it ('should return 400 if email is not valid', async () => {
      const user = {
        email: 'lucas',
        password: '123456'
      }

      const {status} = await server.post('/users/sign-up').send(user)

      expect(status).toBe(400)

    })

    it ('should return 400 if password is shorter than 3', async () => {
      const user = {
        email: 'lucas@gmail.com',
        password: 'sa'
      }

      const {status} = await server.post('/users/sign-up').send(user)

      expect(status).toBe(400)
    })
  })

  describe('acerto', () => {
    it ('should return 201 if there is no problem', async () => {
      const user = {
        email: 'lucas@gmail.com',
        password: '123456'
      }
  
      const {status, body} = await server.post('/users/sign-up').send(user)
  
      expect(status).toBe(201)
      expect(body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        email: expect.any(String)
      }))
    })
  })


})

describe('login de usuário', () => {
  describe( 'erros', () => {
    it ('should return 400 if email is not valid', async () => {
      const user = {
        email: 'lucas',
        password: '123456'
      }
      
      const {status} = await server.post('/users/login').send(user)

      expect(status).toBe(400)

    })

    it ('should return 400 if password is shorter than 3', async () => {
      const user = {
        email: 'lucas@gmail.com',
        password: 'sa'
      }

      const {status} = await server.post('/users/login').send(user)

      expect(status).toBe(400)
    })

    it ('should return 404 if user does not exist', async () => {
      const user = {
        email: 'lucas@gmail.com',
        password: '123456'
      }

      const {status} = await server.post('/users/login').send(user)

      expect(status).toBe(404)
    })

    it ('should return 403 if password is incorrect', async () => {
      const user = {
        email: 'lucas@gmail.com',
        password: '123456'
      }
      const registered = await userFactory.create(user)

      user.password = '4798'

      const {status} = await server.post('/users/login').send(user)

      expect(status).toBe(401)
    })
  })

  describe('acerto', () => {
    it ('should return 200 if there is no problem', async () => {
      const user = {
        email: 'lucas@gmail.com',
        password: '123456'
      }
      const registered = await userFactory.create(user)

      const {status, body} = await server.post('/users/login').send(user)

      expect(status).toBe(200)
      expect(body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        token: expect.any(String)
      }))
    })
  })


})

