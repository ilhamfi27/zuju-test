export interface Generic {
  id?: string
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

export interface Param<T> {
  pagination?: PaginationParam
  search?: T
}