import { GatewayCreateAccountStripe } from './gateway-create-account-stripe'
import type { CreateAccountStripeRepository } from './gateway-create-account-stripe-protocols'

const makeCreateAccountStripeRepository = (): CreateAccountStripeRepository => {
  class CreateAccountStripeRepositoryStub implements CreateAccountStripeRepository {
    async createAccount (): Promise<any> {
      return await new Promise(resolve => {
        resolve({})
      })
    }
  }
  return new CreateAccountStripeRepositoryStub()
}

interface SutTypes {
  sut: GatewayCreateAccountStripe
  createAccountStripeRepositoryStub: CreateAccountStripeRepository
}

const makeSut = (): SutTypes => {
  const createAccountStripeRepositoryStub = makeCreateAccountStripeRepository()
  const sut = new GatewayCreateAccountStripe(
    createAccountStripeRepositoryStub
  )
  return {
    sut,
    createAccountStripeRepositoryStub
  }
}

describe('GatewayCreateAccountStripe UseCase', () => {
  test('Should call CreateAccountStripeRepository with correct values', async () => {
    const { sut, createAccountStripeRepositoryStub } = makeSut()
    const createAccountSpy = jest.spyOn(
      createAccountStripeRepositoryStub,
      'createAccount'
    )
    await sut.create()
    expect(createAccountSpy).toHaveBeenCalledWith()
  })

  test('Should throw if CreateAccountStripeRepository throws', async () => {
    const { sut, createAccountStripeRepositoryStub } = makeSut()
    jest
      .spyOn(createAccountStripeRepositoryStub, 'createAccount')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => {
          reject(new Error())
        })
      )
    const promise = sut.create()
    await expect(promise).rejects.toThrow()
  })
})
