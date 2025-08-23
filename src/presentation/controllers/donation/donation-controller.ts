import type {
  httpRequest,
  httpResponse,
  Controller,
  Validation,
  AddDonation
} from './donation-controller-protocols'
import {
  serverError,
  badRequest,
  ok
} from '@/presentation/helpers/http/http-helper'

export class DonationController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addDonation: AddDonation
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, message, slug, price } = httpRequest.body

      const sessionId = await this.addDonation.add({
        name,
        message,
        slug,
        price
      })

      return ok({ sessionId })
    } catch (error) {
      return serverError(error)
    }
  }
}
