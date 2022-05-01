import { PrismaClient } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../dto/UserDTO";

const prisma = new PrismaClient()

export default class UserRepository {

  public readonly findAll = async (): Promise<UserDTO[]> => {

    const users = await prisma.user.findMany  ()
  return users
  }

  public readonly findById = async (userId: number):Promise<UserDTO | undefined> => {
    const user = await prisma.user.findFirst({
      where : {
        userId 
      }
    })
    if (!user) return
    return user
  }

  public readonly create = async (user: CreateUserDTO): Promise<CreateUserDTO>=> {

    await prisma.user.create(
      {data: user}
    )
    return user
  }

  public readonly update = async (userId: number, user: UpdateUserDTO): Promise<void> => {
    await prisma.user.update({
      where: { 
        userId },
        data: user
    })
  }

  public readonly delete = async (userId: number): Promise<void> => {
    await prisma.user.delete({
      where: { 
      userId 
    }
  })
  }
}

