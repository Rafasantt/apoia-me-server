import type { checkoutSession } from '@/domain/models/checkoutSession'

export interface CreateCheckoutSessionRepository {
  checkout: (sessionData: checkoutSession) => Promise<any>
}
