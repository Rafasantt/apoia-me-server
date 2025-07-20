export interface AccountOnboardingRepository {
  onboarding: (accountStripeId: string) => Promise<string>
}
