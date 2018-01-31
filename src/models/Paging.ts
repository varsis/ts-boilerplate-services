import { JsonProperty } from 'ts-express-decorators'
import { IPagedQueryParams, IPagedResponse } from '../interfaces'

export class PagedQueryParams implements IPagedQueryParams {
  @JsonProperty()
  pageSize: number

  @JsonProperty()
  pageNumber: number
}

export class PagedResponse<T> implements IPagedResponse<T> {
  @JsonProperty()
  data: T[]

  @JsonProperty()
  pageSize: number

  @JsonProperty()
  pageNumber: number
}
