import { Request, Response } from "express"
import { CreateUserDTO } from "../models/dto/UserDTO"
import UserRepository from "../models/repositories/UserRepository"
import { loginSchema, registerSchema } from "../models/validators/userSchema"



export default class AuthController {

public readonly loginUser = async (req: Request, res:Response) => {
const credential = req.body

try { await loginSchema.validateAsync(credential)} 
catch (error) {
  res.status(400).json({error: error.message})
  return
  }

  res.status(201).json(credential)
}

public readonly registerUser = async (req: Request, res: Response) => {
  const user = req.body as CreateUserDTO
  try { await registerSchema.validateAsync(user)} catch(error) {
    res.status(400).json({error: error.message})
    return
  }
  const repository = new UserRepository()
  const newUser = await repository.create(user)
  res.status(201).json(newUser)

}




}