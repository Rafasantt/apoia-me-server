import type { UpdateDonationStatus } from '@/domain/usecases/update-donation-status'
import { DbAUpdateDonationStatus } from '@/data/usecases/update-donation-status/db-update-donation-status'
import { GetStripeDadaPaymentRepository } from '@/infra/gateways/stripe/webHooks/get-data-payment-stripe-webHooks'

export const makeDbUpdateStatusDonation = (): UpdateDonationStatus => {
  const getDataEventsRepository = new GetStripeDadaPaymentRepository()
  return new DbAUpdateDonationStatus(
    getDataEventsRepository
  )
}
