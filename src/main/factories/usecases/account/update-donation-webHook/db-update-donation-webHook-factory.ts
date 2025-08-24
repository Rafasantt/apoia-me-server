import type { UpdateDonationStatus } from '@/domain/usecases/update-donation-status'
import { DbAUpdateDonationStatus } from '@/data/usecases/update-donation-status/db-update-donation-status'
import { GetStripeDadaPaymentRepository } from '@/infra/gateways/stripe/webHooks/get-data-payment-stripe-webHooks'
import { DonationPostgresRepository } from '@/infra/db/postgres/donation/donation-postgres-repository'

export const makeDbUpdateStatusDonation = (): UpdateDonationStatus => {
  const getDataEventsRepository = new GetStripeDadaPaymentRepository()
  const donationPostgresRepository = new DonationPostgresRepository()
  return new DbAUpdateDonationStatus(
    getDataEventsRepository,
    donationPostgresRepository
  )
}
