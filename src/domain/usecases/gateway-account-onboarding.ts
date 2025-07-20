import type { OnboardingUrl } from '../models/onboarding'

export interface GatewayOnboarding {
  onboarding: (accountId: string) => Promise<OnboardingUrl>
}
