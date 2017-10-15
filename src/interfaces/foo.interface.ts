// Input Fields
export interface FooCreateRequest {
  bar: string
}

// Note create and update are the same but they may not
// be in a real world example
export interface FooUpdateRequest {
  bar: string
}

// Output
export interface FooResponse {
  sequentialId: number
  id: string
  bar: string
}

