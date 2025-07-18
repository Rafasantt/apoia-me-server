import type { CreateAccountStripeRepository } from '@/data/usecases/add-account/bd-add-account-protocols'
import { stripe } from '../config/stripe-config'

export class StripeCreateAccountRepository implements
  CreateAccountStripeRepository {
  async createAccount (): Promise<any> {
    const accountStripe = await stripe.accounts.create({
      controller: {
        losses: {
          payments: 'application'
        },
        fees: {
          payer: 'application'
        },
        stripe_dashboard: {
          type: 'express'
        }
      }
    })
    return accountStripe.id
  }
}
