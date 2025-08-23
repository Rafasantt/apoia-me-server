import { DbAUpdateDonationStatus } from './db-update-donation-status'
import type { GetDataEventsRepository } from './db-update-donation-status-protocols'

const makeGetDataEventsRepository = (): GetDataEventsRepository => {
  class GetDataEventsRepositoryStub implements GetDataEventsRepository {
    async paymentIntent (event: any): Promise<any> {
      return await new Promise(resolve => {
        resolve(fakeEvent())
      })
    }
  }
  return new GetDataEventsRepositoryStub()
}

const fakeEvent = (): any => ({
  id: 'evt_123',
  type: 'checkout.session.completed',
  data: {
    object: {
      metadata: {
        donationId: 'valid_paymentIntent'
      }
    }
  }
})

interface SutTypes {
  sut: DbAUpdateDonationStatus
  getDataEventsRepositoryStub: GetDataEventsRepository
}

const makeSut = (): SutTypes => {
  const getDataEventsRepositoryStub = makeGetDataEventsRepository()
  const sut = new DbAUpdateDonationStatus(getDataEventsRepositoryStub)
  return {
    sut,
    getDataEventsRepositoryStub
  }
}

describe('DbAddDonation UseCase', () => {
  test('Should call GetDataEventsRepository with correct data', async () => {
    const { sut, getDataEventsRepositoryStub } = makeSut()
    const eventSpy = jest.spyOn(getDataEventsRepositoryStub, 'paymentIntent')
    await sut.update(fakeEvent())
    expect(eventSpy).toHaveBeenCalledWith(fakeEvent())
  })
})
