import type {
  httpRequest,
  httpResponse,
  Controller,
  AddAccount,
  Validation,
  Authentication,
  SlugGenerate
} from './signup-controller-protocols'
import {
  serverError,
  forbidden,
  ok,
  badRequest
} from '@/presentation/helpers/http/http-helper'
import { EmailInUseError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor (
    private readonly slugAccount: SlugGenerate,
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

      const { name, email, password, passwordConfirmation, role } =
        httpRequest.body

      const slug = await this.slugAccount.generate(name)

      const onboardingUrl = await this.addAccount.add({
        name,
        email,
        password,
        passwordConfirmation,
        role,
        slug
      })
      if (!onboardingUrl) {
        return forbidden(new EmailInUseError())
      }
      await this.authentication.auth({
        email,
        password
      })
      return ok({ url: onboardingUrl.url })
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
