import type { AccountOnboardingRepository } from '@/data/usecases/account-onboarding/gateway-account-onboarding-protocols'
import { stripe } from '../config/stripe-config'

export class StripeOnboardingRepository implements
  AccountOnboardingRepository {
  async onboarding (accountId: string): Promise<string> {
    console.log('chegou aqui')
    const accountLinkOnboarding = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: 'http://localhost:5050/',
      return_url: 'http://localhost:5050/',
      type: 'account_onboarding'
    })
    console.log('Account link created:', accountLinkOnboarding.url)
    return accountLinkOnboarding.url
  }
}
