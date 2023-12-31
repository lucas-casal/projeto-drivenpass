import express, {Express} from 'express';
import cors from 'cors';
import 'express-async-errors';
import { handleApplicationErrors } from './middlewares/error.handling.middleware';
import { userRouter } from './routers';
import { database } from './config/database';
import supertest from 'supertest';
import credentialRouter from '../src/routers/credential.router';

const app = express();
app
    .use(cors())
    .use(express.json())
    .use('/users', userRouter)
    .use('/credentials', credentialRouter)
    .use(handleApplicationErrors)

export function init(): Promise<Express> {
    database.connectDb();
    return Promise.resolve(app);
}
    
export async function close(): Promise<void> {
    await database.disconnectDB();
}

export const server = supertest(app)

    
export default app;