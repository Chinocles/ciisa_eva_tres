import { Request, Response } from "express"
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "../models/dto/TaskDTO"
import { UserTokenPayload } from "../models/dto/UserDTO"
import TaskRepository from "../models/repositories/TaskRepository"
import { createTaskSchema, updateTaskSchema} from "../models/validators/taskSchemas"
export default class TaskController {

public readonly getAll = async (req: Request, res: Response) => {
  const user = req.user as UserTokenPayload
  const repository = new TaskRepository( parseInt(user.sub))
  const tasks: TaskDTO [] = await repository.findAll()
  res.json(tasks)
}

public readonly getById = async (req: Request, res: Response) => {
  const  { idTask } = req.params
  const user = req.user as UserTokenPayload
  const repository = new TaskRepository( parseInt(user.sub))
  const task = await repository.findById(parseInt(idTask))
    if (!task){
      res.status(404).json({message: 'Task not found'})
    return
  }
  res.json(task)
}

public readonly create = async (req: Request, res: Response) => {
  const task = req.body as CreateTaskDTO
  try {
    await createTaskSchema.validateAsync(task)} 
      catch (error) {
        res.status(400).json({ message: error.message})
      return
}
  const user = req.user as UserTokenPayload
  const repository = new TaskRepository(parseInt(user.sub))
  const newTask = await repository.create(task)

  res.json({ newTask })
}

public readonly update = async (req: Request, res: Response) => {
  const { idTask } = req.params
  const task = req.body as UpdateTaskDTO
    try {
      await updateTaskSchema.validateAsync(task)} 
        catch (error) {
        res.status(400).json({ message: error.message})
    return
  
  }
  const user = req.user as UserTokenPayload
  const repository = new TaskRepository(parseInt(user.sub))
  await repository.update( parseInt(idTask), task)
  res.sendStatus(204)
}

public readonly delete = async (req: Request, res: Response) => {
  const { idTask } = req.params
  const user = req.user as UserTokenPayload
  const repository = new TaskRepository(parseInt (user.sub))
  await repository.delete(parseInt (idTask))
  res.sendStatus(203)
  }

}