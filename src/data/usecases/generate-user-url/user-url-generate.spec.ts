import { AccountUrl } from './user-url-generate'
import type { AccountModel, LoadAccountByUserUrlRepository } from './user-url-generate-protocols'

jest.mock('crypto', () => ({
  randomBytes: jest.fn(() => Buffer.from('1234567890abcdef', 'hex'))
}))

// const makeFakeAccount = (): AccountModel => ({
//   id: 'valid_id',
//   name: 'valid_name',
//   email: 'valid_email@mail.com',
//   password: 'hashed_password',
//   role: 'valid_role',
//   userUrl: 'valid_userUrl'
// })

const makeLoadAccountByUserUrlRepository = (): LoadAccountByUserUrlRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByUserUrlRepository {
    async loadByUrl (userUrl: string): Promise<AccountModel> {
      return await new Promise(resolve => {
        resolve(null)
      })
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeExpectedUrl = (name: string): string => {
  const baseUrl = name
    .toLowerCase()
    .replace(/\s/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  const cryptoId = '1234567890ab'
  return baseUrl + cryptoId
}

interface SutTypes {
  sut: AccountUrl
  loadAccountByUserUrlRepositoryStub: LoadAccountByUserUrlRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByUserUrlRepositoryStub = makeLoadAccountByUserUrlRepository()
  const sut = new AccountUrl(loadAccountByUserUrlRepositoryStub)
  return {
    sut,
    loadAccountByUserUrlRepositoryStub
  }
}

describe('AccountUrl UseCase', () => {
  test('Should return a valid userUrl on success', async () => {
    const { sut } = makeSut()
    const userUrl = await sut.generate('Rafael Santos')
    expect(userUrl).toBe(makeExpectedUrl('Rafael Santos'))
  })
})
