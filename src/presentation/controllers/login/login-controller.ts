import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '@/presentation/helpers/http/http-helper'
import type {
  Controller,
  httpRequest,
  httpResponse,
  Authentication,
  Validation
} from './login-controller-protocols'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const userData = await this.authentication.auth({
        email,
        password
      })
      if (!userData) {
        return unauthorized()
      }
      return ok({ userData })
    } catch (error) {
      return serverError(error)
    }
  }
}
