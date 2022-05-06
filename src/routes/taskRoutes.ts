import { Router } from 'express'
import TaskController from '../controllers/TaskController'

const taskRoutes = Router()
const taskcontroller = new TaskController()

taskRoutes.get('/', taskcontroller.getAll)
taskRoutes.get('/:idTask', taskcontroller.getById )
taskRoutes.post('/', taskcontroller.create)
taskRoutes.put('/:idTask', taskcontroller.update)
taskRoutes.delete('/:idTask', taskcontroller.delete)

export default taskRoutes
