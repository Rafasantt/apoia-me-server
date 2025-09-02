import { GetAccountDataController } from './get-account-data-controller'
import { ServerError } from '../../errors'
import type {
  httpRequest,
  GetAccountData,
  AccountWithDonationsModel
} from './get-account-data-controller-protocols'
import {
  serverError
} from '@/presentation/helpers/http/http-helper'

const makeGetAccountData = (): GetAccountData => {
  class GetAccountDataStub implements GetAccountData {
    async getData (accessToken: string): Promise<AccountWithDonationsModel> {
      return await new Promise(resolve => {
        resolve(makeFakeGetAccount())
      })
    }
  }
  return new GetAccountDataStub()
}

const makeFakeGetAccount = (): AccountWithDonationsModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid@email.com',
  slug: 'valid_slug',
  connectedStripeAccountId: 'valid_connected_stripe_account_id',
  donations: [
    {
      id: 'valid_donation_id',
      name: 'valid_donation_name',
      message: 'valid_donation_message',
      creatorId: 'valid_id',
      slug: 'valid_slug',
      price: 10,
      status: 'paid'
    }
  ]
})

const makeFakeRequest = (): httpRequest => ({
  headers: {
    'x-access-token': 'valid_token'
  }
})

interface SutTypes {
  sut: GetAccountDataController
  getAccountDataStub: GetAccountData
}

const makeSut = (): SutTypes => {
  const getAccountDataStub = makeGetAccountData()
  const sut = new GetAccountDataController(
    getAccountDataStub
  )
  return {
    sut,
    getAccountDataStub
  }
}

describe('Donation Controller', () => {
  test('Should call AddDonation with correct values', async () => {
    const { sut, getAccountDataStub } = makeSut()
    const getSpy = jest.spyOn(getAccountDataStub, 'getData')
    await sut.handle(makeFakeRequest())
    expect(getSpy).toHaveBeenCalledWith('valid_token')
  })

  test('Should return 500 if GetAccountData throws', async () => {
    const { sut, getAccountDataStub } = makeSut()
    jest.spyOn(getAccountDataStub, 'getData').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  // test('Should return 400 if Validation returns as error', async () => {
  //   const { sut, validationStub } = makeSut()
  //   jest
  //     .spyOn(validationStub, 'validate')
  //     .mockReturnValueOnce(new MissingParamError('any_field'))
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  // })
})
