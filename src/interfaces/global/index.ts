export interface Generic {
  id?: string
  uuid?: string 
  created?: Date
  updated?: string
}

export interface PaginationParam {
  page: number
  size: number
}

export interface Pagination extends PaginationParam {
  total_page: number
  total_size: number
}

export interface Paginated<Type> {
  pagination: Pagination
  data: Type[]
}

export interface ObjectValueOf<T> {
 [key: string]: T
}

export interface Param<T> {
  pagination?: PaginationParam
  search?: T
}