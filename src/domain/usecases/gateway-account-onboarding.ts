export interface GatewayOnboarding {
  onboarding: (accountId: string) => Promise<string>
}
