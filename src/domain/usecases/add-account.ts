import type { OnboardingUrl } from '@/domain/models/onboarding'

export interface AddAccountModel {
  name: string
  email: string
  role: string
  password: string
  slug: string
  connectedStripeAccountId?: string
}

export interface AddAccount {
  add: (account: AddAccountModel | any) => Promise<OnboardingUrl>
}
