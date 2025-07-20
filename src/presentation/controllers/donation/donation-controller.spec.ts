import { DonationController } from './donation-controller'
import { MissingParamError, ServerError } from '../../errors'
import type {
  httpRequest,
  Validation,
  AddDonation,
  DonationModel,
  AddDonationModel
} from './donation-controller-protocols'
import {
  badRequest,
  noContent,
  serverError
} from '@/presentation/helpers/http/http-helper'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddDonation = (): AddDonation => {
  class AddDonationStub implements AddDonation {
    async add (account: AddDonationModel): Promise<DonationModel> {
      return await new Promise(resolve => {
        resolve(makeFakeDonation())
      })
    }
  }
  return new AddDonationStub()
}

const makeFakeDonation = (): DonationModel => ({
  id: 'valid_id',
  name: 'valid_name',
  message: 'valid_message',
  slug: 'valid_slug',
  price: 1500
})

const makeFakeRequest = (): httpRequest => ({
  body: {
    name: 'any_name',
    message: 'any_message',
    slug: 'any_slug',
    price: 15
  }
})

interface SutTypes {
  sut: DonationController
  validationStub: Validation
  addDonationStub: AddDonation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addDonationStub = makeAddDonation()
  const sut = new DonationController(validationStub, addDonationStub)
  return {
    sut,
    validationStub,
    addDonationStub
  }
}

describe('Donation Controller', () => {
  test('Should call AddDonation with correct values', async () => {
    const { sut, addDonationStub } = makeSut()
    const addSpy = jest.spyOn(addDonationStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      message: 'any_message',
      slug: 'any_slug',
      price: 1500
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addDonationStub } = makeSut()
    jest.spyOn(addDonationStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  // test('Should return 404 if AddAccount returns null', async () => {
  //   const { sut, addAccountStub } = makeSut()
  //   jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(
  //     new Promise(resolve => {
  //       resolve(null)
  //     })
  //   )
  //   const httpResponse = await sut.handle(makeFakeRequest())
  //   expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  // })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns as error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
