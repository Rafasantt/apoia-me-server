export interface CreateCheckoutSessionRepository {
  checkout: (sessionData: any) => Promise<any>
}
