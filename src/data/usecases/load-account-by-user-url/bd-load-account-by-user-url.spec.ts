import { DbLoadAccountByUserUrl } from './bd-load-account-by-user-url'
import type {
  AccountModel,
  LoadAccountByUserUrlRepository
} from './bd-load-account-by-user-url-protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  role: 'valid_role',
  userUrl: 'valid_userUrl'
})

const makeLoadAccountByUserUrlRepository = (): LoadAccountByUserUrlRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByUserUrlRepository {
    async loadByUrl (userUrl: string): Promise<AccountModel> {
      return await new Promise(resolve => {
        resolve(makeFakeAccount())
      })
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
  sut: DbLoadAccountByUserUrl
  loadAccountByUserUrlRepositoryStub: LoadAccountByUserUrlRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByUserUrlRepositoryStub = makeLoadAccountByUserUrlRepository()
  const sut = new DbLoadAccountByUserUrl(loadAccountByUserUrlRepositoryStub)
  return {
    sut,
    loadAccountByUserUrlRepositoryStub
  }
}

describe('DbLoadAccountByUserUrl UseCase', () => {
  test('Should call LoadAccountByUserUrlRepository with correct values', async () => {
    const { sut, loadAccountByUserUrlRepositoryStub } = makeSut()
    const loadByUserUrlSpy = jest.spyOn(
      loadAccountByUserUrlRepositoryStub,
      'loadByUrl'
    )
    await sut.load('any_userUrl')
    expect(loadByUserUrlSpy).toHaveBeenCalledWith('any_userUrl')
  })

  test('Should return null if LoadAccountByUserUrlRepository returns null', async () => {
    const { sut, loadAccountByUserUrlRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByUserUrlRepositoryStub, 'loadByUrl')
      .mockReturnValueOnce(
        new Promise(resolve => {
          resolve(null)
        })
      )
    const account = await sut.load('any_userUrl')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_userUrl')
    expect(account).toEqual('valid_userUrl')
  })
})
