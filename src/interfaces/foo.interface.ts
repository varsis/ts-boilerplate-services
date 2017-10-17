// Input Fields
import { IPagedResponse } from './'

export interface IFooCreateRequest {
  bar: string
}

// Note create and update are the same but they may not
// be in a real world example
export interface IFooUpdateRequest {
  bar: string
}

// Output
export interface IFooResponse {
  sequentialId: number
  id: string
  bar: string
}

export interface IPagedFooResponse extends IPagedResponse<IFooResponse> {}

