import { ApplicationError } from "protocols";

const invalidDataError = (message: string) :ApplicationError => {
    return {
        name: 'InvalidDataError',
        message,
    };
}
const unauthorizedError = () :ApplicationError => {
    return {
        name: 'UnauthorizedError',
        message: 'You must be signed in to continue',
    };
}
const unauthorizedLoginError = () :ApplicationError => {
    return {
        name: 'UnauthorizedError',
        message: 'The password is incorrect',
    };
}
const notFoundError = (source: string) :ApplicationError => {
    return {
        name: 'NotFoundError',
        message: `${source} não encontrado(a)`
    }
}

const conflictError = (source: string) => {
    const comp = source ? '"' + source + '"' : "Valor digitado"
    return {
        name: 'ConflictError',
        message: `${comp} já está em uso!`
    }
}
export const errors = {
    unauthorizedError,
    unauthorizedLoginError,
    invalidDataError,
    notFoundError,
    conflictError
}