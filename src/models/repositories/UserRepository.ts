import { PrismaClient } from "@prisma/client";
import { CreateUserDTO, LoginUserDTO, UpdateUserDTO, UserDTO } from "../dto/UserDTO";

const prisma = new PrismaClient()

export default class UserRepository {

  public readonly findAll = async(): Promise<UserDTO[]> => {
    const users = await prisma.user.findMany()
    const usersWithoutPass = users.map(user => {
      const {password, ...usersWithoutPass} = user
      return usersWithoutPass
      })
    return usersWithoutPass
    }

  public readonly findById = async (userId: number):Promise<UserDTO | undefined> => {
    const user = await prisma.user.findUnique({
      where : {
        userId }
      })
    if (!user) return
    const {password, ...usersWithoutPass } = user
    return usersWithoutPass
  }

  public readonly findByEmail = async (email: string):Promise<LoginUserDTO | undefined> =>{
    const user = await prisma.user.findUnique({
      where : {email}
      })
    if (!user) return
    return user
  }

  public readonly create = async (user: CreateUserDTO): Promise<UserDTO>=> {
    const newUser = await prisma.user.create(
      {data: user}
    )
    const {password, ...usersWithoutPass } = newUser
    return usersWithoutPass
  }

  public readonly update = async (userId: number, user: UpdateUserDTO): Promise<void> => {
    await prisma.user.update({
      where: { 
        userId },
        data: user })
 }

  public readonly delete = async (userId: number): Promise<void> => {
    await prisma.user.delete({
      where: { 
      userId }
    })
  }
}
