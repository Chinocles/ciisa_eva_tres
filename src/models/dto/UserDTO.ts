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
  
  export interface UpdateUserDTO extends BaseUserDTO {
    password: string
  }