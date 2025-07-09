import { DbAddDonation } from './db-add-donation'
import type {
  AddDonationModel,
  AddDonationRepository,
  DonationModel
} from './bd-add-donation-protocols'

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

const makeFakeDonation = (): DonationModel => ({
  id: 'valid_id',
  name: 'valid_name',
  message: 'valid_message',
  creatorId: 'valid_creatorId',
  slug: 'valid_slug',
  price: 'valid_price'
})

const makeFakeDonationData = (): AddDonationModel => ({
  name: 'valid_name',
  message: 'valid_message',
  creatorId: 'valid_creatorId',
  slug: 'valid_slug',
  price: 'valid_price'
})

interface SutTypes {
  sut: DbAddDonation
  addDonationRepositoryStub: AddDonationRepository
}

const makeSut = (): SutTypes => {
  const addDonationRepositoryStub = makeAddDonationRepository()
  const sut = new DbAddDonation(
    addDonationRepositoryStub
  )
  return {
    sut,
    addDonationRepositoryStub
  }
}

describe('DbAddDonation UseCase', () => {
  test('Should call AddDonationRepository with correct values', async () => {
    const { sut, addDonationRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addDonationRepositoryStub, 'add')
    await sut.add(makeFakeDonationData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      message: 'valid_message',
      creatorId: 'valid_creatorId',
      slug: 'valid_slug',
      price: 'valid_price'
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
