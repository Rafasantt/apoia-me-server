import { DbAddDonation } from './db-add-donation'
import type {
  AccountModel,
  AddDonationModel,
  AddDonationRepository,
  DonationModel,
  LoadAccountBySlugRepository
} from './bd-add-donation-protocols'

const makeLoadAccountBySlugRepository = (): LoadAccountBySlugRepository => {
  class LoadAccountBySlugRepositoryStub implements LoadAccountBySlugRepository {
    async loadBySlug (slug: string): Promise<AccountModel> {
      return await new Promise(resolve => {
        resolve(makeFakeAccount())
      })
    }
  }
  return new LoadAccountBySlugRepositoryStub()
}

const makeAddDonationRepository = (): AddDonationRepository => {
  class AddDonationRepositoryStub implements AddDonationRepository {
    async add (donationData: AddDonationModel): Promise<DonationModel> {
      return await new Promise(resolve => {
        resolve(makeFakeDonation())
      })
    }
  }
  return new AddDonationRepositoryStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password',
  role: 'valid_role',
  slug: 'valid_slug'
})

const makeFakeDonation = (): DonationModel => ({
  id: 'valid_id',
  name: 'valid_name',
  message: 'valid_message',
  creatorId: 'valid_id',
  slug: 'valid_slug',
  price: 1500,
  status: 'pending'
})

const makeFakeDonationData = (): AddDonationModel => ({
  name: 'valid_name',
  message: 'valid_message',
  creatorId: 'valid_id',
  slug: 'valid_slug',
  price: 15
})

interface SutTypes {
  sut: DbAddDonation
  loadAccountBySlugRepositoryStub: LoadAccountBySlugRepository
  addDonationRepositoryStub: AddDonationRepository
}

const makeSut = (): SutTypes => {
  const loadAccountBySlugRepositoryStub = makeLoadAccountBySlugRepository()
  const addDonationRepositoryStub = makeAddDonationRepository()
  const sut = new DbAddDonation(
    loadAccountBySlugRepositoryStub,
    addDonationRepositoryStub
  )
  return {
    sut,
    loadAccountBySlugRepositoryStub,
    addDonationRepositoryStub
  }
}

describe('DbAddDonation UseCase', () => {
  test('Should call LoadAccountBySlugRepositoryStub with correct values', async () => {
    const { sut, loadAccountBySlugRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountBySlugRepositoryStub, 'loadBySlug')
    await sut.add(makeFakeDonationData())
    expect(loadSpy).toHaveBeenCalledWith('valid_slug')
  })

  test('Should return null if LoadAccountBySlugRepositoryStub returns null', async () => {
    const { sut, loadAccountBySlugRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountBySlugRepositoryStub, 'loadBySlug')
      .mockReturnValueOnce(null)
    const account = await sut.add(makeFakeDonationData())
    expect(account).toBeNull()
  })

  test('Should call AddDonationRepository with correct values', async () => {
    const { sut, addDonationRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addDonationRepositoryStub, 'add')
    await sut.add(makeFakeDonationData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      message: 'valid_message',
      creatorId: 'valid_id',
      slug: 'valid_slug',
      price: (1500 - Math.floor(1500 * 0.15))
    })
  })

  test('Should throw if AddDonationRepository throws', async () => {
    const { sut, addDonationRepositoryStub } = makeSut()
    jest.spyOn(addDonationRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.add(makeFakeDonationData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an donation on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeDonationData())
    expect(account).toEqual(makeFakeDonation())
  })
})
