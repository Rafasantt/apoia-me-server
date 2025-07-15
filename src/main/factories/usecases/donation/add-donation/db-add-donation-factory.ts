import type { AddDonation } from '@/domain/usecases/add-donation'
import { DonationPostgresRepository } from '@/infra/db/postgres/donation/donation-postgres-repository'
import { DbAddDonation } from '@/data/usecases/add-donation/db-add-donation'
import { AccountPostgresRepository } from '@/infra/db/postgres/account/account-postgres-repository'

export const makeDbAddDonation = (): AddDonation => {
  const accountPostgresRepository = new AccountPostgresRepository()
  const donationPostgresRepository = new DonationPostgresRepository()
  return new DbAddDonation(
    accountPostgresRepository,
    donationPostgresRepository
  )
}
