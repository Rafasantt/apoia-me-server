import type { AccountOnboardingRepository, OnboardingUrl } from '@/data/usecases/account-onboarding/gateway-account-onboarding-protocols'
import { stripe } from '../config/stripe-config'

export class StripeOnboardingRepository implements
  AccountOnboardingRepository {
  async onboarding (accountId: string): Promise<OnboardingUrl> {
    const accountLinkOnboarding = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: 'http://localhost:5050/',
      return_url: 'http://localhost:5050/',
      type: 'account_onboarding'
    })
    return accountLinkOnboarding
  }
}
