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

    try {
      const userFromDB = await repository.findByEmail(credential.email )

    if(!userFromDB || !bcrypt.compareSync(credential.password, userFromDB.password)){
        res.status(401).json({message: 'Invalid credentials'})
    return
     }
    const token = generateToken(userFromDB)
    res.json({token})
    } catch (error) {
      console.log(error)
      res.status(500).json({message:'Something went wrong' })
    }
    
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

  try {
    const newUser = await repository.create({ ...user, password: hashedPass })
    res.status(201).json(newUser)
  } catch (error){
    if (error.code === 'P2002'){
      res.status(409).json({message: 'User already exists'})
      return
    }
    console.log(error)
    console.log ('Error code:', error.code)
    res.status(500).json({ message: 'Something went wrong'})
  }
 }
}