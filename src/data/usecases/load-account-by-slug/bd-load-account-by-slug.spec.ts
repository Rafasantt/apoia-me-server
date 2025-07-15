import { DbLoadAccountByslug } from './bd-load-account-by-slug'
import type {
  AccountModel,
  LoadAccountBySlugRepository
} from './bd-load-account-by-slug-protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  role: 'valid_role',
  slug: 'valid_slug'
})

const makeLoadAccountBySlugRepository = (): LoadAccountBySlugRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountBySlugRepository {
    async loadBySlug (slug: string): Promise<AccountModel> {
      return await new Promise(resolve => {
        resolve(makeFakeAccount())
      })
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
  sut: DbLoadAccountByslug
  LoadAccountBySlugRepositoryStub: LoadAccountBySlugRepository
}

const makeSut = (): SutTypes => {
  const LoadAccountBySlugRepositoryStub = makeLoadAccountBySlugRepository()
  const sut = new DbLoadAccountByslug(LoadAccountBySlugRepositoryStub)
  return {
    sut,
    LoadAccountBySlugRepositoryStub
  }
}

describe('DbLoadAccountByslug UseCase', () => {
  test('Should call LoadAccountBySlugRepository with correct values', async () => {
    const { sut, LoadAccountBySlugRepositoryStub } = makeSut()
    const loadByslugSpy = jest.spyOn(
      LoadAccountBySlugRepositoryStub,
      'loadBySlug'
    )
    await sut.load('any_slug')
    expect(loadByslugSpy).toHaveBeenCalledWith('any_slug')
  })

  test('Should return null if LoadAccountBySlugRepository returns null', async () => {
    const { sut, LoadAccountBySlugRepositoryStub } = makeSut()
    jest
      .spyOn(LoadAccountBySlugRepositoryStub, 'loadBySlug')
      .mockReturnValueOnce(
        new Promise(resolve => {
          resolve(null)
        })
      )
    const account = await sut.load('any_slug')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_slug')
    expect(account).toEqual('valid_slug')
  })
})
