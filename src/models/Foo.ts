import { JsonProperty } from 'ts-express-decorators'
import { IFooResponse, IFooCreateRequest, IFooUpdateRequest } from '../interfaces'
import { PagedResponse } from './paging'

export class FooResponse implements IFooResponse {
  @JsonProperty()
  sequentialId: number

  @JsonProperty()
  id: string

  @JsonProperty()
  bar: string
}

export class PagedFooResponse implements PagedResponse<FooResponse> {
  @JsonProperty()
  data: FooResponse[]
  @JsonProperty()
  pageNumber: number
  @JsonProperty()
  pageSize: number
}

export class FooCreateRequest implements IFooCreateRequest {
  @JsonProperty()
  bar: string
}

export class FooUpdateRequest implements IFooUpdateRequest {
  @JsonProperty()
  bar: string
}
