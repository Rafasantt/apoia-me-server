import type { CreateCheckoutSessionRepository } from '@/data/protocols/payment-gateway/account/create-checkout-session-repository'
import { stripe } from '../config/stripe-config'

export class StripeCreateCheckoutSessionRepository implements CreateCheckoutSessionRepository {
  async checkout (sessionData: any): Promise<any> {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: 'http://localhost:5050/',
      cancel_url: 'http://localhost:5050/',
      line_items: [{
        price_data: {
          currency: 'brl',
          product_data: {
            name: sessionData.name
          },
          unit_amount: sessionData.price
        },
        quantity: 1
      }],
      payment_intent_data: {
        application_fee_amount: sessionData.applicationFeeAmount,
        transfer_data: {
          destination: sessionData.connectStripeAccountId
        },
        metadata: {
          donorName: sessionData.name,
          donorMessage: sessionData.message
        }
      }
    })
    return session
  }
}
