import type {
  httpRequest,
  httpResponse,
  Controller,
  AddAccount,
  Validation,
  Authentication
} from './signup-controller-protocols'
import { serverError, forbidden, noContent, badRequest } from '@/presentation/helpers/http/http-helper'
import { EmailInUseError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const {
        name,
        email,
        password,
        passwordConfirmation,
        role
      } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password,
        passwordConfirmation,
        role
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      await this.authentication.auth({
        email,
        password
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
