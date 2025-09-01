import type {
  httpRequest,
  httpResponse,
  Controller,
  GetAccountData
} from './get-account-data-controller-protocols'
import {
  serverError,
  badRequest,
  ok
} from '@/presentation/helpers/http/http-helper'

export class DonationController implements Controller {
  constructor (
    private readonly getAccountData: GetAccountData
  ) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']

      const accountData = await this.getAccountData.getData(accessToken)

      if (!accountData) {
        return badRequest(new Error('Account not found'))
      }

      return ok({ accountData })
    } catch (error) {
      return serverError(error)
    }
  }
}
