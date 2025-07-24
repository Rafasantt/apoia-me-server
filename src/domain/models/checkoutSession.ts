import type { DonationModel } from './donation'

export interface checkoutSession extends DonationModel {
  connectedStripeAccountId: string
  applicationFeeAmount: number
}
