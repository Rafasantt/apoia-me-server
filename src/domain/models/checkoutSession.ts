export interface checkoutSession {
  name: string
  connectedStripeAccountId: string
  price: number
  applicationFeeAmount: number
  donationId: string
}
