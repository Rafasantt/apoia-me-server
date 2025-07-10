import type { AddDonation } from '@/domain/usecases/add-donation'
import { DonationPostgresRepository } from '@/infra/db/postgres/donation/donation-postgres-repository'
import { DbAddDonation } from '@/data/usecases/add-donation/db-add-donation'

export const makeDbAddDonation = (): AddDonation => {
  const accountPostgresRepository = new DonationPostgresRepository()
  return new DbAddDonation(
    accountPostgresRepository
  )
}
