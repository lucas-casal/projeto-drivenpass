import Joi from "joi";

const create = Joi.object({
    title: Joi.string().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    url: Joi.string().uri().required()
})

const credentialId = Joi.object({
    credentialId: Joi.number().min(1).integer().required()
})
export const credentialSchemas = {
    create,
    credentialId
}