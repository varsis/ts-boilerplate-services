export interface IPagedQueryParams {
  pageSize?: number
  pageNumber?: number
}

export interface IPagedResponse<T> {
  data: T[]
  pageSize: number
  pageNumber: number
}
