import jwt from 'jsonwebtoken'
import { LoginUserDTO, UserTokenPayload} from '../models/dto/UserDTO'


const secret = process.env.JWT_SECRET as string

if (!secret) { 
    throw new Error('JWT Secret not found on env variables')
    }

export function generateToken(user: LoginUserDTO): string {
    return jwt.sign(
        { sub: user.userId, email: user.email},
        secret,
        {expiresIn:'3d' }
    )
}

export function verifyToken(token: string): UserTokenPayload {
    const verified = jwt.verify(token, secret)
    return verified as unknown as UserTokenPayload
}
