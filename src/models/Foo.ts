import { JsonProperty } from 'ts-express-decorators'
import { Schema } from 'ts-express-decorators/swagger'
import { IFooResponse, IFooCreateRequest, IFooUpdateRequest, IPagedFooResponse } from '../interfaces'
import { PagedResponse } from './paging'

export class FooResponse implements IFooResponse {
  @JsonProperty()
  sequentialId: number

  @JsonProperty()
  id: string

  @JsonProperty()
  bar: string

  @Schema({ format: 'date-time' })
  @JsonProperty()
  createdAt?: string

  @Schema({ format: 'date-time' })
  @JsonProperty()
  updatedAt?: string
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
