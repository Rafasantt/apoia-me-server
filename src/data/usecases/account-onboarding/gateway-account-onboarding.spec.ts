import { GatewayAccountOnboarding } from './gateway-account-onboarding'
import type { AccountOnboardingRepository, OnboardingUrl } from './gateway-account-onboarding-protocols'

const makeAccountOnboardingRepository = (): AccountOnboardingRepository => {
  class AccountOnboardingRepositoryStub implements AccountOnboardingRepository {
    async onboarding (accountId: string): Promise<OnboardingUrl> {
      return await new Promise(resolve => {
        resolve({ url: 'valid_url' })
      })
    }
  }
  return new AccountOnboardingRepositoryStub()
}

interface SutTypes {
  sut: GatewayAccountOnboarding
  accountOnboardingRepositoryStub: AccountOnboardingRepository
}

const makeSut = (): SutTypes => {
  const accountOnboardingRepositoryStub = makeAccountOnboardingRepository()
  const sut = new GatewayAccountOnboarding(
    accountOnboardingRepositoryStub
  )
  return {
    sut,
    accountOnboardingRepositoryStub
  }
}

describe('GatewayAccountOnboarding UseCase', () => {
  test('Should call AccountOnboardingRepository with correct values', async () => {
    const { sut, accountOnboardingRepositoryStub } = makeSut()
    const onboardingSpy = jest.spyOn(accountOnboardingRepositoryStub, 'onboarding')
    await sut.onboarding('valid_account_id')
    expect(onboardingSpy).toHaveBeenCalledWith('valid_account_id')
  })

  test('Should throw if AccountOnboardingRepository throws', async () => {
    const { sut, accountOnboardingRepositoryStub } = makeSut()
    jest.spyOn(accountOnboardingRepositoryStub, 'onboarding').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.onboarding('valid_account_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an onboard url on success', async () => {
    const { sut } = makeSut()
    const account = await sut.onboarding('valid_account_id')
    expect(account).toEqual({ url: 'valid_url' })
  })
})
