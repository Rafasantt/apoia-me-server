import type { AccountWithDonationsModel } from '@/domain/models/account'

export interface GetAccountByIdRepository {
  getAccount: (id: string) => Promise<AccountWithDonationsModel>
}
