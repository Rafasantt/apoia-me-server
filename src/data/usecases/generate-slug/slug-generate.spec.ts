import { AccountSlug } from './slug-generate'
import type {
  AccountModel,
  LoadAccountBySlugRepository
} from './slug-generate-protocols'

jest.mock('crypto', () => ({
  randomBytes: jest.fn(() => Buffer.from('1234567890abcdef', 'hex'))
}))

const makeLoadAccountBySlugRepository = (): LoadAccountBySlugRepository => {
  class LoadAccountBySlugRepositoryStub implements LoadAccountBySlugRepository {
    async loadBySlug (slug: string): Promise<AccountModel> {
      return await new Promise(resolve => {
        resolve(null)
      })
    }
  }
  return new LoadAccountBySlugRepositoryStub()
}

const makeExpectedSlug = (name: string): string => {
  const baseSlug = name
    .toLowerCase()
    .replace(/\s/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
  const cryptoId = '1234567890ab'
  return baseSlug + cryptoId
}

interface SutTypes {
  sut: AccountSlug
  loadAccountBySlugRepositoryStub: LoadAccountBySlugRepository
}

const makeSut = (): SutTypes => {
  const loadAccountBySlugRepositoryStub = makeLoadAccountBySlugRepository()
  const sut = new AccountSlug(loadAccountBySlugRepositoryStub)
  return {
    sut,
    loadAccountBySlugRepositoryStub
  }
}

describe('AccountSlug UseCase', () => {
  test('Should call LoadAccountBySlugRepository with correct values', async () => {
    const { sut, loadAccountBySlugRepositoryStub } = makeSut()
    const loadBySlugSpy = jest.spyOn(
      loadAccountBySlugRepositoryStub,
      'loadBySlug'
    )
    await sut.generate('any_name')
    const slug = makeExpectedSlug('any_name')
    expect(loadBySlugSpy).toHaveBeenCalledWith(slug)
  })

  test('Should return a valid slug on success', async () => {
    const { sut } = makeSut()
    const slug = await sut.generate('Rafael Santos')
    expect(slug).toBe(makeExpectedSlug('Rafael Santos'))
  })

  test('Should throw if LoadAccountBySlugRepository throws', async () => {
    const { sut, loadAccountBySlugRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountBySlugRepositoryStub, 'loadBySlug')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => {
          reject(new Error())
        })
      )
    const promise = sut.generate('any_name')
    await expect(promise).rejects.toThrow()
  })
})
