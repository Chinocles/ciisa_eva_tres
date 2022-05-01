import { Router } from 'express'
import AuthController from '../controllers/AuthController' 

const authRoutes = Router()
const authcontroller = new AuthController()

authRoutes.post('/login', authcontroller.loginUser)
authRoutes.post('/register', authcontroller.registerUser)


export default authRoutes