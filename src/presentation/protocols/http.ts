export interface httpResponse {
  statusCode: number
  body: any
}

export interface httpRequest {
  body?: any
  query?: any
  headers?: any
  file?: any
  files?: any
}
