import { DbAUpdateDonationStatus } from './db-update-donation-status'
import type { GetDataEventsRepository, WebHookEventsRepository } from './db-update-donation-status-protocols'

const makeWebHookEventsRepository = (): WebHookEventsRepository => {
  class WebHookEventsRepositoryStub implements WebHookEventsRepository {
    async event (data: any): Promise<any> {
      return await new Promise(resolve => { resolve({ type: 'checkout.session.completed' }) })
    }
  }
  return new WebHookEventsRepositoryStub()
}

const makeGetDataEventsRepository = (): GetDataEventsRepository => {
  class GetDataEventsRepositoryStub implements GetDataEventsRepository {
    async paymentIntent (event: any): Promise<any> {
      return await new Promise(resolve => { resolve({ id: 'pi_123', status: 'succeeded' }) })
    }
  }
  return new GetDataEventsRepositoryStub()
}

interface SutTypes {
  sut: DbAUpdateDonationStatus
  webHookEventsRepositoryStub: WebHookEventsRepository
  getDataEventsRepositoryStub: GetDataEventsRepository
}

const makeSut = (): SutTypes => {
  const webHookEventsRepositoryStub = makeWebHookEventsRepository()
  const getDataEventsRepositoryStub = makeGetDataEventsRepository()
  const sut = new DbAUpdateDonationStatus(
    webHookEventsRepositoryStub,
    getDataEventsRepositoryStub
  )
  return {
    sut,
    webHookEventsRepositoryStub,
    getDataEventsRepositoryStub
  }
}

describe('DbAddDonation UseCase', () => {
  test('Should call WebHookEventsRepository with correct data', async () => {
    const { sut, webHookEventsRepositoryStub } = makeSut()
    const eventSpy = jest.spyOn(webHookEventsRepositoryStub, 'event')
    await sut.update({ id: 'evt_123' })
    expect(eventSpy).toHaveBeenCalledWith({ id: 'evt_123' })
  })
})
