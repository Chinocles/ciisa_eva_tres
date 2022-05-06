export interface BaseTaskDTO {
  idTask?: number 
  title: string
  content: string
  }

export interface TaskDTO extends BaseTaskDTO {
  idTask: number
  title: string
  content: string
  done: boolean
  userId: number | null
  }

export interface CreateTaskDTO extends BaseTaskDTO {
  title: string
  content: string
  }

export interface UpdateTaskDTO extends Partial<BaseTaskDTO>{ }