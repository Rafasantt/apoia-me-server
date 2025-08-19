import 'dotenv/config'
import { stripe } from '../config/stripe-config'
import type { GetDataEventsRepository } from '@/data/protocols/payment-gateway/payment'
import type Stripe from 'stripe'

export class GetStripeDadaPaymentRepository implements GetDataEventsRepository {
  async paymentIntent (event: any): Promise<any> {
    const session = event.data.object as Stripe.Checkout.Session
    const paymentIdentId = session.payment_intent as string

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIdentId)

    return paymentIntent
  }
}
