import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository';

const create = async (email: string, password: string) => {
    const hash = await bcrypt.hash(password, 10);
    const user = await userRepository.create(email, hash)

    delete user.password
    
    return user
}

export const userService = {
    create
}