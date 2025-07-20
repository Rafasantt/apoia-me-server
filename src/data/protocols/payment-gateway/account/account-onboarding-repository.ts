import type { OnboardingUrl } from '@/domain/models/onboarding'

export interface AccountOnboardingRepository {
  onboarding: (accountStripeId: string) => Promise<OnboardingUrl>
}
