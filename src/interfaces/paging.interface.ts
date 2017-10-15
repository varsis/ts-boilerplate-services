export interface PagedQueryParams {
  pageSize?: number
  pageNumber?: number
}

export interface PagedResponse<T> {
  data: T[]
  pageSize: number
  pageNumber: number
}
