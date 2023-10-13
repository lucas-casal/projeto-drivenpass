import { credentialController } from "controllers/credential.controllers";
import { Router } from "express";
import { authenticateToken } from "middlewares/authentication.middleware";

const credentialRouter = Router();

credentialRouter.all('/*', authenticateToken)
    .post('/register', credentialController.create)
    .get('/', credentialController.getAll)
    .get('/:credentialId', credentialController.getOne)
    
export default credentialRouter;