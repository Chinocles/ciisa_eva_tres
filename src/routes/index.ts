import { Router } from 'express'
import authRoutes from './authRoutes'
import healthRoutes from './healthRoutes'
import taskRoutes from './taskRoutes'

const apiRoutes = Router()

apiRoutes.use('/', healthRoutes)
apiRoutes.use('/tasks', taskRoutes)
apiRoutes.use('/auth', authRoutes)


export default apiRoutes
