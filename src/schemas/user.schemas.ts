import Joi from "joi";

const create = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})

export const userSchemas = {
    create
}