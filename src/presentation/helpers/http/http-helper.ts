import type { httpResponse } from '@/presentation/protocols/http'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): httpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (error: Error): httpResponse => ({
  statusCode: 404,
  body: error
})

export const unauthorized = (): httpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const serverError = (error: Error): httpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = (data: any): httpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): httpResponse => ({
  statusCode: 204,
  body: null
})
