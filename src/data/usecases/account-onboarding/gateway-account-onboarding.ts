import type {
  AccountOnboardingRepository,
  GatewayOnboarding,
  OnboardingUrl
} from './gateway-account-onboarding-protocols'

export class GatewayAccountOnboarding implements GatewayOnboarding {
  constructor (
    private readonly accountOnboardingRepository: AccountOnboardingRepository
  ) {}

  async onboarding (accountId: string): Promise<OnboardingUrl> {
    return await this.accountOnboardingRepository.onboarding(accountId)
  }
}
