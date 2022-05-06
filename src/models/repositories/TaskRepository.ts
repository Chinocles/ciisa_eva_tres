import { PrismaClient } from "@prisma/client";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "../dto/TaskDTO";

const prisma = new PrismaClient()

export default class TaskRepository {
  private userId: number
  
  constructor(userId: number) { this.userId = userId}

  public readonly findAll = async (): Promise<TaskDTO[]> => {
    const tasks = await prisma.task.findMany({
      where : {
        userId: this.userId  
      }
    })
    return tasks
    }

  public readonly findById = async (idTask: number):Promise<TaskDTO | undefined> => {
    const task = await prisma.task.findFirst({
      where : {
        idTask,
        userId: this.userId  
      }
    })
    if (!task) return
    return task
    }

  public readonly create = async (task: CreateTaskDTO): Promise<TaskDTO>=> {
    const newTask = await prisma.task.create(
      {data: {
        ...task,
        done: false,
        userId: this.userId
      }}
    )
    return newTask
    }

  public readonly update = async (idTask: number, task: UpdateTaskDTO): Promise<void> => {
    await prisma.task.updateMany({
      where: { idTask,
        userId : this.userId },
        data: task
    })
  }

  public readonly delete = async (idTask: number) => {
  await prisma.task.deleteMany({
  where: { idTask,
    userId : this.userId }
    })
  }

}