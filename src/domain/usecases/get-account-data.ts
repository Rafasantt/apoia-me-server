import type { AccountWithDonationsModel } from '../models/account'

export interface GetAccountData {
  getData: (accessToken: string) => Promise<AccountWithDonationsModel>
}
