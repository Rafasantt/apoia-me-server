import { StripeWebHookController } from './stripeWebHook-controller'
import type {
  httpRequest,
  UpdateDonationStatus
} from './stripeWebHook-controller-protocols'

const makeUpdateDonationStatus = (): UpdateDonationStatus => {
  class UpdateDonationStatusStub implements UpdateDonationStatus {
    async update (data: any): Promise<any> {
      return await new Promise(resolve => {
        resolve(makeFakeRequest())
      })
    }
  }
  return new UpdateDonationStatusStub()
}

const makeFakeRequest = (): httpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

interface SutTypes {
  sut: StripeWebHookController
  updateDonationStatusStub: UpdateDonationStatus
}

const makeSut = (): SutTypes => {
  const updateDonationStatusStub = makeUpdateDonationStatus()
  const sut = new StripeWebHookController(updateDonationStatusStub)
  return {
    sut,
    updateDonationStatusStub
  }
}

describe('Donation Controller', () => {
  test('Should call UpdateDonationStatus with correct values', async () => {
    const { sut, updateDonationStatusStub } = makeSut()
    const updateSpy = jest.spyOn(updateDonationStatusStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(updateSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('Should return 500 if UpdateDonationStatus throws', async () => {
    const { sut, updateDonationStatusStub } = makeSut()
    jest.spyOn(updateDonationStatusStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse.statusCode).toBe(500)
  })
})
