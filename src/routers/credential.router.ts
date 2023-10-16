import { credentialController } from "../controllers/credential.controllers";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication.middleware";
import { validateBody, validateParams } from "../middlewares/validation.middleware";
import { credentialSchemas } from "../schemas/credential.schemas";

const credentialRouter = Router();

credentialRouter.all('/*', authenticateToken)
    .post('/register', validateBody(credentialSchemas.create), credentialController.create)
    .get('/', credentialController.getAll)
    .get('/:credentialId', validateParams(credentialSchemas.credentialId), credentialController.getOne)
    .delete('/:credentialId', validateParams(credentialSchemas.credentialId), credentialController.deleteOne)
export default credentialRouter;