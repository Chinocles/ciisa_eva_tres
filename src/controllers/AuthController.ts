import { Request, Response } from "express"
import { generateToken } from "../lib/jwt"
import { CreateUserDTO } from "../models/dto/UserDTO"
import UserRepository from "../models/repositories/UserRepository"
import { loginSchema, registerSchema } from "../models/validators/userSchema"
import bcrypt from 'bcryptjs'

export default class AuthController {

public readonly loginUser = async (req: Request, res:Response) => {
  const credential = req.body

  try { await loginSchema.validateAsync(credential) } 
    catch (error) {
      res.status(400).json({error: error.message} )
    return
      }

    const repository = new UserRepository()

    const userFromDB = await repository.findByEmail(credential.email )

    if(!userFromDB || !bcrypt.compareSync(credential.password, userFromDB.password)){
        res.status(401).json({message: 'Invalid credentials'})
    return
  }
    const token = generateToken(userFromDB)
    res.json({token})
}

public readonly registerUser = async (req: Request, res: Response) => {
  const user = req.body as CreateUserDTO
    try { 
      await registerSchema.validateAsync(user)} 
    catch(error) {
      res.status(400).json({error: error.message})
    return
    }
  const hashedPass = bcrypt.hashSync(user.password, 10)
  const repository = new UserRepository()
  const newUser = await repository.create({ ...user, password: hashedPass })
  res.status(201).json(newUser)
  }
}