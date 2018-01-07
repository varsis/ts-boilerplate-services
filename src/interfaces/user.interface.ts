// Input Fields
import { IPagedResponse } from './'

export interface IUserCreateRequest {
  firstName: string
  lastName: string
  age?: number
}

// Note create and update are the same but they may not
// be in a real world example
export interface IUserUpdateRequest {
  firstName?: string
  lastName?: string
  age?: number
}

// Output
export interface IUserResponse {
  sequentialId: number
  id: string
  firstName: string
  lastName: string
  age?: number
}

export interface IPagedUserResponse extends IPagedResponse<IUserResponse> {}

