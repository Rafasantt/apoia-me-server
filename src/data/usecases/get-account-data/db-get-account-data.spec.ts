import { DbAGetAccountData } from './db-get-account-data'
import type {
  AccountWithDonationsModel,
  Decrypter,
  DecryptModel,
  GetAccountByIdRepository
} from './db-get-account-data-protocols'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<DecryptModel> {
      return await new Promise(resolve => {
        resolve(makeFakeDecryptData())
      })
    }
  }
  return new DecrypterStub()
}

const makeGetAccountByIdRepository = (): GetAccountByIdRepository => {
  class GetAccountByIdRepositoryStub implements GetAccountByIdRepository {
    async getAccount (id: string): Promise<any> {
      return await new Promise(resolve => {
        resolve(makeFakeGetAccount())
      })
    }
  }
  return new GetAccountByIdRepositoryStub()
}

const makeFakeDecryptData = (): DecryptModel => ({
  id: 'valid_id',
  iat: 1234,
  exp: 4321
})

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

interface SutTypes {
  sut: DbAGetAccountData
  decrypterStub: Decrypter
  getAccountByIdRepositoryStub: GetAccountByIdRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const getAccountByIdRepositoryStub = makeGetAccountByIdRepository()
  const sut = new DbAGetAccountData(
    decrypterStub,
    getAccountByIdRepositoryStub
  )
  return {
    sut,
    decrypterStub,
    getAccountByIdRepositoryStub
  }
}

describe('DbAGetAccountData UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.getData('access_token')
    expect(decryptSpy).toHaveBeenCalledWith('access_token')
  })

  test('Should call GetAccountByIdRepository with correct value', async () => {
    const { sut, getAccountByIdRepositoryStub } = makeSut()
    const getAccountSpy = jest.spyOn(getAccountByIdRepositoryStub, 'getAccount')
    await sut.getData('valid_token')
    expect(getAccountSpy).toHaveBeenCalledWith('valid_id')
  })
})
