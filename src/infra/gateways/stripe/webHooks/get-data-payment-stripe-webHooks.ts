import 'dotenv/config'
import { stripe } from '../config/stripe-config'
import type { WebHookDataEventsRepository } from '@/data/protocols/payment-gateway/payment/webHook-data-events-repository'
import type Stripe from 'stripe'

export class GetStripeDadaPaymentRepository implements WebHookDataEventsRepository {
  async paymentIntent (event: any): Promise<any> {
    const session = event.data.object as Stripe.Checkout.Session
    const paymentIdentId = session.payment_intent as string

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIdentId)

    return paymentIntent
  }
}
