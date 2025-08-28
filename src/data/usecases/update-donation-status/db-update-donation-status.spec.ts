import type { UpdateDonationModel } from '@/domain/models/updateDonation'
import { DbAUpdateDonationStatus } from './db-update-donation-status'
import type { GetDataEventsRepository, UpdateDonationRepository } from './db-update-donation-status-protocols'

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

const makeUpdateDonationRepository = (): UpdateDonationRepository => {
  class UpdateDonationRepositoryStub implements UpdateDonationRepository {
    async update (updateData: UpdateDonationModel): Promise<any> {
      await new Promise<void>(resolve => { resolve() })
    }
  }
  return new UpdateDonationRepositoryStub()
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
  updateDonationRepositoryStub: UpdateDonationRepository
}

const makeSut = (): SutTypes => {
  const getDataEventsRepositoryStub = makeGetDataEventsRepository()
  const updateDonationRepositoryStub = makeUpdateDonationRepository()
  const sut = new DbAUpdateDonationStatus(
    getDataEventsRepositoryStub,
    updateDonationRepositoryStub
  )
  return {
    sut,
    getDataEventsRepositoryStub,
    updateDonationRepositoryStub
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
