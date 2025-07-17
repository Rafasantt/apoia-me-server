import type {
  AccountOnboardingRepository,
  GatewayOnboarding
} from './gateway-account-onboarding-protocols'

export class GatewayAccountOnboarding implements GatewayOnboarding {
  constructor (
    private readonly accountOnboardingRepository: AccountOnboardingRepository
  ) {}

  async onboarding (accountId: string): Promise<string> {
    return await this.accountOnboardingRepository.onboarding(accountId)
  }
}
