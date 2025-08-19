import type {
  httpRequest,
  httpResponse,
  Controller,
  UpdateDonationStatus
} from './stripeWebHook-controller-protocols'
import {
  serverError,
  noContent
} from '@/presentation/helpers/http/http-helper'

export class StripeWebHookController implements Controller {
  constructor (
    private readonly updateDonationStatus: UpdateDonationStatus
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      await this.updateDonationStatus.update(httpRequest)

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
