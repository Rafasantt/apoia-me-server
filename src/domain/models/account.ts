import type { DonationModel } from './donation'

export interface AccountModel {
  id: string
  name: string
  email: string
  role: string
  password: string
  slug: string
  connectedStripeAccountId?: string
}

export interface AccountWithDonationsModel extends Omit<AccountModel, 'password' | 'role'> {
  donations: DonationModel[]
}
