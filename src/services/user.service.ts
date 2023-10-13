import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository';
import { errors } from '../errors/errors';
import { helper } from '../helpers';
import { authenticationRepository } from '../repositories/authentication.repository';

const create = async (email: string, password: string) => {
    const hash = await bcrypt.hash(password, 10);
    const user = await userRepository.create(email, hash)

    delete user.password
    
    return user
}

const login = async (email: string, password: string) => {
    const user = await userRepository.findByEmail(email)
    if (!user) throw errors.notFoundError('usuário')
    if(!bcrypt.compareSync(password, user.password)) throw errors.unauthorizedLoginError()
    
    const token = await helper.generateToken(user)
    const session = await authenticationRepository.createSession({token, userId: user.id})
    
    return session
}

export const userService = {
    create,
    login
}