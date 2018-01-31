import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Generated } from 'typeorm'
import { JsonProperty } from 'ts-express-decorators'
import { IUserResponse, IPagedUserResponse, IUserCreateRequest, IUserUpdateRequest } from '../interfaces'
import { PagedResponse } from './Paging'

@Entity()
export class User extends BaseEntity implements IUserResponse {
  @PrimaryGeneratedColumn()
  @JsonProperty()
  sequentialId: number

  @Column({
    type: 'uuid',
    nullable: false,
  })
  @Generated('uuid')
  @JsonProperty()
  id: string

  @Column()
  @JsonProperty()
  firstName: string

  @Column()
  @JsonProperty()
  lastName: string

  @Column()
  @JsonProperty()
  age?: number
}

export class PagedUserResponse extends PagedResponse<User> implements IPagedUserResponse {
  @JsonProperty({ use: User })
  data: User[]
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
