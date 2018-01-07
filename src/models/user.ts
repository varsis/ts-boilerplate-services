import { JsonProperty } from 'ts-express-decorators'
import { Schema } from 'ts-express-decorators/swagger'
import { IUserResponse, IUserUpdateRequest, IPagedUserResponse, IUserCreateRequest } from '../interfaces'
import { PagedResponse } from './paging'

export class UserResponse implements IUserResponse {
  @JsonProperty()
  sequentialId: number

  @JsonProperty()
  id: string

  @JsonProperty()
  firstName: string

  @JsonProperty()
  lastName: string

  @JsonProperty()
  age?: number
}

export class PagedUserResponse extends PagedResponse<UserResponse> implements IPagedUserResponse {
  @JsonProperty({ use: UserResponse })
  data: UserResponse[]
}

export class UserCreateRequest implements IUserCreateRequest {
  @JsonProperty()
  firstName: string

  @JsonProperty()
  lastName: string

  @JsonProperty()
  age?: number
}

export class UserUpdateRequest implements IUserUpdateRequest {
  @JsonProperty()
  firstName?: string

  @JsonProperty()
  lastName?: string

  @JsonProperty()
  age?: number
}
