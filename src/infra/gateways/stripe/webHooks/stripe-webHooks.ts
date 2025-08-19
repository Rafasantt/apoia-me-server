import 'dotenv/config'
import { stripe } from '../config/stripe-config'
import type { WebHookEventsRepository } from '@/data/protocols/payment-gateway/payment/webHook-events-repository'
import type Stripe from 'stripe'

export class StripeOnboardingRepository implements WebHookEventsRepository {
  async event (data: any): Promise<any> {
    const sig = data.headers.get('stripe-signature')

    const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET

    const payload = await data.text()
    const events: Stripe.Event = stripe.webhooks.constructEvent(payload, sig, endPointSecret)

    return events
  }
}
