import type { AddDonation } from '@/domain/usecases/add-donation'
import { DonationPostgresRepository } from '@/infra/db/postgres/donation/donation-postgres-repository'
import { DbAddDonation } from '@/data/usecases/add-donation/db-add-donation'
import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'
import { StripeCreateCheckoutSessionRepository } from '@/infra/gateways/stripe/create-checkout-session/create-checkout-session'

export const makeDbAddDonation = (): AddDonation => {
  const accountPostgresRepository = new AccountPostgresRepository()
  const donationPostgresRepository = new DonationPostgresRepository()
  const stripeCreateCheckoutSessionRepository = new StripeCreateCheckoutSessionRepository()
  return new DbAddDonation(
    accountPostgresRepository,
    donationPostgresRepository,
    stripeCreateCheckoutSessionRepository
  )
}
