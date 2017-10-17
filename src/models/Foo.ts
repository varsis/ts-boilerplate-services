import { JsonProperty } from 'ts-express-decorators'
import { IFooResponse, IFooCreateRequest, IFooUpdateRequest, IPagedFooResponse } from '../interfaces'
import { PagedResponse } from './paging'

export class FooResponse implements IFooResponse {
  @JsonProperty()
  sequentialId: number

  @JsonProperty()
  id: string

  @JsonProperty()
  bar: string
}

export class PagedFooResponse extends PagedResponse<FooResponse> implements IPagedFooResponse {
  @JsonProperty({ use: FooResponse })
  data: FooResponse[]
}

export class FooCreateRequest implements IFooCreateRequest {
  @JsonProperty()
  bar: string
}

export class FooUpdateRequest implements IFooUpdateRequest {
  @JsonProperty()
  bar: string
}
