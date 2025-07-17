export interface AccountOnboardingRepository {
  onboarding: (accountId: string) => Promise<string>
}
