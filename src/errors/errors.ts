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
export const errors = {
    unauthorizedError,
    invalidDataError
}