import { Request, Response } from "express"
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "../models/dto/TaskDTO"
import TaskRepository from "../models/repositories/TaskRepository"
import { createTaskSchema, updateTaskSchema} from "../models/validators/taskSchemas"


export default class TaskController {

public readonly getAll = async (_req: Request, res: Response) => {
  const repository = new TaskRepository(1)
  const tasks: TaskDTO [] = await repository.findAll()
  res.json(tasks)
}

public readonly getById = async (req: Request, res: Response) => {
  const  { idTask } = req.params
  const repository = new TaskRepository(1)
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
 
  await createTaskSchema.validateAsync(task)
    } catch (error) {
  res.status(400).json({ message: error.message})
  return
}
const repository = new TaskRepository(1)

const newTask = await repository.create(task)

  res.json({ newTask })
}

public readonly update = async (req: Request, res: Response) => {
  const { idTask } = req.params
  const task = req.body as UpdateTaskDTO
  try {
    await updateTaskSchema.validateAsync(task)
  } catch (error) {
    res.status(400).json({ message: error.message})
    return
  
  }
  const repository = new TaskRepository(1)
  await repository.update( parseInt(idTask), task)
  res.sendStatus(204)
}

public readonly delete = async (req: Request, res: Response) => {
  const { idTask } = req.params
  const repository = new TaskRepository(1)
  await repository.delete(parseInt (idTask))
  res.sendStatus(204)

}
}