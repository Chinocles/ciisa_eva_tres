export interface BaseUserDTO {
  email: string 
  }
  
  export interface UserDTO extends BaseUserDTO {
    userId : number
    firstName: string
    lastName: string
    }
  
  export interface CreateUserDTO extends BaseUserDTO {
    firstName: string
    lastName: string
    password: string
    }

  export interface LoginUserDTO {
    userId : number
    password : string
    email : string
    }
  
  export type UpdateUserDTO = Partial <BaseUserDTO>

  export interface UserTokenPayload {
    sub: string
    email: string
    exp: number
    iat: number
    }